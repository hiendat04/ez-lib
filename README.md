# EzLib - Modern Library Management System

EzLib is a full-stack web application designed to modernize library operations. It provides a seamless, intuitive platform for both library members to browse, borrow, and manage books, and for administrators to oversee the library's collection and user activity.

 <!-- Replace with a screenshot of your dashboard -->

## Features

-   **User Authentication**: Secure sign-up and login system using JWT (JSON Web Tokens) with password hashing (bcrypt).
-   **Role-Based Access**: Differentiated experiences for regular users and administrators.
-   **Interactive Dashboard**: An admin dashboard showcasing key library statistics, including borrowing trends and book category distribution, visualized with Recharts.
-   **Comprehensive Book Catalog**:
    -   Publicly browsable catalog with real-time search and filtering by category.
    -   Pagination for handling large collections efficiently.
    -   Detailed book pages with information on availability, publisher, and authors.
-   **Loan Management (CRUD)**:
    -   Users can borrow and return books with a single click.
    -   A dedicated "My Loans" page to track active loans and view borrowing history.
    -   Automatic updates to book availability upon borrowing and returning.
-   **Responsive Design**: A mobile-first, fully responsive UI built with Tailwind CSS.

## Tech Stack

### Frontend

-   **Framework**: Next.js (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: Custom components, Material-UI Icons
-   **Data Visualization**: Recharts
-   **State Management**: React Context API (for authentication)
-   **User Notifications**: React Hot Toast

### Backend

-   **Runtime**: Node.js (via Next.js API Routes)
-   **Database**: PostgreSQL (hosted on Neon)
-   **ORM**: Prisma
-   **Authentication**: JWT (JSON Web Tokens)
-   **File Storage**: Vercel Blob (for book cover images)

## Getting Started

### Prerequisites

-   Node.js (v20.x or later)
-   npm or yarn
-   A PostgreSQL database (you can get a free one from [Neon](https://neon.tech))

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ez-lib.git
    cd ez-lib
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your database connection string and a JWT secret.

    ```env
    # .env.local

    # Your PostgreSQL connection string
    DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

    # A long, random string for signing JWTs
    JWT_SECRET="your-super-secret-jwt-string"

    # The base URL of your application
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

4.  **Apply database migrations:**
    This will set up the database schema based on `prisma/schema.prisma`.
    ```bash
    npx prisma migrate dev
    ```

5.  **Seed the database (Optional):**
    To populate the database with initial data (roles, users, books, etc.), run the seed script.
    ```bash
    npm run db:seed
    ```
    -   **Admin Login**: `admin@example.com`
    -   **User Login**: `user@example.com`
    -   **Password for both**: `Password123!`

6.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
