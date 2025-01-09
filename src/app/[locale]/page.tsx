'use client';
import { useEffect, useRef, useState } from "react";
import Navigation from './components/navigation';
import Slidder from './components/Slidder';
import Products from "@/app/[locale]/components/Products";

interface Category {
  _RowNumber:number;
  cate_id: string
  cate_name: string;
  related_items:{
    "id": string;
  };
}
export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("section_1"); // Default to the first section
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data?tableName=category");
        if (!res.ok) {
          throw new Error("Failed to fetch data from AppSheet");
        }

        const result: Category[] = await res.json();
        setCategory(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = (): void => {
      const sections = scrollContainer?.querySelectorAll<HTMLElement>("section");
      let current: string = "section_1"; // Default to the first section in case no section matches

      sections?.forEach((section) => {
        const sectionTop = section.offsetTop - (scrollContainer?.scrollTop || 0);
        if (sectionTop <= 180 && sectionTop + section.offsetHeight > 0) {
          current = section.getAttribute("id") || current;
        }
      });

      setActiveSection(current);
    };

    // Run on first render to ensure activeSection is set correctly
    handleScroll();

    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading until the data is fetched
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className="w-full max-w-screen-lg mx-auto">
        <Navigation activeSection={activeSection} category={category}/>
        <div
            ref={scrollContainerRef}
            className="h-screen !overflow-y-auto scroll-smooth pb-[160px]"
        >
          {/* Slider */}
          <div className="px-3 md:px-5 2xl:px-0">
            <Slidder />
          </div>
          {/* Products Section */}
          <div>
            {category ? (
                category.map((section) => (
                    <section key={section.cate_id} id={section.cate_id}>
                      <header className="bg-[#ededed] sticky top-[0] z-20 flex justify-center items-center gap-[5px] w-full py-2">
                        <hr className="w-full h-[3px] bg-gray-300 rounded-full ms-1 md:ms-10" />
                        <h1 className="text-black w-[40%] text-center font-bold text-[12px] md:text-[16px] lg:text-[24px]">
                          {section.cate_name}
                        </h1>
                        <hr className="w-full h-[3px] bg-gray-300 rounded-full me-1 md:me-10" />
                      </header>

                      <div className="px-3 md:px-5 2xl:px-0">
                        <Products cate_id={section.cate_id}/>
                      </div>
                    </section>
                ))
            ) : (
                <div>No categories available</div> // Fallback UI in case no data
            )}
          </div>
          {/* Footer */}
          <footer className="py-[24px]">
            <div className="text-center text-black">
              <h1 className="text-[16px] md:text-[24px]">Powered by</h1>
              <h1 className="text-[24px] md:text-[44px] text-[#eb1c25]">168styles</h1>
            </div>
          </footer>
        </div>
      </div>
  );
}
