'use client';
import {useEffect, useMemo, useRef, useState} from "react";
import Navigation from './components/navigation';
import Slidder from './components/Slidder';
import Products from "@/app/[locale]/components/Products";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Category {
  _RowNumber: number;
  cate_id: string;
  cate_name: string;
  related_items: {
    "id": string;
  };
}

interface Products {
  _RowNumber: number;
  item_id: string;
  item_name: string;
  description: string;
  size: string;
  color: string;
  category: string;
  unit: string;
  unit_price: string;
  current_stock: string;
  image: string;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("section_0"); // Default to the first section
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [category, setCategory] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelId, setModelId] = useState<string | null>(null);
  const [data, setData] = useState<Products[] | null>(null);
  const [params, setParams] = useState<string>();
  const t = useTranslations('Home');
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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

    const fetchDataPro = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/data?tableName=item");
        if (!res.ok) {
          throw new Error("Failed to fetch data from AppSheet");
        }

        const result: Products[] = await res.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataPro();
    fetchData();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;


    const handleScroll = (): void => {
      if (!scrollContainer) return;

      const sections = scrollContainer.querySelectorAll<HTMLElement>("section");
      let current: string = "section_0"; // Default section

      sections?.forEach((section) => {
        const rect = section.getBoundingClientRect(); // Use getBoundingClientRect for better scroll position tracking
        const sectionTop = rect.top + scrollContainer.scrollTop;
        if (sectionTop <= 180 && sectionTop + section.offsetHeight > 0) {
          current = section.getAttribute("id") || current;
        }
      });

      setActiveSection(current);
    };

    // Run on first render to ensure activeSection is set correctly
    if (scrollContainer) {
      handleScroll();
    }

    // Attach scroll event listener
    scrollContainer?.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleShowModal = (id: string) => {
    setModelId(id);
  };

  const handleSearchParam = (searchParams: string) => {
    setParams(searchParams);
  };

  // Bind the handleScroll function in useEffect

  const filteredData = useMemo(() => {
    if (!category) return [];
    return category.filter((cat) =>
        params ? cat.cate_name.toLowerCase().includes(params.toLowerCase()) : true
    );
  }, [category, params]);

  if (isLoading) {
    return <div className="flex flex-col justify-center items-center overflow-hidden fixed inset-0 text-center text-gray-500">
      <span className="loading loading-bars loading-lg"></span>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  return (
      <div className="w-full max-w-screen-lg mx-auto">
        <Navigation activeSection={activeSection} category={category} searchParams={handleSearchParam} />
        <div
            ref={scrollContainerRef}
            className="!h-screen !overflow-y-scroll scroll-smooth pb-[160px]"
        >
          <div className="px-3 md:px-5 2xl:px-0">
            <Slidder />
          </div>

          <div>
            {filteredData.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-10">
                  <Image
                      src="/assets/images/data-not-found.png" // Replace with your image path
                      alt="No data"
                      width={256} // Replace with the desired width
                      height={256} // Replace with the desired height
                      className="mb-6" // Any additional classes can be kept here
                  />
                  <h2 className="text-xl font-semibold text-gray-700">Search not found!</h2>
                  <p className="text-gray-500 mt-2 text-center">Try adjusting your search or filters to find what you are looking for.</p>
                </div>
            ) : (
                filteredData.map((section,idx) => (
                    <section
                        key={section.cate_id}
                        id={`section_${idx}`}
                        className={`bg-gray-200`} // Highlight the active section
                    >
                      <header className="bg-[#ededed] sticky top-0 z-20 flex justify-center items-center gap-[5px] w-full py-2">
                        <hr className="w-full h-[3px] bg-gray-300 rounded-full ms-1 md:ms-10" />
                        <h1 className="text-black w-full text-center font-bold text-[16px] lg:text-[24px]">
                          {section.cate_name}
                        </h1>
                        <hr className="w-full h-[3px] bg-gray-300 rounded-full me-1 md:me-10" />
                      </header>
                      <div className="px-3 md:px-5 2xl:px-0">
                        <Products
                            cate_id={section.cate_id}
                            sendIdToParent={handleShowModal}
                            searchParams={params}
                        />
                      </div>
                    </section>
                ))
            )}
          </div>

          {modelId && data && data.map((item) => {
            if (item.item_id === modelId) {
              return (
                  <dialog id={`my_modal_${modelId}`} className="modal !p-0 !m-0" key={item.item_id}>
                    <div className="modal-box !p-0 !m-0 !relative !h-[50vh] xl:!h-[70vh]">
                      <form method="dialog">
                        <button className="btn btn-sm text-red-500 btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <div className="w-full">
                        <Image
                            src={item.image}
                            alt={item.item_name}
                            width={1760} height={2000}
                            className="w-full h-[36vh] xl:h-[50vh] object-cover object-center"
                        />
                      </div>
                      <div className="relative flex flex-col items-start justify-start bg-white p-2">
                        <strong className="my-2 start-2 top-2 z-10 rounded-md bg-red-500/30 px-1 text-red-500 transition">
                          <span className="sr-only">Wishlist</span>
                          <b className="text-[12px] pb-[2px]">{t('promotion')}</b>
                        </strong>
                        <div className="flex flex-col items-start gap-2">
                          <span className="text-gray-400 line-through text-[14px] decoration-red-500">${item.unit_price}</span>
                          <strong className="text-[14px] text-red-500 uppercase">
                            ID: {item.item_id}
                          </strong>
                          <b className="text-[14px] font-[600] text-gray-700 uppercase">
                            {item.item_name}
                          </b>
                          <p className="text-[12px] text-light text-gray-700 text-balance">
                            {item.description.split("\n").map((line, index) => (
                                <span key={index}>
                            {line}
                                  <br />
                          </span>
                            ))}
                          </p>
                          <p className="text-[12px] text-light text-gray-700 text-balance">
                            {item.color} {item.size}
                          </p>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-center gap-3 bg-white pb-3">
                        <Link href="#">
                          <Image src="/assets/images/facebook.png" alt="kh-flag" width="3000" height="2000" className="w-[24px] h-[24px] rounded-[4px]" />
                        </Link>
                        <Link href="#">
                          <Image src="/assets/images/telegram.png" alt="kh-flag" width="3000" height="2000" className="w-[24px] h-[24px] rounded-[4px]" />
                        </Link>
                        <Link href="#">
                          <Image src="/assets/images/googlemap.png" alt="kh-flag" width="3000" height="2000" className="w-[24px] h-[24px] rounded-[4px]" />
                        </Link>
                        <Link href="#" className="flex gap-3 text-black">
                          <Image src="/assets/images/telephone.png" alt="kh-flag" width="3000" height="2000" className="w-[24px] h-[24px] rounded-[4px]" />
                          012 123 123
                        </Link>
                      </div>
                    </div>
                  </dialog>
              );
            }
            return null;
          })}
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

