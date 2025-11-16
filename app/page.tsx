import BookCard from "@/components/BookCard";
import FeatureLayout from "@/components/landing/FeatureLayout";
import FeatureSectionCard from "@/components/landing/FeatureSectionCard";
import FeatureTitle from "@/components/landing/FeatureTitle";
import HeroSection from "@/components/landing/HeroSection";
import PublicHeader from "@/components/landing/PublicHeader";
import StatSection from "@/components/landing/StatSection";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { BarChart } from "@mui/icons-material";
import GppGoodIcon from "@mui/icons-material/GppGood";
import BoltIcon from "@mui/icons-material/Bolt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import StepCard from "@/components/landing/StepCard";
import Footer from "@/components/landing/Footer";
import { Author } from "@prisma/client";
import Link from "next/link";

export default async function Home() {
  const features = [
    {
      icon: ImportContactsTwoToneIcon,
      title: "Extensive Collection",
      description:
        "Access thousands of books across multiple categories and genres",
    },
    {
      icon: AccessTimeIcon,
      title: "Easy Borrowing",
      description:
        "Borrow books with a click and manage your loans effortlessly",
    },
    {
      icon: BarChart,
      title: "Track Your Reading",
      description: "Monitor your reading history and borrowing trends",
    },
    {
      icon: GppGoodIcon,
      title: "Secure & Reliable",
      description:
        "Your data is safe with our secure library management system",
    },
    {
      icon: BoltIcon,
      title: "Fast & Efficient",
      description: "Find and reserve books quickly with our intuitive search",
    },
    {
      icon: LibraryBooksIcon,
      title: "Digital Management",
      description: "Modern digital library system for the 21st century",
    },
  ];

  const steps = [
    {
      step: 1,
      stepName: "Create Account",
      stepDetails:
        "Sign up with your email to get instant access to our library",
    },
    {
      step: 2,
      stepName: "Browse Books",
      stepDetails: "Search through thousands of books and find your next read",
    },
    {
      step: 3,
      stepName: "Start Reading",
      stepDetails: "Borrow books instantly and manage your reading journey",
    },
  ];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const books = await fetch(`${baseUrl}/api/books?limit=8`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((data) => data.books);

  return (
    <>
      <PublicHeader />
      <HeroSection />
      <StatSection />

      {/* Feature Books */}
      <FeatureLayout background="bg-white">
        <FeatureTitle
          title="Feature Books"
          subtitle="Discover some of our most popular titles"
        />
        <div className="grid grid-cols-4">
          {books.map((book: any) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.authors
                .map((author: Author) => author.name)
                .join(", ")}
              totalCopies={book.totalCopies}
              availableCopies={book.availableCopies}
              coverImageUrl={book.coverImageUrl}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/books" className="bg-primary hover:bg-primary-hover cursor-pointer rounded-md px-6 py-2 font-medium text-white transition">
            Browse All Books
          </Link>
        </div>
      </FeatureLayout>

      {/* Feature Sections */}
      <FeatureLayout background="fe">
        <FeatureTitle
          title="Everything You Need"
          subtitle="Our comprehensive library management system provides all the tools you need for a seamless reading experience"
        />
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-3 grid-rows-2 gap-10">
          {features.map((feature, index) => (
            <FeatureSectionCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </FeatureLayout>

      {/* How It Works */}
      <FeatureLayout background="bg-white">
        <FeatureTitle
          title="How It Works"
          subtitle="Get started in three simple steps"
        />
        <div className="flex justify-between">
          {steps.map((step) => (
            <StepCard
              key={step.step}
              step={step.step}
              stepName={step.stepName}
              stepDetails={step.stepDetails}
            />
          ))}
        </div>
      </FeatureLayout>

      {/* Ready To Start Your Journey */}
      <FeatureLayout background="bg-gradient-to-r from-primary to-secondary">
        <FeatureTitle
          titleColor="text-white"
          subtitleColor="text-white"
          title="Ready to Start Your Reading Journey?"
          subtitle="Join our community of book lovers today and unlock unlimited access to knowledge"
        />
        <div className="mt-8 text-center">
          <button className="bg-accent cursor-pointer rounded-md px-6 py-3 font-medium text-black transition hover:shadow-lg">
            Get Started Now
          </button>
        </div>
      </FeatureLayout>
      <Footer />
    </>
  );
}
