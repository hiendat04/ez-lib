import { PrismaClient } from "@prisma/client";
import {
  Book,
  BooksResponse,
  BookResponse,
  PaginationParams,
  CategoryResponse,
} from "@/types/books";

const prisma = new PrismaClient();

export async function getAllBooks(
  params: PaginationParams = {},
): Promise<BooksResponse> {
  try {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(50, Math.max(1, params.limit || 10));
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalBooks = await prisma.book.count();
    const totalPages = Math.ceil(totalBooks / limit);

    // Fetch books with relations
    const books = await prisma.book.findMany({
      skip,
      take: limit,
      include: {
        publisher: true,
        bookAuthors: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform data to match our interface
    const transformedBooks: Book[] = books.map((book) => ({
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      totalCopies: book.totalCopies,
      availableCopies: book.availableCopies,
      category: book.category ?? "",
      description: book.description ?? "",
      coverImageUrl: book.imageUrl ?? "/landing/dummy-book-cover.jpg",
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
      publisher: {
        id: book.publisher?.id ?? "",
        name: book.publisher?.name ?? "",
      },
      authors: book.bookAuthors.map((ba) => ({
        id: ba.author.id,
        name: ba.author.name,
      })),
    }));

    return {
      success: true,
      message: "Books fetched successfully",
      books: transformedBooks,
      pagination: {
        currentPage: page,
        totalPages,
        totalBooks,
        limit,
      },
    };
  } catch (error) {
    console.error("Get all books error:", error);
    return {
      success: false,
      message: "Failed to fetch books",
      books: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalBooks: 0,
        limit: 10,
      },
    };
  }
}

export async function getBookById(bookId: string): Promise<BookResponse> {
  try {
    if (!bookId) {
      return {
        success: false,
        message: "Book ID is required",
      };
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        publisher: true,
        bookAuthors: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!book) {
      return {
        success: false,
        message: "Book not found",
      };
    }

    // Transform data to match our interface
    const transformedBook: Book = {
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      totalCopies: book.totalCopies,
      availableCopies: book.availableCopies,
      category: book.category ?? "",
      description: book.description ?? "",
      coverImageUrl: book.imageUrl ?? "/landing/dummy-book-cover.jpg",
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
      publisher: {
        id: book.publisher?.id ?? "",
        name: book.publisher?.name ?? "",
      },
      authors: book.bookAuthors.map((ba) => ({
        id: ba.author.id,
        name: ba.author.name,
      })),
    };

    return {
      success: true,
      message: "Book fetched successfully",
      book: transformedBook,
    };
  } catch (error) {
    console.error("Get book by ID error:", error);
    return {
      success: false,
      message: "Failed to fetch book details",
    };
  }
}

export async function getAllCategory(): Promise<CategoryResponse> {
  try {
    const categories = await prisma.book.findMany({
      distinct: ["category"],
      select: {
        category: true,
      },
      where: {
        category: {
          not: null,
        },
      },
    });

    return {
      success: true,
      message: "Categories fetched successfully",
      categories: categories
        .map((cat) => cat.category)
        .filter((cat): cat is string => cat !== null),
    };
  } catch (error) {
    console.error("Get all categories error:", error);
    return {
      success: false,
      message: "Failed to fetch categories",
      categories: [],
    };
  }
}
