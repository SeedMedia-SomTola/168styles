'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter} from "@/i18n/routing";
// import {useParams} from "next/navigation";

export default function Button() {
    const [isKhActive, setIsKhActive] = useState(true);
    const router = useRouter();
    // const pathname = usePathname();
    // const params = useParams()
    // Set locale in localStorage
    const setToLocalStorage = (locale:string) => {
        localStorage.setItem("locale", locale);
    };
    // Get locale from localStorage
    const getFromLocalStorage = () => {
        return localStorage.getItem("locale") || "kh"; // Default to "kh"
    };

    // Trigger flag toggle and save locale
    const triggerKhClick = () => {
        const newLocale = isKhActive ? "en" : "kh";
        setIsKhActive(!isKhActive);
        setToLocalStorage(newLocale);
        router.replace(`${newLocale}`);
    };

    // Initialize locale from localStorage
    useEffect(() => {
        const savedLocale = getFromLocalStorage();
        setIsKhActive(savedLocale === "kh");
    }, []);

    return (
        <div>
            <button
                onClick={triggerKhClick}
                className={isKhActive ? "hidden" : "block"}
            >
                <Image
                    src="/assets/images/usa-flag.png"
                    alt="usa-flag"
                    width="2000" height="2000"
                    className="w-[32px] h-full rounded-[4px]"
                />
            </button>
            <button
                onClick={triggerKhClick}
                className={isKhActive ? "block" : "hidden"}
            >
                <Image
                    src="/assets/images/kh-flag.png"
                    alt="kh-flag"
                    width="2000" height="2000"
                    className="w-[32px] h-full rounded-[4px]"
                />
            </button>
        </div>
    );
}
