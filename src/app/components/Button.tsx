'use client';

import { useState } from "react";
import Image from "next/image";

export default function Button() {
    const [isKhActive, setIsKhActive] = useState(true);

    const triggerKhClick = () => {
        setIsKhActive((prevState) => !prevState);
    }

    return (
        <div>
            <button
                onClick={triggerKhClick}
                className={isKhActive ? "block" : "hidden"}
            >
                <Image 
                    src="/assets/images/kh-flag.png"
                    alt="kh-flag"
                    width={24}
                    height={24}
                />
            </button>
            <button
                onClick={triggerKhClick}
                className={isKhActive ? "hidden" : "block"}
            >
                <Image 
                    src="/assets/images/usa-flag.png"
                    alt="usa-flag"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    );
}
