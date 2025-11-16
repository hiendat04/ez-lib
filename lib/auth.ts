import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  UserPayload,
} from "@/types/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function loginUser(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  try {
    const { email, password } = credentials;

    // Validate input
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // Create JWT Payload
    const userPayload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role.name,
    };

    // Sign the token
    const token = jwt.sign(userPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Set the token in a secure, HttpOnly cookie
    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: "/",
    });

    
    return {
      success: true,
      message: "Login successful",
      user: userPayload, // Return user payload without password
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An error occurred during login",
    };
  }
}

export async function registerUser(
  credentials: RegisterCredentials,
): Promise<RegisterResponse> {
  try {
    const { email, password, fullName } = credentials;

    // Validate input
    if (!email || !password || !fullName) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists",
      };
    }

    // Validate password strength
    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters long",
      };
    }

    // Get default USER role
    const userRole = await prisma.role.findUnique({
      where: { name: "USER" },
    });

    if (!userRole) {
      return {
        success: false,
        message: "System error: Default role not found",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        roleId: userRole.id,
      },
      include: {
        role: true,
      },
    });

    return {
      success: true,
      message: "Account created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role.name,
      },
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "An error occurred during registration",
    };
  }
}

export async function getSession(): Promise<UserPayload | null> {
  const sessionToken = (await cookies()).get("session")?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    // Verify the token and return the user payload
    const user = jwt.verify(
      sessionToken,
      process.env.JWT_SECRET!,
    ) as UserPayload;
    return user;
  } catch (error) {
    // Token is invalid or expired
    console.error("Session verification error:", error);
    return null;
  }
}
