"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = ({
  initialSearch = "",
  initialCategory = "",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/classes?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />

        <input
          type="text"
          defaultValue={initialSearch}
          placeholder="Search classes..."
          onChange={(e) => updateFilter("search", e.target.value)}
          className="w-full rounded-xl border border-neutral-700 bg-neutral-900 py-3 pl-10 pr-4 text-white outline-none focus:border-green-500"
        />
      </div>

      <select
        defaultValue={initialCategory || "all"}
        onChange={(e) => updateFilter("category", e.target.value)}
        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-green-500 md:w-64"
      >
        <option value="all">All Categories</option>
        <option value="Yoga">Yoga</option>
        <option value="Cardio">Cardio</option>
        <option value="Strength">Strength</option>
        <option value="HIIT">HIIT</option>
      </select>
    </div>
  );
};

export default SearchBar;