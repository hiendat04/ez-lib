import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Clean up in order that respects foreign keys
  console.log("Deleting existing data...");
  await prisma.bookAuthor.deleteMany({});
  await prisma.loan.deleteMany({});
  await prisma.reservation.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.author.deleteMany({});
  await prisma.publisher.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});

  // 1) Roles
  const roleNames = ["ADMIN", "USER", "LIBRARIAN", "MODERATOR", "GUEST"];
  console.log("Creating roles...");
  const roles: Record<string, any> = {};
  for (const name of roleNames) {
    const r = await prisma.role.create({ data: { name } });
    roles[name] = r;
  }

  // 2) Users (ADMIN and USER at minimum)
  console.log("Creating users...");
  const pw = await bcrypt.hash("Password123!", 10);

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      fullName: "Site Admin",
      password: pw,
      roleId: roles["ADMIN"].id,
    },
  });

  const normalUser = await prisma.user.create({
    data: {
      email: "user@example.com",
      fullName: "Regular User",
      password: pw,
      roleId: roles["USER"].id,
    },
  });

  // 3) Authors
  console.log("Creating authors...");
  const authorNames = [
    "Harper Lee",
    "George Orwell",
    "Jane Austen",
    "J.R.R. Tolkien",
    "Isaac Asimov",
    "Octavia Butler",
    "Mary Shelley",
    "Aldous Huxley",
    "F. Scott Fitzgerald",
    "Leo Tolstoy",
    "Mark Twain",
    "Arthur C. Clarke",
    "Neil Gaiman",
    "Toni Morrison",
  ];
  const authors: any[] = [];
  for (const name of authorNames) {
    const a = await prisma.author.create({ data: { name } });
    authors.push(a);
  }

  // 4) Publishers
  console.log("Creating publishers...");
  const publishersData = [
    "Vintage Books",
    "Penguin Random House",
    "HarperCollins",
    "Oxford University Press",
    "Bloomsbury",
    "Tor Books",
  ];
  const publishers: any[] = [];
  for (const pName of publishersData) {
    const p = await prisma.publisher.create({ data: { name: pName } });
    publishers.push(p);
  }

  // 5) Books (create 24+ books)
  console.log("Creating books...");
  const booksData = [
    { title: "To Kill a Mockingbird", isbn: "9780061120084", category: "Fiction", publisherIdx: 0, totalCopies: 5, description: "A novel about the injustices of the American South." },
    { title: "1984", isbn: "9780451524935", category: "Dystopian", publisherIdx: 1, totalCopies: 6, description: "A dystopian novel about surveillance and totalitarianism." },
    { title: "Pride and Prejudice", isbn: "9780141040349", category: "Romance", publisherIdx: 2, totalCopies: 4, description: "Classic novel exploring manners and matrimonial machinations." },
    { title: "The Hobbit", isbn: "9780547928227", category: "Fantasy", publisherIdx: 2, totalCopies: 7, description: "Bilbo's adventure that sets the stage for The Lord of the Rings." },
    { title: "I, Robot", isbn: "9780553382563", category: "Science Fiction", publisherIdx: 1, totalCopies: 3, description: "Classic collection of robot stories exploring ethics and AI." },
    { title: "Frankenstein", isbn: "9780143131847", category: "Horror", publisherIdx: 3, totalCopies: 4, description: "Mary Shelley's gothic novel about a scientist and his creation." },
    { title: "Brave New World", isbn: "9780060850524", category: "Dystopian", publisherIdx: 0, totalCopies: 5, description: "A future society shaped by technology, conditioning and drugs." },
    { title: "The Great Gatsby", isbn: "9780743273565", category: "Fiction", publisherIdx: 4, totalCopies: 5, description: "A critique of the American Dream in the Jazz Age." },
    { title: "War and Peace", isbn: "9780199232765", category: "Historical", publisherIdx: 3, totalCopies: 2, description: "Tolstoy's epic novel of Russian society during the Napoleonic wars." },
    { title: "Adventures of Huckleberry Finn", isbn: "9780486280615", category: "Classic", publisherIdx: 4, totalCopies: 3, description: "A young boy's travels down the Mississippi River." },
    { title: "Childhood's End", isbn: "9780345338986", category: "Science Fiction", publisherIdx: 5, totalCopies: 3, description: "Arthur C. Clarke's story of an alien intervention that ushers humanity to a new stage." },
    { title: "Good Omens", isbn: "9780060853983", category: "Fantasy", publisherIdx: 0, totalCopies: 4, description: "Neil Gaiman & Terry Pratchett's comedic tale of an angel and a demon." },
    { title: "Beloved", isbn: "9781400033416", category: "Fiction", publisherIdx: 1, totalCopies: 3, description: "Toni Morrison's novel about the legacy of slavery." },
    { title: "Foundation", isbn: "9780553293357", category: "Science Fiction", publisherIdx: 5, totalCopies: 6, description: "Asimov's seminal series about the fall and rise of galactic empires." },
    { title: "The Silmarillion", isbn: "9780618126989", category: "Fantasy", publisherIdx: 2, totalCopies: 2, description: "Tolkien's collection of mythopoeic tales for Middle-earth." },
    { title: "Emma", isbn: "9780141439587", category: "Romance", publisherIdx: 2, totalCopies: 3, description: "Jane Austen's novel of matchmaking and social follies." },
    { title: "The Left Hand of Darkness", isbn: "9780441478125", category: "Science Fiction", publisherIdx: 5, totalCopies: 3, description: "Ursula K. Le Guin's novel about gender and society." },
    { title: "The Road", isbn: "9780307387899", category: "Post-Apocalyptic", publisherIdx: 1, totalCopies: 4, description: "Cormac McCarthy's bleak father-and-son journey." },
    { title: "Slaughterhouse-Five", isbn: "9780440180296", category: "Fiction", publisherIdx: 0, totalCopies: 4, description: "Kurt Vonnegut's nonlinear satire on war." },
    { title: "The Name of the Wind", isbn: "9780756404741", category: "Fantasy", publisherIdx: 4, totalCopies: 5, description: "A modern epic fantasy following Kvothe." },
    { title: "American Gods", isbn: "9780062572233", category: "Fantasy", publisherIdx: 1, totalCopies: 3, description: "Neil Gaiman's novel about old gods vs new gods." },
    { title: "Neuromancer", isbn: "9780441569595", category: "Cyberpunk", publisherIdx: 5, totalCopies: 3, description: "William Gibson's vision of cyberspace and corporate control." },
    { title: "Dune", isbn: "9780441013593", category: "Science Fiction", publisherIdx: 5, totalCopies: 6, description: "Frank Herbert's desert-planet epic." },
    { title: "Kindred", isbn: "9780807083697", category: "Historical", publisherIdx: 0, totalCopies: 4, description: "Octavia Butler's time-travel novel about slavery and ancestry." },
  ];

  const books: any[] = [];
  for (let i = 0; i < booksData.length; i++) {
    const b = booksData[i];
    const created = await prisma.book.create({
      data: {
        title: b.title,
        isbn: b.isbn,
        category: b.category,
        publisherId: publishers[b.publisherIdx].id,
        totalCopies: b.totalCopies,
        availableCopies: b.totalCopies,
        description: b.description,
        imageUrl: null,
      },
    });
    books.push(created);
  }

  // 6) Populate book-author (junction) table to show many-to-many relationships
  console.log("Linking books and authors (bookAuthor junction table)...");
  const bookAuthorPairs: { bookTitle: string; authorName: string }[] = [];

  // Map some classics to their well-known authors
  const explicitPairs = [
    { bookTitle: "To Kill a Mockingbird", authorName: "Harper Lee" },
    { bookTitle: "1984", authorName: "George Orwell" },
    { bookTitle: "Pride and Prejudice", authorName: "Jane Austen" },
    { bookTitle: "The Hobbit", authorName: "J.R.R. Tolkien" },
    { bookTitle: "I, Robot", authorName: "Isaac Asimov" },
    { bookTitle: "Frankenstein", authorName: "Mary Shelley" },
    { bookTitle: "Brave New World", authorName: "Aldous Huxley" },
    { bookTitle: "The Great Gatsby", authorName: "F. Scott Fitzgerald" },
    { bookTitle: "War and Peace", authorName: "Leo Tolstoy" },
    { bookTitle: "Adventures of Huckleberry Finn", authorName: "Mark Twain" },
    { bookTitle: "Childhood's End", authorName: "Arthur C. Clarke" },
    { bookTitle: "Good Omens", authorName: "Neil Gaiman" }, // note: actually co-authored, but okay for seed
    { bookTitle: "Beloved", authorName: "Toni Morrison" },
    { bookTitle: "Foundation", authorName: "Isaac Asimov" },
    { bookTitle: "The Silmarillion", authorName: "J.R.R. Tolkien" },
    { bookTitle: "Emma", authorName: "Jane Austen" },
    { bookTitle: "The Left Hand of Darkness", authorName: "Ursula K. Le Guin" }, // author not in list, will add fallback
    { bookTitle: "The Road", authorName: "Cormac McCarthy" }, // add fallback author
    { bookTitle: "Slaughterhouse-Five", authorName: "Kurt Vonnegut" }, // fallback
    { bookTitle: "The Name of the Wind", authorName: "Patrick Rothfuss" }, // fallback
    { bookTitle: "American Gods", authorName: "Neil Gaiman" },
    { bookTitle: "Neuromancer", authorName: "William Gibson" }, // fallback
    { bookTitle: "Dune", authorName: "Frank Herbert" }, // fallback
    { bookTitle: "Kindred", authorName: "Octavia Butler" },
  ];

  // Ensure all authors referenced in explicitPairs exist, create missing ones
  const explicitAuthorNames = Array.from(new Set(explicitPairs.map((p) => p.authorName)));
  for (const name of explicitAuthorNames) {
    if (!authors.find((a) => a.name === name)) {
      const a = await prisma.author.create({ data: { name } });
      authors.push(a);
    }
  }

  // Add explicit pairs to bookAuthorPairs
  for (const p of explicitPairs) {
    bookAuthorPairs.push({ bookTitle: p.bookTitle, authorName: p.authorName });
  }

  // Add additional many-to-many links programmatically: some books will have 2 authors
  // e.g., make "1984" also linked to "Aldous Huxley" (to demonstrate multi-author in seed)
  bookAuthorPairs.push({ bookTitle: "1984", authorName: "Aldous Huxley" });
  bookAuthorPairs.push({ bookTitle: "Good Omens", authorName: "Terry Pratchett" });
  bookAuthorPairs.push({ bookTitle: "Foundation", authorName: "Arthur C. Clarke" }); // fictional pairing for demo
  bookAuthorPairs.push({ bookTitle: "Dune", authorName: "Frank Herbert" }); // already present but safe (duplicate will be deduped below)

  // Deduplicate pairs
  const uniquePairs = new Map<string, { bookTitle: string; authorName: string }>();
  for (const p of bookAuthorPairs) {
    const key = `${p.bookTitle}:::${p.authorName}`;
    if (!uniquePairs.has(key)) uniquePairs.set(key, p);
  }

  // Create entries
  for (const pair of uniquePairs.values()) {
    const book = books.find((b) => b.title === pair.bookTitle);
    const author = authors.find((a) => a.name === pair.authorName);
    if (book && author) {
      try {
        await prisma.bookAuthor.create({
          data: {
            bookId: book.id,
            authorId: author.id,
          },
        });
      } catch (err: any) {
        // ignore duplicate key errors in case of race/duplication, log others
        console.warn(`Could not create bookAuthor for ${pair.bookTitle} / ${pair.authorName}:`, err?.message ?? err);
      }
    } else {
      console.warn("Missing book or author for pair:", pair);
    }
  }

  // Extra: for broader many-to-many demonstration, link each of the first 6 books to one additional random author
  for (let i = 0; i < Math.min(6, books.length); i++) {
    const book = books[i];
    const extraAuthor = authors[(i + 4) % authors.length];
    // avoid creating duplicate pair
    const exists = await prisma.bookAuthor.findUnique({
      where: {
        // composite PK fields mapping depends on Prisma client, use findFirst for safe lookup
        // We'll use findFirst to check existence
        AND: [{ bookId: book.id }, { authorId: extraAuthor.id }],
      } as any,
    }).catch(() => null);

    if (!exists) {
      await prisma.bookAuthor.create({
        data: { bookId: book.id, authorId: extraAuthor.id },
      });
    }
  }

  console.log("Seeding finished:");
  const roleCount = await prisma.role.count();
  const userCount = await prisma.user.count();
  const authorCount = await prisma.author.count();
  const publisherCount = await prisma.publisher.count();
  const bookCount = await prisma.book.count();
  const bookAuthorCount = await prisma.bookAuthor.count();

  console.log({
    roles: roleCount,
    users: userCount,
    authors: authorCount,
    publishers: publisherCount,
    books: bookCount,
    bookAuthors: bookAuthorCount,
  });

  console.log(`Admin user: ${adminUser.email} (id=${adminUser.id})`);
  console.log(`Sample user: ${normalUser.email} (id=${normalUser.id})`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });