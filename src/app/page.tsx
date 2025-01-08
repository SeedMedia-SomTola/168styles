'use client'
// import Image from "next/image";
import Navegation from './components/navegation';
import Slidder from './components/Slidder';
import Image from 'next/image';

const src = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";
export default function Home() {
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <Navegation />
       <Slidder />
        <section id="section_1 " className='py-5'>
          <header className="sticky top-0 my-5 flex justify-center items-center gap-[5px] w-full max-w-screen-md mx-auto"> 
            <hr className="w-full h-[3px] bg-gray-300 rounded-full"/>
            <h1 className="text-black w-[40%] text-center font-bold text-[16px] md:text-[24px]">
              Section 1
            </h1>
            <hr className="w-full h-[3px] bg-gray-300 rounded-full"/>
          </header>
          <div className="grid grid-cols-12 gap-[1vw] items-center justify-center">
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
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white p-6">
                  <p className="text-gray-400 text-[14px]">
                    ID: ANTBD12
                </p>
                <h3 className="text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                  <p className="text-gray-700">
                    $49.99
                    <span className="text-gray-400 line-through ms-2">$80</span>
                  </p>

                  <p className="mt-1.5 line-clamp-3 text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati pariatur.
                    Officiis qui, enim cupiditate aliquam corporis iste.
                  </p>

                  <form className="mt-4 flex gap-4">
                    <button
                      className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </form>
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
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white p-6">
                  <p className="text-gray-400 text-[14px]">
                    ID: ANTBD12
                </p>
                <h3 className="text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                  <p className="text-gray-700">
                    $49.99
                    <span className="text-gray-400 line-through ms-2">$80</span>
                  </p>

                  <p className="mt-1.5 line-clamp-3 text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati pariatur.
                    Officiis qui, enim cupiditate aliquam corporis iste.
                  </p>

                  <form className="mt-4 flex gap-4">
                    <button
                      className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </form>
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
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white p-6">
                  <p className="text-gray-400 text-[14px]">
                    ID: ANTBD12
                </p>
                <h3 className="text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                  <p className="text-gray-700">
                    $49.99
                    <span className="text-gray-400 line-through ms-2">$80</span>
                  </p>

                  <p className="mt-1.5 line-clamp-3 text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati pariatur.
                    Officiis qui, enim cupiditate aliquam corporis iste.
                  </p>

                  <form className="mt-4 flex gap-4">
                    <button
                      className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </form>
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
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white p-6">
                  <p className="text-gray-400 text-[14px]">
                    ID: ANTBD12
                </p>
                <h3 className="text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                  <p className="text-gray-700">
                    $49.99
                    <span className="text-gray-400 line-through ms-2">$80</span>
                  </p>

                  <p className="mt-1.5 line-clamp-3 text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati pariatur.
                    Officiis qui, enim cupiditate aliquam corporis iste.
                  </p>

                  <form className="mt-4 flex gap-4">
                    <button
                      className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </form>
                </div>
              </a>
          </div>
        </section>

         <section id="section_2 " className='py-5'>
          <header className="my-5 flex justify-center items-center gap-[5px] w-full max-w-screen-md mx-auto"> 
            <hr className="w-full h-[3px] bg-gray-300 rounded-full"/>
            <h1 className="text-black w-[40%] text-center font-bold text-[16px] md:text-[24px]">
              Section 1
            </h1>
            <hr className="w-full h-[3px] bg-gray-300 rounded-full"/>
          </header>
          <div className="grid grid-cols-12 gap-[1vw] items-center justify-center">
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
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white p-6">
                  <p className="text-gray-400 text-[14px]">
                    ID: ANTBD12
                </p>
                <h3 className="text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                  <p className="text-gray-700">
                    $49.99
                    <span className="text-gray-400 line-through ms-2">$80</span>
                  </p>

                  <p className="mt-1.5 line-clamp-3 text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati pariatur.
                    Officiis qui, enim cupiditate aliquam corporis iste.
                  </p>

                  <form className="mt-4 flex gap-4">
                    <button
                      className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </form>
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
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white p-6">
                  <p className="text-gray-400 text-[14px]">
                    ID: ANTBD12
                </p>
                <h3 className="text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                  <p className="text-gray-700">
                    $49.99
                    <span className="text-gray-400 line-through ms-2">$80</span>
                  </p>

                  <p className="mt-1.5 line-clamp-3 text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati pariatur.
                    Officiis qui, enim cupiditate aliquam corporis iste.
                  </p>

                  <form className="mt-4 flex gap-4">
                    <button
                      className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </form>
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
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white p-6">
                  <p className="text-gray-400 text-[14px]">
                    ID: ANTBD12
                </p>
                <h3 className="text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                  <p className="text-gray-700">
                    $49.99
                    <span className="text-gray-400 line-through ms-2">$80</span>
                  </p>

                  <p className="mt-1.5 line-clamp-3 text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati pariatur.
                    Officiis qui, enim cupiditate aliquam corporis iste.
                  </p>

                  <form className="mt-4 flex gap-4">
                    <button
                      className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </form>
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
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white p-6">
                  <p className="text-gray-400 text-[14px]">
                    ID: ANTBD12
                </p>
                <h3 className="text-[16px] font-medium text-gray-900">Wireless Headphones</h3>
                  <p className="text-gray-700">
                    $49.99
                    <span className="text-gray-400 line-through ms-2">$80</span>
                  </p>

                  <p className="mt-1.5 line-clamp-3 text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati pariatur.
                    Officiis qui, enim cupiditate aliquam corporis iste.
                  </p>

                  <form className="mt-4 flex gap-4">
                    <button
                      className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </form>
                </div>
              </a>
          </div>
        </section>
    </div>
  );
}
