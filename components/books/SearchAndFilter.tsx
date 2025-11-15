"use client";
import Input from "@/components/form/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchAndFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [categories, setCategories] = useState<string[]>([]);

  const updateURL = (search: string, category: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    params.set("page", "1"); // Reset to first page when searching/filtering

    router.push(`/books?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    updateURL(value, selectedCategory);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    updateURL(searchValue, category);
  };

  // Call the API when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/books/categories`);
        const data = await response.json();

        if (data.success) {
          setCategories(data.categories);
        } else {
          console.error("Failed to fetch categories:", data.message);
        }
      } catch (error) {
        console.error("Fetch categories error:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mx-auto mt-10 flex w-full max-w-4xl items-center justify-center gap-4">
      <Input
        label=""
        id="search"
        placeholder="Search by title or author"
        value={searchValue}
        onChange={handleSearchChange}
        className="max-w-md flex-1"
      />
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="focus:border-primary w-48 rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
      >
        <option value="">All Categories</option>
        {categories.map((category: string) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchAndFilter;
