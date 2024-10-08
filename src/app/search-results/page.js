"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const SearchResultsContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${query}`
        );

        if (response.status !== 200) {
          throw new Error("Error in fetching results");
        }

        const results = response.data.products;
        setSearchResults(results);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error in fetching search results from DummyJSON: ",
          error
        );
        setLoading(false);
      }
    };

    if (query) {
      getSearchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="mt-20 flex justify-center items-center w-full">
        <Loader2 className="size-16 animate-spin" />
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="mt-20 flex justify-center items-center w-full">
        <h1 className="text-3xl font-bold">No Results Found</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col sm:flex-row sm:flex-wrap justify-center sm:justify-evenly">
      {searchResults.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const SearchResults = () => {
  return (
    <Suspense fallback={<LoaderFallback />}>
      <MaxWidthWrapper>
        <SearchResultsContent />
      </MaxWidthWrapper>
    </Suspense>
  );
};

// Fallback component for Suspense
const LoaderFallback = () => (
  <div className="mt-20 flex justify-center items-center w-full">
    <Loader2 className="size-16 animate-spin" />
  </div>
);

export default SearchResults;
