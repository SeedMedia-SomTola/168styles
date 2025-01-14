"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Navigation from "./components/navigation";
import Slidder from "./components/Slidder";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
interface Category {
  _RowNumber: number;
  cate_id: string;
  cate_name: string;
  related_items: {
    id: string;
  };
}

interface Products {
  item_id: string;
  item_name: string;
  description: string;
  size: string;
  color: string;
  category: string;
  unit_price: number;
  sale_price:number;
  image_url: string;
  image_display_1: string;
  image_display_2: string;
  image_display_3: string;
  image_display_4: string;
  image_display_5: string;
}

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [modelId, setModelId] = useState<string | null>(null);
  const [category, setCategory] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Products[] | null>(null);
  const t = useTranslations("Home");
  const [params, setParams] = useState<string>();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [qtyChange, setQtyChange] = useState<number>(0);
  const [productId, setProductId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);

  const [btnLoading, setBtnLoading] = useState(true);
  const [modalToggle, setModalToggle] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

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
    data?.map((items) => {
      if (items.item_id === modelId) {
        setProductId(items.item_id);
        setProductName(items.item_name);
        setProductPrice(items.unit_price);
      }
    });
  });
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

  const handleParams = (value: string): void => {
    setParams(value);
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((product) =>
      params
        ? product.item_name.toLowerCase().includes(params.toLowerCase())
        : true
    );
  }, [data, params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (qtyChange === 0) {
      setAlert("Please set Quantity. Can not empty!");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return;
    }

    setBtnLoading(false);
    try {
      const res = await fetch("/api/sendToTelegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedSize,
          selectedColor,
          qtyChange,
          productId,
          productName,
          productPrice,
          customer,
          phone,
          address
        }),
      });

      const resAppSheet = await fetch("/api/postDataToAppSheet?tableName=order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qtyChange,
          productId,
          productPrice,
          customer,
          phone,
          address,
        }),
      });

      const data = await res.json();
      const dataAppSheet = await resAppSheet.json();

      if (res.ok) {
        setAlert("Message sent successfully!");
      } else {
        setAlert(`Error: ${data.message}`);
        setAlert(`Error: ${dataAppSheet.message}`);
      }
    } catch (error) {
      setAlert("An error occurred while sending the message.");
      console.error(error);
    } finally {
      setAlert("");
      setBtnLoading(true);
      setModalToggle(false);
      setCustomer('');
      setPhone('');
      setAddress('');
      setSelectedSize('');
      setSelectedColor('');
    }
  };

  const onCloseModal = () => {
    window.location.reload();
  }
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const handleToggle = () => {
    setModalToggle((prev) => !prev); // Toggle modal state
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center overflow-hidden fixed inset-0 text-center text-gray-500 z-[50]">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <Navigation
        searchParams={handleParams}
        containScroll={scrollContainerRef}
      />
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
              <h2 className="text-xl text-center font-semibold text-gray-700">
                Data not exist!
              </h2>
              <p className="text-gray-500 mt-2 text-center">
                Try adjusting your search or filters to find what you are
                looking for.
              </p>
            </div>
          ) : (
            category
              ?.filter(
                (cate) =>
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
                          <strong className="absolute start-2 top-2 z-10 rounded-md bg-red-500 px-2 text-white transition">
                            <span className="sr-only">Wishlist</span>
                            <b className="text-[12px] sr-only">
                              {t("promotion")}
                            </b>
                          </strong>
                          <Image
                            src={items.image_url}
                            alt={items.item_name}
                            width={1760}
                            height={2000}
                            className="h-[24vh] md:h-[50vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                          />
                          <div className="relative border border-gray-100 bg-white p-2 md:p-6 text-start">
                            <p className="text-gray-400 text-[12px] md:text-[14px]">
                              ID:{items.item_id}
                            </p>
                            <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900 truncate ...">
                              {items.item_name}
                            </h3>
                            <span className={items.sale_price == 0 ? 'hidden': "text-gray-400 line-through text-[14px] decoration-red-500"}>
                                  {formatCurrency(items.sale_price)}
                            </span>
                            <p className="text-gray-700">
                              {" "}
                              {formatCurrency(items.unit_price)}
                            </p>
                          </div>
                        </button>
                      )
                    )}
                  </div>
                </section>
              ))
          )}
        </div>

        {modelId &&
          data &&
          data.map((item) => {
            if (item.item_id === modelId) {
              return (
                <dialog
                  id={`my_modal_${modelId}`}
                  className="modal !p-0 !m-0"
                  key={item.item_id}
                >
                  <div className="modal-box !p-0 !m-0 !relative !h-[80vh] !bg-gray-100 md:!h-[60vh] xl:!h-[76vh]">
                    <form method="dialog">
                      <button onClick={onCloseModal} className="btn btn-xs text-red-500 btn-circle btn-ghost absolute right-2 top-2 z-[30]">
                        ✕
                      </button>
                    </form>
                    <div className="w-full">
                      {item.image_display_1 === "" &&
                      item.image_display_2 === "" &&
                      item.image_display_3 === "" &&
                      item.image_display_4 === "" &&
                      item.image_display_5 === "" ? (
                        <Image
                          src={item.image_url}
                          alt={item.item_name}
                          width={1760}
                          height={2000}
                          className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                        />
                      ) : (
                        <Swiper
                          pagination={{
                            dynamicBullets: true, // Enable dynamic bullets
                          }}
                          modules={[Pagination]}
                          className="mySwiper"
                        >
                          {item.image_url === "" ? (
                            ""
                          ) : (
                            <SwiperSlide>
                              <Image
                                src={item.image_url}
                                alt={item.item_name}
                                width={1760}
                                height={2000}
                                className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                              />
                            </SwiperSlide>
                          )}
                          {item.image_display_1 === "" ? (
                            ""
                          ) : (
                            <SwiperSlide>
                              <Image
                                src={item.image_display_1}
                                alt={item.item_name}
                                width={1760}
                                height={2000}
                                className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                              />
                            </SwiperSlide>
                          )}
                          {item.image_display_2 === "" ? (
                            ""
                          ) : (
                            <SwiperSlide>
                              <Image
                                src={item.image_display_2}
                                alt={item.item_name}
                                width={1760}
                                height={2000}
                                className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                              />
                            </SwiperSlide>
                          )}
                          {item.image_display_3 === "" ? (
                            ""
                          ) : (
                            <SwiperSlide>
                              <Image
                                src={item.image_display_3}
                                alt={item.item_name}
                                width={1760}
                                height={2000}
                                className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                              />
                            </SwiperSlide>
                          )}
                          {item.image_display_4 === "" ? (
                            ""
                          ) : (
                            <SwiperSlide>
                              <Image
                                src={item.image_display_4}
                                alt={item.item_name}
                                width={1760}
                                height={2000}
                                className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                              />
                            </SwiperSlide>
                          )}
                          {item.image_display_5 === "" ? (
                            ""
                          ) : (
                            <SwiperSlide>
                              <Image
                                src={item.image_display_5}
                                alt={item.item_name}
                                width={1760}
                                height={2000}
                                className="w-full h-[46vh] md:h-[40vh] xl:h-[50vh] object-cover object-center"
                              />
                            </SwiperSlide>
                          )}
                        </Swiper>
                      )}
                    </div>
                    <div className="relative flex flex-col items-start justify-end bg-gray-100 p-4">
                      <strong className="my-2 start-2 top-2 z-10 rounded-md bg-red-500/30 px-1 text-red-500 transition">
                        <span className="sr-only">Wishlist</span>
                        <b className="text-[12px] pb-[2px] sr-only">
                          {t("promotion")}
                        </b>
                      </strong>
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <strong className="text-[22px] font-[600] text-gray-700 uppercase">
                            {formatCurrency(item.unit_price)}
                          </strong>
                          <span className={item.sale_price == 0 ? 'hidden': "text-gray-400 line-through text-[16px] decoration-red-500"}>
                          {" "}
                            {formatCurrency(item.sale_price)}
                        </span>
                        </div>
                        <strong className="text-[16px] text-red-500 uppercase">
                          ID: {item.item_id}
                        </strong><br/>
                        <b className="text-[16px] font-[600] text-gray-700 uppercase">
                          {item.item_name}
                        </b><br/>
                        <p className="text-[14px] text-light text-gray-700 text-balance">
                          {item.description.split("\n").map((line, index) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </p><br/>
                        <form
                          onSubmit={handleSubmit}
                          className="w-full overflow-hidden"
                        >
                          <input
                            type="text"
                            name="proId"
                            value={productId}
                            id="proId"
                            className="hidden"
                            onChange={(e) => setProductId(e.target.value)}
                          />
                          <input
                            type="text"
                            name="proId"
                            value={productName}
                            id="proId"
                            className="hidden"
                            onChange={(e) => setProductName(e.target.value)}
                          />
                          <input
                            type="number"
                            name="proId"
                            value={productPrice}
                            id="proId"
                            className="hidden"
                            onChange={(e) =>
                              setProductPrice(Number(e.target.value))
                            }
                          />
                          <div className="flex flex-col justify-start items-start gap-3 my-3">
                            {item.size === "" ? (
                                ""
                            ) : (
                                <fieldset className="flex flex-wrap items-center gap-3 !uppercase">
                                  <label className="text-black">Size: </label>

                                  {item.size.split(",").map((size, index) => {
                                    const trimmedSize = size.trim();
                                    const sizeId = `Size${trimmedSize.replace(
                                        /\s+/g,
                                        ""
                                    )}`; // Generate unique ID

                                    return (
                                        <label
                                            key={index}
                                            htmlFor={sizeId}
                                            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-2 py-1 text-gray-900 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
                                        >
                                          <input
                                              type="radio"
                                              name="sizeOption"
                                              value={trimmedSize}
                                              id={sizeId}
                                              className="hidden"
                                              checked={selectedSize === trimmedSize} // Controlled by React state
                                              onChange={(e) =>
                                                  setSelectedSize(e.target.value)
                                              } // Update state on change
                                          />
                                          <span className="text-[14px] text-black">
                                      {trimmedSize}
                                    </span>
                                        </label>
                                    );
                                  })}
                                </fieldset>
                            )}
                            {item.color === "" ? (
                                ""
                            ) : (
                                <fieldset className="flex flex-wrap items-center gap-3">
                                  <label className="text-black">Color: </label>

                                  {item.color.split(",").map((color, index) => {
                                    const trimmedColor = color.trim();
                                    const colorId = `Color${trimmedColor.replace(
                                        /\s+/g,
                                        ""
                                    )}`; // Generate unique ID

                                    return (
                                        <label
                                            key={index}
                                            htmlFor={colorId}
                                            className={`block size-5 cursor-pointer rounded-full shadow-sm has-[:checked]:ring-2 
                                        has-[:checked]:ring-${trimmedColor.toLowerCase()} 
                                        has-[:checked]:ring-offset-2`}
                                            style={{
                                              backgroundColor:
                                                  trimmedColor.toLowerCase(),
                                            }}
                                        >
                                          <input
                                              type="radio"
                                              name="colorOption"
                                              value={trimmedColor}
                                              id={colorId}
                                              className="hidden"
                                              checked={selectedColor === trimmedColor} // Controlled by React state
                                              onChange={(e) =>
                                                  setSelectedColor(e.target.value)
                                              } // Update state on change
                                          />
                                          <span className="hidden">
                                      {trimmedColor}
                                    </span>
                                        </label>
                                    );
                                  })}
                                </fieldset>
                            )}
                          </div>
                          <div>
                            <label htmlFor="qty" className="hidden">
                              {" "}
                              Quantity{" "}
                            </label>

                            <div className="flex justify-start items-center w-[15vh] rounded border border-gray-400 mb-3">
                              <button
                                onClick={() =>
                                  setQtyChange((prevState) => (prevState -= 1))
                                }
                                disabled={qtyChange <= 0 ? true : false}
                                type="button"
                                className="size-10 leading-10 text-white transition hover:opacity-75"
                              >
                                <svg
                                  className="mx-auto text-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#000000"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  width="14"
                                  height="14"
                                  strokeWidth="1"
                                >
                                  <path d="M5 12l14 0"></path>
                                </svg>
                              </button>

                              <input
                                type="number"
                                id="qty"
                                name="qty"
                                value={qtyChange}
                                onChange={(e) =>
                                  setQtyChange(Number(e.target.value))
                                }
                                className="h-10 w-16 border-transparent text-black text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                              />

                              <button
                                onClick={() =>
                                  setQtyChange((nextState) => (nextState += 1))
                                }
                                type="button"
                                className="size-10 leading-10 text-white transition hover:opacity-75"
                              >
                                <svg
                                  className="mx-auto text-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  width="14"
                                  height="14"
                                  strokeWidth="1"
                                  strokeLinejoin="round"
                                  strokeLinecap="round"
                                  stroke="#000000"
                                >
                                  <path d="M12 5l0 14"></path>
                                  <path d="M5 12l14 0"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                          {alert ? (
                            <div
                              role="alert"
                              className="rounded border-s-4 border-red-500 bg-red-50 p-2"
                            >
                              <strong className="block text-[12px]  font-medium text-red-800">
                                {" "}
                                Something went wrong{" "}
                              </strong>

                              <p className=" text-[11px] text-red-700">
                                {alert}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className={qtyChange === 0 ? 'hidden':"flex flex-col justify-center pb-4 items-end"}>
                            <button
                                onClick={handleToggle}
                                type="button"
                                className="group relative inline-block text-sm font-medium text-red-600 focus:outline-none focus:ring-none active:text-red-500"
                            >
                              <span className="absolute inset-0 border border-current"></span>
                              <span className="flex items-center gap-3 block border border-current bg-white px-6 py-1 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                  Check out
                                </span>
                            </button>

                            <div   className={`${
                                modalToggle ? 'block' : 'hidden'
                            } p-5 space-y-5 bg-gray-300 w-full absolute bottom-[-15%] left-0 right-0 h-[200%] z-[50] rounded-tr-xl rounded-tl-xl transition-all duration-[300ms] ease-out-in !text-black`} >
                              <button onClick={handleToggle} type="button" className="btn btn-xs text-red-500 btn-circle btn-ghost absolute right-2 top-2 z-[30]">
                                ✕
                              </button>

                              <div className="space-y-2">
                                <span className="text-black">ID: <b className="font-[200] text-success">{productId}</b> </span><br/><hr/>
                                <span className="text-black">Product Name: <b className="font-[200] text-success">{productName}</b> </span><br/><hr/>
                                <span className="text-black">Price: <b className="font-[200] text-success">{formatCurrency(productPrice)}</b> </span><br/><hr/>
                                <span className="text-black">Quantity: <b className="font-[200] text-success">{qtyChange}</b> </span><br className={selectedSize === ''? 'hidden': 'block'}/><hr className={selectedSize === ''? 'hidden': 'block'}/>
                                <span className={selectedSize === '' ? 'hidden':"text-black"}>Size: <b className="font-[200] text-success">{selectedSize}</b> </span><br className={selectedColor === ''? 'hidden': 'block'}/><hr className={selectedColor === ''? 'hidden': 'block'}/>
                                <span className={selectedColor === '' ? 'hidden': "text-black"}>Color: <b className="font-[200] text-success">{selectedColor}</b> </span><br/><hr/>
                                <strong>
                                  <p className="text-success font-bold mt-2">
                                      <span className="font-light text-black">
                                        Total: {" "}
                                      </span>
                                    {formatCurrency(productPrice * qtyChange)}
                                  </p>
                                </strong>
                              </div>

                              <div>
                                <label className="sr-only" htmlFor="name">Name</label>
                                <input
                                    className="w-full rounded-lg outline-none p-3 text-sm"
                                    placeholder="Name"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={customer}
                                    onChange={(e)=>setCustomer(e.target.value)}
                                />
                              </div>

                              <div>
                                <label className="sr-only" htmlFor="phone">Phone</label>
                                <input
                                    className="w-full rounded-lg outline-none p-3 text-sm"
                                    placeholder="Phone Number"
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e)=>setPhone(e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="sr-only" htmlFor="address">Email</label>
                                <textarea
                                    className="text-black w-full rounded-lg outline-none p-3 text-sm"
                                    placeholder="Address"
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={(e)=>setAddress(e.target.value)}
                                ></textarea>
                              </div>

                              <button
                                  type="submit"
                                  disabled={!btnLoading}
                                  className="group relative inline-block text-sm font-medium text-red-600 focus:outline-none focus:ring-none active:text-red-500"
                              >
                                <span className="absolute inset-0 border border-current"></span>
                                {!btnLoading ? (
                                    <span className="flex items-center gap-3 block border border-current bg-white px-6 py-1 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                  <span className="loading loading-spinner"></span>
                                  Loading
                                </span>
                                ) : (
                                    <span className="flex items-center gap-3 block border border-current bg-white px-6 py-1 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                  Order Now
                                </span>
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-center gap-3 pb-3">
                      <Link href="#">
                        <Image
                          src="/assets/images/facebook.png"
                          alt="kh-flag"
                          width="3000"
                          height="2000"
                          className="w-[24px] h-[24px] rounded-[4px]"
                        />
                      </Link>
                      <Link href="#">
                        <Image
                          src="/assets/images/telegram.png"
                          alt="kh-flag"
                          width="3000"
                          height="2000"
                          className="w-[24px] h-[24px] rounded-[4px]"
                        />
                      </Link>
                      <Link href="#">
                        <Image
                          src="/assets/images/googlemap.png"
                          alt="kh-flag"
                          width="3000"
                          height="2000"
                          className="w-[24px] h-[24px] rounded-[4px]"
                        />
                      </Link>
                      <Link href="#" className="flex gap-3 text-black">
                        <Image
                          src="/assets/images/telephone.png"
                          alt="kh-flag"
                          width="3000"
                          height="2000"
                          className="w-[24px] h-[24px] rounded-[4px]"
                        />
                        012 123 123
                      </Link>
                    </div>
                  </div>
                </dialog>
              )
            }
            return null;
          })}
        <footer className="py-[24px]">
          <div className="text-center text-black">
            <h1 className="text-[16px] md:text-[24px]">Powered by</h1>
            <h1 className="text-[24px] md:text-[44px] text-[#eb1c25]">
              168styles
            </h1>
          </div>
        </footer>
      </div>
    </div>
  )
}
