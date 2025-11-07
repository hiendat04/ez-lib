import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-primary py-30 text-white">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold lg:text-6xl">
              Your Gateway To Knowledge
            </h1>
            <p className="text-lg lg:text-xl">
              Discover, borrow, and manage your favorite books with our modern
              library management system. Join thousands of readers today
            </p>
            <div className="flex gap-4">
              <button className="bg-accent hover:bg-accent/80 cursor-pointer rounded-lg px-6 py-3 font-medium text-black transition-colors">
                Get Started
              </button>
              <button className="bg-accent hover:bg-accent/80 cursor-pointer rounded-lg px-6 py-3 font-medium text-black transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex justify-center lg:justify-end">
            <Image
              alt="EzLib"
              src="/landing/book-hero.png"
              width={500}
              height={500}
              className="h-auto max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
