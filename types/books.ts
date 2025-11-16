export interface Author {
  id: string;
  name: string;
}

export interface Publisher {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  isbn: string;
  totalCopies: number;
  availableCopies: number;
  category: string;
  year: number;
  description?: string;
  coverImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  publisher: Publisher;
  authors: Author[];
}

export interface BooksResponse {
  success: boolean;
  message: string;
  books: Book[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalBooks: number;
    limit: number;
  };
}

export interface BookResponse {
  success: boolean;
  message: string;
  book?: Book;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface InputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  categories: string[];
}
