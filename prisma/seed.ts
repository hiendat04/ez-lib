import { Book } from "@/types/books";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Clean up in order that respects foreign keys
  console.log("Deleting existing data...");
  await prisma.bookAuthor.deleteMany({});
  await prisma.loan.deleteMany({});
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
    {
      title: "To Kill a Mockingbird",
      isbn: "9780061120084",
      category: "Fiction",
      publisherIdx: 0,
      totalCopies: 5,
      year: 1960,
      description:
        "A powerful novel about racial injustice and the loss of innocence in the American South, as seen through the eyes of a young girl.",
    },
    {
      title: "1984",
      isbn: "9780451524935",
      category: "Dystopian",
      publisherIdx: 1,
      totalCopies: 6,
      year: 1949,
      description:
        "A chilling dystopian masterpiece that explores the dangers of totalitarianism, mass surveillance, and the manipulation of truth.",
    },
    {
      title: "Pride and Prejudice",
      isbn: "9780141040349",
      category: "Romance",
      publisherIdx: 2,
      totalCopies: 4,
      year: 1813,
      description:
        "A classic novel of manners, marriage, and social status in early 19th-century England, centered on the spirited Elizabeth Bennet.",
    },
    {
      title: "The Hobbit",
      isbn: "9780547928227",
      category: "Fantasy",
      publisherIdx: 2,
      totalCopies: 7,
      year: 1937,
      description:
        "The enchanting prelude to The Lord of the Rings, following Bilbo Baggins on an unexpected journey to reclaim treasure from a dragon.",
    },
    {
      title: "I, Robot",
      isbn: "9780553382563",
      category: "Science Fiction",
      publisherIdx: 1,
      totalCopies: 3,
      year: 1950,
      description:
        "A collection of interconnected short stories that explore the ethical implications of artificial intelligence through the Three Laws of Robotics.",
    },
    {
      title: "Frankenstein",
      isbn: "9780143131847",
      category: "Horror",
      publisherIdx: 3,
      totalCopies: 4,
      year: 1818,
      description:
        "Mary Shelley's gothic masterpiece about the consequences of ambition and the creation of a sentient being in a scientific experiment gone wrong.",
    },
    {
      title: "Brave New World",
      isbn: "9780060850524",
      category: "Dystopian",
      publisherIdx: 0,
      totalCopies: 5,
      year: 1932,
      description:
        "A visionary novel depicting a future society where conformity and happiness are engineered, at the cost of freedom and individuality.",
    },
    {
      title: "The Great Gatsby",
      isbn: "9780743273565",
      category: "Fiction",
      publisherIdx: 4,
      totalCopies: 5,
      year: 1925,
      description:
        "A poignant critique of the American Dream, set in the lavish and decadent Jazz Age, exploring themes of wealth, love, and loss.",
    },
    {
      title: "War and Peace",
      isbn: "9780199232765",
      category: "Historical",
      publisherIdx: 3,
      totalCopies: 2,
      year: 1869,
      description:
        "An epic novel chronicling the lives of Russian aristocratic families during the Napoleonic invasion, weaving history with profound philosophy.",
    },
    {
      title: "Adventures of Huckleberry Finn",
      isbn: "9780486280615",
      category: "Classic",
      publisherIdx: 4,
      totalCopies: 3,
      year: 1884,
      description:
        "A seminal American novel about a young boy's journey down the Mississippi River with a runaway slave, exploring themes of freedom and morality.",
    },
    {
      title: "Childhood's End",
      isbn: "9780345338986",
      category: "Science Fiction",
      publisherIdx: 5,
      totalCopies: 3,
      year: 1953,
      description:
        "A thought-provoking story of humanity's final generation after a peaceful alien invasion ushers in an era of utopia, but at a mysterious cost.",
    },
    {
      title: "Good Omens",
      isbn: "9780060853983",
      category: "Fantasy",
      publisherIdx: 0,
      totalCopies: 4,
      year: 1990,
      description:
        "A witty and apocalyptic comedy about an angel and a demon who team up to prevent the end of the world because they've grown fond of Earth.",
    },
    {
      title: "Beloved",
      isbn: "9781400033416",
      category: "Fiction",
      publisherIdx: 1,
      totalCopies: 3,
      year: 1987,
      description:
        "A haunting and powerful novel about the psychological trauma of slavery, centered on a former slave whose past literally comes back to haunt her.",
    },
    {
      title: "Foundation",
      isbn: "9780553293357",
      category: "Science Fiction",
      publisherIdx: 5,
      totalCopies: 6,
      year: 1951,
      description:
        "A galactic epic about a band of exiles who must preserve knowledge and rebuild civilization amidst the collapse of a vast interstellar empire.",
    },
    {
      title: "The Silmarillion",
      isbn: "9780618126989",
      category: "Fantasy",
      publisherIdx: 2,
      totalCopies: 2,
      year: 1977,
      description:
        "The mythological and historical backstory of Middle-earth, chronicling the creation of the world and the epic tales of the First Age.",
    },
    {
      title: "Emma",
      isbn: "9780141439587",
      category: "Romance",
      publisherIdx: 2,
      totalCopies: 3,
      year: 1815,
      description:
        "A witty novel of manners about a clever, wealthy, and self-satisfied young woman who delights in matchmaking with disastrous results.",
    },
    {
      title: "The Left Hand of Darkness",
      isbn: "9780441478125",
      category: "Science Fiction",
      publisherIdx: 5,
      totalCopies: 3,
      year: 1969,
      description:
        "A groundbreaking novel exploring themes of gender and identity on a planet where inhabitants are ambisexual, challenging societal norms.",
    },
    {
      title: "The Road",
      isbn: "9780307387899",
      category: "Post-Apocalyptic",
      publisherIdx: 1,
      totalCopies: 4,
      year: 2006,
      description:
        "A stark and moving story of a father and son's journey through a desolate, post-apocalyptic landscape, clinging to hope and humanity.",
    },
    {
      title: "Slaughterhouse-Five",
      isbn: "9780440180296",
      category: "Fiction",
      publisherIdx: 0,
      totalCopies: 4,
      year: 1969,
      description:
        "A satirical and anti-war novel that follows Billy Pilgrim as he becomes 'unstuck in time,' experiencing his life out of order, including his time as a POW.",
    },
    {
      title: "The Name of the Wind",
      isbn: "9780756404741",
      category: "Fantasy",
      publisherIdx: 4,
      totalCopies: 5,
      year: 2007,
      description:
        "The first book in an epic fantasy series, detailing the early life of a magically gifted young man who grows into a notorious wizard.",
    },
    {
      title: "American Gods",
      isbn: "9780062572233",
      category: "Fantasy",
      publisherIdx: 1,
      totalCopies: 3,
      year: 2001,
      description:
        "A story of a brewing war between old mythological gods and new American gods of money, technology, and media, seen through the eyes of an ex-convict.",
    },
    {
      title: "Neuromancer",
      isbn: "9780441569595",
      category: "Cyberpunk",
      publisherIdx: 5,
      totalCopies: 3,
      year: 1984,
      description:
        "The seminal cyberpunk novel about a washed-up computer hacker hired for one last job, which draws him into a world of artificial intelligence and digital espionage.",
    },
    {
      title: "Dune",
      isbn: "9780441013593",
      category: "Science Fiction",
      publisherIdx: 5,
      totalCopies: 6,
      year: 1965,
      description:
        "An epic science fiction saga of politics, religion, and power on a desert planet that is the sole source of a priceless spice.",
    },
    {
      title: "Kindred",
      isbn: "9780807083697",
      category: "Historical",
      publisherIdx: 0,
      totalCopies: 4,
      year: 1979,
      description:
        "A gripping novel that combines science fiction with slave narrative, as a modern African-American woman is repeatedly pulled back in time to the antebellum South.",
    },
  ];

  const books: any[] = [];
  for (let i = 0; i < booksData.length; i++) {
    const b = booksData[i];
    const created = await prisma.book.create({
      data: {
        title: b.title,
        isbn: b.isbn,
        category: b.category,
        year: b.year, // Add the year here
        publisherId: publishers[b.publisherIdx].id,
        totalCopies: b.totalCopies,
        availableCopies: b.totalCopies,
        description: b.description, // The updated description will be used
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
  const explicitAuthorNames = Array.from(
    new Set(explicitPairs.map((p) => p.authorName)),
  );
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
  bookAuthorPairs.push({
    bookTitle: "Good Omens",
    authorName: "Terry Pratchett",
  });
  bookAuthorPairs.push({
    bookTitle: "Foundation",
    authorName: "Arthur C. Clarke",
  }); // fictional pairing for demo
  bookAuthorPairs.push({ bookTitle: "Dune", authorName: "Frank Herbert" }); // already present but safe (duplicate will be deduped below)

  // Deduplicate pairs
  const uniquePairs = new Map<
    string,
    { bookTitle: string; authorName: string }
  >();
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
        console.warn(
          `Could not create bookAuthor for ${pair.bookTitle} / ${pair.authorName}:`,
          err?.message ?? err,
        );
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
    const exists = await prisma.bookAuthor
      .findUnique({
        where: {
          // composite PK fields mapping depends on Prisma client, use findFirst for safe lookup
          // We'll use findFirst to check existence
          AND: [{ bookId: book.id }, { authorId: extraAuthor.id }],
        } as any,
      })
      .catch(() => null);

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
