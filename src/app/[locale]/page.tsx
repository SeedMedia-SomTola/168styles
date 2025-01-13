'use client';
import {useEffect, useMemo, useRef, useState} from "react";
import Navigation from './components/navigation';
import Slidder from './components/Slidder';
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
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
  image_url: string;
  image_display_1:string;
  image_display_2:string;
  image_display_3:string;
  image_display_4:string;
  image_display_5:string;
}

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [modelId, setModelId] = useState<string | null>(null);
  const [category, setCategory] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Products[] | null>(null);
  const t = useTranslations('Home');
  const [params, setParams] = useState<string>();

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
  const showModal = (id: string): void => {
    const elementId = `my_modal_${id}`;
    setModelId(id);
    setTimeout(() => {
      const bindingElement = document.getElementById(elementId);
      if (bindingElement) {
        const dialogElement = bindingElement as HTMLDialogElement;
        if (dialogElement && typeof dialogElement.showModal === "function") {
          dialogElement.showModal();
        } else {
          console.error(
              `The element with ID "${elementId}" does not support the "showModal" method. Ensure it's a <dialog> element.`
          );
        }
      } else {
        console.error(`No element found with ID "${elementId}".`);
      }
    }, 0);
  };

  const handleParams = (value:string): void => {
    setParams(value);
  }

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((product) =>
        params ? product.item_name.toLowerCase().includes(params.toLowerCase()) : true
    );
  }, [data, params]);

  if (isLoading) {
    return <div className="flex flex-col justify-center items-center overflow-hidden fixed inset-0 text-center text-gray-500 z-[50]">
      <span className="loading loading-spinner text-error"></span>
    </div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className="w-full max-w-screen-lg mx-auto">
        <Navigation searchParams={handleParams} containScroll={scrollContainerRef}/>
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
                  <h2 className="text-xl text-center font-semibold text-gray-700">Data not exist!</h2>
                  <p className="text-gray-500 mt-2 text-center">
                    Try adjusting your search or filters to find what you are looking for.
                  </p>
                </div>
            ) : (
                category
                    ?.filter((cate) =>
                        filteredData.some((item) => item.category === cate.cate_id) // Check if any items match the category ID
                    )
                    .map((cate) => (
                        <section
                            id={`section_${cate.cate_id}`}
                            key={cate.cate_id}
                            className={`section bg-[#ededed]`}
                        >
                          <header className="sticky top-0 z-20 bg-[#ededed] flex justify-center items-center gap-[5px] w-full py-2">
                            <hr className="w-full h-[3px] bg-gray-300 rounded-full ms-1 md:ms-10" />
                            <h1 className="text-black w-full text-center font-bold text-[16px] lg:text-[24px]">
                              {cate.cate_name}
                            </h1>
                            <hr className="w-full h-[3px] bg-gray-300 rounded-full me-1 md:me-10" />
                          </header>
                          <div className="px-3 md:px-5 xl:px-0 grid grid-cols-12 items-center justify-center my-2 md:my-5 gap-[2vw] xl:gap-[1vw]">
                            {filteredData.map((items) =>
                                    items.category !== cate.cate_id ? null : (
                                        <button
                                            onClick={() => showModal(items.item_id)}
                                            key={items.item_id}
                                            className="col-span-6 group relative block overflow-hidden rounded-lg md:rounded-xl shadow-md"
                                        >
                                          <strong className="absolute start-2 top-2 z-10 rounded-md bg-red-500 px-1 text-white transition">
                                            <span className="sr-only">Wishlist</span>
                                            <b className="text-[12px] pb-[2px]">{t('promotion')}</b>
                                          </strong>
                                          <Image
                                              src={items.image_url}
                                              alt={items.item_name}
                                              width={1760}
                                              height={2000}
                                              className="h-[20vh] md:h-[50vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                                          />
                                          <div className="relative border border-gray-100 bg-white p-2 md:p-6 text-start">
                                            <p className="text-gray-400 text-[12px] md:text-[14px]">
                                              ID:{items.item_id}
                                            </p>
                                            <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900 truncate ...">
                                              {items.item_name}
                                            </h3>
                                            <span className="text-gray-400 line-through text-[14px] decoration-red-500">
                      ${items.unit_price}
                    </span>
                                            <p className="text-gray-700"> ${items.unit_price}</p>
                                          </div>
                                        </button>
                                    )
                            )}
                          </div>
                        </section>
                    ))
            )}
          </div>

          {modelId && data && data.map((item) => {
            if (item.item_id === modelId) {
              return (
                  <dialog id={`my_modal_${modelId}`} className="modal !p-0 !m-0" key={item.item_id}>
                    <div className="modal-box !p-0 !m-0 !relative !h-[80vh] md:!h-[60vh] xl:!h-[76vh]">
                      <form method="dialog">
                        <button
                            className="btn btn-sm text-red-500 btn-circle btn-ghost absolute right-2 top-2 z-[30]">✕
                        </button>
                      </form>
                      <div className="w-full">
                        {item.image_display_1 === '' && item.image_display_2 === '' && item.image_display_3 === '' && item.image_display_4 === '' && item.image_display_5 === ''?
                            <Image
                                src={item.image_url}
                                alt={item.item_name}
                                width={1760} height={2000}
                                className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                            />
                            :
                            <Swiper
                                pagination={{
                                  dynamicBullets: true,  // Enable dynamic bullets
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                              {item.image_url === '' ? '' :
                              <SwiperSlide>
                                <Image
                                    src={item.image_url}
                                    alt={item.item_name}
                                    width={1760} height={2000}
                                    className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                                />
                              </SwiperSlide>
                              }
                              {item.image_display_1 === '' ? '' :
                              <SwiperSlide>
                                <Image
                                    src={item.image_display_1}
                                    alt={item.item_name}
                                    width={1760} height={2000}
                                    className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                                />
                              </SwiperSlide>
                              }
                              {item.image_display_2 === '' ? '' :
                              <SwiperSlide>
                                <Image
                                    src={item.image_display_2}
                                    alt={item.item_name}
                                    width={1760} height={2000}
                                    className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                                />
                              </SwiperSlide>
                              }
                              {item.image_display_3 === '' ? '' :
                              <SwiperSlide>
                                <Image
                                    src={item.image_display_3}
                                    alt={item.item_name}
                                    width={1760} height={2000}
                                    className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                                />
                              </SwiperSlide>
                              }
                              {item.image_display_4 === '' ? '' :
                              <SwiperSlide>
                                <Image
                                    src={item.image_display_4}
                                    alt={item.item_name}
                                    width={1760} height={2000}
                                    className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                                />
                              </SwiperSlide>
                              }
                              {item.image_display_5 === '' ? '' :
                              <SwiperSlide>
                                <Image
                                    src={item.image_display_5}
                                    alt={item.item_name}
                                    width={1760} height={2000}
                                    className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                                />
                              </SwiperSlide>
                              }
                            </Swiper>
                        }
                      </div>
                      <div className="relative flex flex-col items-start justify-end bg-white p-2">
                        <strong
                            className="my-2 start-2 top-2 z-10 rounded-md bg-red-500/30 px-1 text-red-500 transition">
                          <span className="sr-only">Wishlist</span>
                          <b className="text-[12px] pb-[2px]">{t('promotion')}</b>
                        </strong>
                        <div className="flex flex-col items-start gap-2">
                          <span
                              className="text-gray-400 line-through text-[14px] decoration-red-500">${item.unit_price}</span>
                          <strong className="text-[14px] text-red-500 uppercase">
                            ID: {item.item_id}
                          </strong>
                          <b className="text-[14px] font-[600] text-gray-700 uppercase">
                            {item.item_name}
                          </b>
                          <p className="text-[14px] text-light text-gray-700 text-balance">
                            {item.description.split("\n").map((line, index) => (
                                <span key={index}>
                            {line}
                                  <br/>
                          </span>
                            ))}
                          </p>
                          <p className="text-[14px] text-light text-gray-700 text-balance">
                            {item.color} {item.size}
                          </p>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-center gap-3 bg-white pb-3">
                        <Link href="#">
                          <Image src="/assets/images/facebook.png" alt="kh-flag" width="3000" height="2000"
                                 className="w-[24px] h-[24px] rounded-[4px]"/>
                        </Link>
                        <Link href="#">
                          <Image src="/assets/images/telegram.png" alt="kh-flag" width="3000" height="2000"
                                 className="w-[24px] h-[24px] rounded-[4px]"/>
                        </Link>
                        <Link href="#">
                          <Image src="/assets/images/googlemap.png" alt="kh-flag" width="3000" height="2000"
                                 className="w-[24px] h-[24px] rounded-[4px]"/>
                        </Link>
                        <Link href="#" className="flex gap-3 text-black">
                          <Image src="/assets/images/telephone.png" alt="kh-flag" width="3000" height="2000"
                                 className="w-[24px] h-[24px] rounded-[4px]"/>
                          012 123 123
                        </Link>
                      </div>
                    </div>
                  </dialog>
              );
            }
              return null;
            })}
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

