'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import {useTranslations} from "next-intl";

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
}

export default function Products({ cate_id }: Category) {
    const [data, setData] = useState<Products[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const t =  useTranslations('Home')
    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading until the data is fetched
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data || data.length === 0) {
        return <div>No categories available</div>; // Handle empty data case here
    }

    return (
        <div className="grid grid-cols-12 items-center justify-center my-2 md:my-5 gap-[2vw] xl:gap-[1vw]">
            {data.map((product) =>
                product.category === cate_id ? (
                    <a
                        key={product.item_id} // Ensure this is unique for each product
                        href="src/app#"
                        className="col-span-6 group relative block overflow-hidden rounded-xl shadow-md"
                    >
                        <button className="absolute start-4 top-3 z-10 rounded-md bg-red-500 px-2 text-white transition">
                            <span className="sr-only">Wishlist</span>
                            <b className="text-[12px] pb-[2px]">{t('promotion')}</b>
                        </button>

                        <Image
                            src={product.image}
                            alt="product 1"
                            width="100"
                            height="100"
                            className="h-[20vh] md:h-[50vh] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                        />

                        <div className="relative border border-gray-100 bg-white p-2 md:p-6">
                            <p className="text-gray-400 text-[12px] md:text-[14px]">
                                ID: {product.item_id}
                            </p>
                            <h3 className="text-[14px] md:text-[16px] font-medium text-gray-900">{product.item_name}</h3>
                            <span className="text-gray-400 line-through text-[14px] decoration-red-500">${product.unit_price}</span>
                            <p className="text-gray-700">${product.unit_price}</p>
                        </div>
                    </a>
                ) : null
            )}
        </div>
    );
}
