import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-primary mt-4 py-25 text-white">
      <div className="grid grid-cols-2">
        <div className="space-y-6">
          <div className="ml-100 flex h-full flex-col flex-wrap justify-center gap-10">
            <p className="text-6xl font-bold">Your Gateway To Knowledge</p>
            <p className="text-xl">
              Discover, borrow, and manage your favorite books with our modern
              library management system. Join thousands of readers today
            </p>
            <div className="flex gap-8 justify-self-end">
              <p className="bg-accent hover:bg-accent/80 cursor-pointer rounded-lg px-5 py-3 font-medium text-black">
                Get Started
              </p>
              <p className="bg-accent hover:bg-accent/80 cursor-pointer rounded-lg px-5 py-3 font-medium text-black">
                Learn More
              </p>
            </div>
          </div>
        </div>
        <div className="justify-self-center">
          <Image
            alt="EzLib"
            src="/landing/book-hero.png"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
