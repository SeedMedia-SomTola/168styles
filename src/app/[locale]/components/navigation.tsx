'use client';

import Button from "./Button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {useMemo, useState} from "react";

interface NavigationProps {
  activeSection:string;
  category: {
    _RowNumber: number;
    cate_id: string;
    cate_name: string;
    related_items: {
      id: string;
    };
  }[] | null;
  searchParams:(data:string) => void;
}

const logo =
    'https://www.appsheet.com/fsimage.png?appid=4847193e-4ce7-426f-92df-d5fed06513c0&datasource=google&filename=DocId%3D1EkQLqTzlIJlP-fJ7xIw83w8EDdB1Mrya&signature=ad96eb3f66e70c2917227e9c6b9f915e3fd86982be99ad6a2b2956bc9de20306&tableprovider=google&userid=935036077';

export default function Navigation({activeSection, category,searchParams }: NavigationProps) {
  const t = useTranslations('Navigation');
  const [params, setSearchParam] = useState<string>();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    searchParams(query);
    setSearchParam(query);
  }

  const getLinkClass = (section: string) =>
      activeSection === section
          ? "rounded-full border-2 border-[#eb1c25] px-3 py-1 bg-[#eb1c25]/20 text-[#eb1c25] group-hover:bg-[#eb1c25]/20 group-hover:text-[#eb1c25]"
          : "rounded-full border-2 border-[#eb1c25] px-3 py-1 text-[#000000] group-hover:bg-[#eb1c25]/20 group-hover:text-[#eb1c25]";

  const capitalize = (str: string): string =>
      str
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredData = useMemo(() => {
    if (!category) return [];
    return category.filter((cat) =>
        params ? cat.cate_name.toLowerCase().includes(params.toLowerCase()) : true
    );
  }, [category, params]);

  return (
      <nav className="bg-white w-full p-3 z-50 max-w-screen-lg overflow-hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src={logo} width="3000" height="2000" alt="logo" className="w-[32px] h-[32px]"/>
            <h1 className=" font-[700] text-[24px] text-black">168 Styles</h1>
          </div>
          <Button />
        </div>

        <div>
          <ul className="flex space-x-2 overflow-x-auto py-4">
            {/* Add null check to prevent accessing data if it's still null */}
            {filteredData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <h2 className="text-[12px] font-semibold text-gray-700">Search not found!</h2>
                    </div>
                )  :
                (
                    filteredData.map((section,idx) => (
                        <li key={section.cate_id} className="cursor-pointer whitespace-nowrap rounded-lg">
                          <button
                              onClick={() => scrollToSection(`section_${idx}`)}
                              className="transition-all group"
                          >
                            <div className={getLinkClass(`section_${idx}`)}>
                                <span className="text-[18px] text-center font-semibold decoration-[#fcd28a] decoration-[3px] underline-offset-4">
                                  {capitalize(section.cate_name)}
                                </span>
                            </div>
                          </button>
                        </li>
                    ))
                )
            }
          </ul>
        </div>

        <div className="pb-3">
          <div className="grid w-full items-center gap-1.5">
            <div className="relative">
              <input
                  className="flex w-full border border-gray-400 border-input text-sm text-black shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 rounded-full h-9 px-3 py-1 bg-white"
                  placeholder={t('search')}
                  type="text"
                  name="input"
                  onChange={handleSearchChange}
              />
              <div className="absolute bottom-0 right-0 mr-3 flex h-9 w-9 items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9ca3af"
                    className="h-5 w-5 text-primary"
                >
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                  <path d="M21 21l-6 -6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>
  );
}
