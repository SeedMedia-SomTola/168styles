'use client';

import { useEffect, useRef, useState } from "react";
import Navegation from './components/navegation';
import Slidder from './components/Slidder';
import Image from 'next/image';

const src = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("section_1"); // Default to the first section
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
  return (
      <div className="w-full max-w-screen-lg mx-auto">
        <Navegation activeSection={activeSection} />
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
            <section id="section_1">
              <header className="bg-[#ededed] sticky top-[0] z-20 flex justify-center items-center gap-[5px] w-full py-2">
                <hr className="w-full h-[3px] bg-gray-300 rounded-full ms-1 md:ms-10" />
                <h1 className="text-black w-[40%] text-center font-bold text-[12px] md:text-[16px] lg:text-[24px]">
                  Section 1
                </h1>
                <hr className="w-full h-[3px] bg-gray-300 rounded-full me-1 md:me-10" />
              </header>

              <div className="px-3 md:px-5 2xl:px-0">
                <div className="grid grid-cols-12 items-center justify-center my-2 md:my-5 gap-[2vw] xl:gap-[1vw]">
                  <a href="#" className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md">
                    <button
                        className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition"
                    >
                      <span className="sr-only">Wishlist</span>

                      <b className="text-[12px]">10% OFF</b>
                    </button>

                    <Image
                        src={src}
                        alt="product 1"
                        width="100"
                        height="100"
                        className="h-[20vh] md:h-[40vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />

                    <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                      <p className="text-gray-400 text-[12px] md:text-[14px]">
                        ID: ANTBD12
                      </p>
                      <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                      <p className="text-gray-700">
                        $49.99
                        <span className="text-gray-400 line-through ms-2 text-[12px] md:text-[16px]">$80</span>
                      </p>
                    </div>
                  </a>
                  <a href="#" className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md">
                    <button
                        className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition"
                    >
                      <span className="sr-only">Wishlist</span>

                      <b className="text-[12px]">10% OFF</b>
                    </button>

                    <Image
                        src={src}
                        alt="product 1"
                        width="100"
                        height="100"
                        className="h-[20vh] md:h-[40vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />

                    <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                      <p className="text-gray-400 text-[12px] md:text-[14px]">
                        ID: ANTBD12
                      </p>
                      <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                      <p className="text-gray-700">
                        $49.99
                        <span className="text-gray-400 line-through ms-2 text-[12px] md:text-[16px]">$80</span>
                      </p>
                    </div>
                  </a>
                  <a href="#" className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md">
                    <button
                        className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition"
                    >
                      <span className="sr-only">Wishlist</span>

                      <b className="text-[12px]">10% OFF</b>
                    </button>

                    <Image
                        src={src}
                        alt="product 1"
                        width="100"
                        height="100"
                        className="h-[20vh] md:h-[40vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />

                    <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                      <p className="text-gray-400 text-[12px] md:text-[14px]">
                        ID: ANTBD12
                      </p>
                      <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                      <p className="text-gray-700">
                        $49.99
                        <span className="text-gray-400 line-through ms-2 text-[12px] md:text-[16px]">$80</span>
                      </p>
                    </div>
                  </a>
                  <a href="#" className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md">
                    <button
                        className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition"
                    >
                      <span className="sr-only">Wishlist</span>

                      <b className="text-[12px]">10% OFF</b>
                    </button>

                    <Image
                        src={src}
                        alt="product 1"
                        width="100"
                        height="100"
                        className="h-[20vh] md:h-[40vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />

                    <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                      <p className="text-gray-400 text-[12px] md:text-[14px]">
                        ID: ANTBD12
                      </p>
                      <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                      <p className="text-gray-700">
                        $49.99
                        <span className="text-gray-400 line-through ms-2 text-[12px] md:text-[16px]">$80</span>
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </section>
            <section id="section_2" >
              <header className="bg-[#ededed] sticky top-[0] z-20 flex justify-center items-center gap-[5px] w-full py-2">
                <hr className="w-full h-[3px] bg-gray-300 rounded-full ms-1 md:ms-10" />
                <h1 className="text-black w-[40%] text-center font-bold text-[12px] md:text-[16px] lg:text-[24px]">
                  Section 2
                </h1>
                <hr className="w-full h-[3px] bg-gray-300 rounded-full me-1 md:me-10" />
              </header>
                <div className="grid grid-cols-12 items-center justify-center my-2 md:my-5 gap-[2vw] xl:gap-[1vw] px-3 md:px-5 2xl:px-0">
                  <a href="#" className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md">
                    <button
                        className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition"
                    >
                      <span className="sr-only">Wishlist</span>

                      <b className="text-[12px]">10% OFF</b>
                    </button>

                    <Image
                        src={src}
                        alt="product 1"
                        width="100"
                        height="100"
                        className="h-[20vh] md:h-[40vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />

                    <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                      <p className="text-gray-400 text-[12px] md:text-[14px]">
                        ID: ANTBD12
                      </p>
                      <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                      <p className="text-gray-700">
                        $49.99
                        <span className="text-gray-400 line-through ms-2 text-[12px] md:text-[16px]">$80</span>
                      </p>
                    </div>
                  </a>
                  <a href="#" className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md">
                    <button
                        className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition"
                    >
                      <span className="sr-only">Wishlist</span>

                      <b className="text-[12px]">10% OFF</b>
                    </button>

                    <Image
                        src={src}
                        alt="product 1"
                        width="100"
                        height="100"
                        className="h-[20vh] md:h-[40vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />

                    <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                      <p className="text-gray-400 text-[12px] md:text-[14px]">
                        ID: ANTBD12
                      </p>
                      <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                      <p className="text-gray-700">
                        $49.99
                        <span className="text-gray-400 line-through ms-2 text-[12px] md:text-[16px]">$80</span>
                      </p>
                    </div>
                  </a>
                  <a href="#" className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md">
                    <button
                        className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition"
                    >
                      <span className="sr-only">Wishlist</span>

                      <b className="text-[12px]">10% OFF</b>
                    </button>

                    <Image
                        src={src}
                        alt="product 1"
                        width="100"
                        height="100"
                        className="h-[20vh] md:h-[40vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />

                    <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                      <p className="text-gray-400 text-[12px] md:text-[14px]">
                        ID: ANTBD12
                      </p>
                      <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                      <p className="text-gray-700">
                        $49.99
                        <span className="text-gray-400 line-through ms-2 text-[12px] md:text-[16px]">$80</span>
                      </p>
                    </div>
                  </a>
                  <a href="#" className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md">
                    <button
                        className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition"
                    >
                      <span className="sr-only">Wishlist</span>

                      <b className="text-[12px]">10% OFF</b>
                    </button>

                    <Image
                        src={src}
                        alt="product 1"
                        width="100"
                        height="100"
                        className="h-[20vh] md:h-[40vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />

                    <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                      <p className="text-gray-400 text-[12px] md:text-[14px]">
                        ID: ANTBD12
                      </p>
                      <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                      <p className="text-gray-700">
                        $49.99
                        <span className="text-gray-400 line-through ms-2 text-[12px] md:text-[16px]">$80</span>
                      </p>
                    </div>
                  </a>
                </div>
            </section>
            <section id="section_3" >
              <header className="bg-[#ededed] sticky top-[0] z-20 flex justify-center items-center gap-[5px] w-full py-2">
                <hr className="w-full h-[3px] bg-gray-300 rounded-full ms-1 md:ms-10" />
                <h1 className="text-black w-[40%] text-center font-bold text-[12px] md:text-[16px] lg:text-[24px]">
                  Section 3
                </h1>
                <hr className="w-full h-[3px] bg-gray-300 rounded-full me-1 md:me-10" />
              </header>
              <div className="grid grid-cols-12 items-center justify-center my-2 md:my-5 gap-[2vw] xl:gap-[1vw] px-3 md:px-5 2xl:px-0">
                <a href="#" className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md">
                  <button
                      className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition"
                  >
                    <span className="sr-only">Wishlist</span>

                    <b className="text-[12px]">10% OFF</b>
                  </button>

                  <Image
                      src={src}
                      alt="product 1"
                      width="100"
                      height="100"
                      className="h-[20vh] md:h-[40vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  />

                  <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                    <p className="text-gray-400 text-[12px] md:text-[14px]">
                      ID: ANTBD12
                    </p>
                    <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                    <p className="text-gray-700">
                      $49.99
                      <span className="text-gray-400 line-through ms-2 text-[12px] md:text-[16px]">$80</span>
                    </p>
                  </div>
                </a>
                <a href="#" className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md">
                  <button
                      className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition"
                  >
                    <span className="sr-only">Wishlist</span>

                    <b className="text-[12px]">10% OFF</b>
                  </button>

                  <Image
                      src={src}
                      alt="product 1"
                      width="100"
                      height="100"
                      className="h-[20vh] md:h-[40vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  />

                  <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                    <p className="text-gray-400 text-[12px] md:text-[14px]">
                      ID: ANTBD12
                    </p>
                    <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                    <p className="text-gray-700">
                      $49.99
                      <span className="text-gray-400 line-through ms-2 text-[12px] md:text-[16px]">$80</span>
                    </p>
                  </div>
                </a>
                <a href="#" className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md">
                  <button
                      className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition"
                  >
                    <span className="sr-only">Wishlist</span>

                    <b className="text-[12px]">10% OFF</b>
                  </button>

                  <Image
                      src={src}
                      alt="product 1"
                      width="100"
                      height="100"
                      className="h-[20vh] md:h-[40vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  />

                  <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                    <p className="text-gray-400 text-[12px] md:text-[14px]">
                      ID: ANTBD12
                    </p>
                    <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                    <p className="text-gray-700">
                      $49.99
                      <span className="text-gray-400 line-through ms-2 text-[12px] md:text-[16px]">$80</span>
                    </p>
                  </div>
                </a>
                <a href="#" className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md">
                  <button
                      className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition"
                  >
                    <span className="sr-only">Wishlist</span>

                    <b className="text-[12px]">10% OFF</b>
                  </button>

                  <Image
                      src={src}
                      alt="product 1"
                      width="100"
                      height="100"
                      className="h-[20vh] md:h-[40vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  />

                  <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                    <p className="text-gray-400 text-[12px] md:text-[14px]">
                      ID: ANTBD12
                    </p>
                    <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                    <p className="text-gray-700">
                      $49.99
                      <span className="text-gray-400 line-through ms-2 text-[12px] md:text-[16px]">$80</span>
                    </p>
                  </div>
                </a>
              </div>
            </section>
          </div>
          {/* Footer */}
          <footer className="py-[24px]">
            <div className="text-center text-black">
              <h1 className="text-[16px] md:text-[24px]">Powered by</h1>
              <h1 className="text-[24px] md:text-[44px] text-[#e9ad31]">168.Styles</h1>
            </div>
          </footer>
        </div>
      </div>
  );
}
