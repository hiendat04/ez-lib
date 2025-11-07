import StatCard from "./StatCard";

const StatSection = () => {
  return (
    <section className="flex justify-around border-b border-gray-200 px-8 py-18 text-center">
      <StatCard number="10K" text="Books Available" />
      <StatCard number="5K" text="Active Members" />
      <StatCard number="50+" text="Categories" />
      <StatCard number="24/7" text="Access" />
    </section>
  );
};
export default StatSection;
