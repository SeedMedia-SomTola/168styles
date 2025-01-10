'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

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

interface Category {
    cate_id: string;
    sendIdToParent: (data: string) => void;
    searchParams?: string;
}

export default function Products({ cate_id, sendIdToParent, searchParams }: Category) {
    const [data, setData] = useState<Products[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const t = useTranslations('Home');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
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
                setIsLoading(false); // Stop initial loading
            }
        };
        fetchData();
    }, []);

    const showModal = (id: string): void => {
        const elementId = `my_modal_${id}`;
        sendIdToParent(id);

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

    if (isLoading) {
        return <div className="text-center text-gray-500">
            <span className="loading loading-spinner text-error"></span>
        </div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!data || data.length === 0) {
        return <div className="text-gray-500">No categories available</div>;
    }

    const filteredData = data.filter((product) => {
        const matchesCategory = product.category === cate_id;
        const matchesSearch = searchParams
            ? product.item_name.toLowerCase().includes(searchParams.toLowerCase())
            : true;

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="grid grid-cols-12 items-center justify-center my-2 md:my-5 gap-[2vw] xl:gap-[1vw]">
            {filteredData.length === 0 ? (
                <h1 className="text-black">Search Not Found</h1>
            ) : (
                filteredData.map((product) => (
                    <button
                        onClick={() => showModal(product.item_id)}
                        key={product.item_id}
                        className="col-span-6 group relative block overflow-hidden rounded-lg md:rounded-xl shadow-md"
                    >
                        <strong className="absolute start-2 top-2 z-10 rounded-md bg-red-500 px-1 text-white transition">
                            <span className="sr-only">Wishlist</span>
                            <b className="text-[12px] pb-[2px]">{t('promotion')}</b>
                        </strong>

                        <Image
                            src={product.image}
                            alt={product.item_name}
                            width={1760}
                            height={2000}
                            className="h-[20vh] md:h-[50vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                        />

                        <div className="relative border border-gray-100 bg-white p-2 md:p-6 text-start">
                            <p className="text-gray-400 text-[12px] md:text-[14px]">
                                ID: {product.item_id}
                            </p>
                            <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900 truncate ...">
                                {product.item_name}
                            </h3>
                            <span className="text-gray-400 line-through text-[14px] decoration-red-500">
                                ${product.unit_price}
                            </span>
                            <p className="text-gray-700">${product.unit_price}</p>
                        </div>
                    </button>
                ))
            )}
        </div>
    );
}
