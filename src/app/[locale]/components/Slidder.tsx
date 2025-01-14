import React, {useEffect} from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider, KeenSliderInstance, KeenSliderOptions } from "keen-slider/react"
import "./styles/styles.css"

import Image from 'next/image';
import { useState } from 'react';

interface Business {
    name:string;
    image_url:string;
}

export default function Slidder() {
        const [details, setDetails] = useState<KeenSliderInstance["track"]["details"] | null>(null)
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Business[] | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/data?tableName=business");
                if (!res.ok) {
                    throw new Error("Failed to fetch data from AppSheet");
                }

                const result: Business[] = await res.json();
                setData(result);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

  const [sliderRef,sliderInstance] = useKeenSlider<HTMLDivElement>({
    loop: true, initial: 2,
    detailsChanged(s) {
      setDetails(s.track.details)
    },
  } as KeenSliderOptions)

    useEffect(() => {
        const interval = setInterval(() => {
            sliderInstance.current?.next(); // Automatically navigate to the next slide
        }, 5000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [sliderInstance]);

  const scaleStyle = (idx: number) => {
    if (!details) return {}
    const slide = details.slides[idx]
    const scaleSize = 0.7
    const scale = 1 - (scaleSize - scaleSize * slide.portion)
    return {
      transform: `scale(${scale})`,
      WebkitTransform: `scale(${scale})`,
    }
  }
    if (isLoading) {
        return <div className="flex flex-col justify-center items-center overflow-hidden fixed inset-0 text-center text-gray-500 z-[50]">
            <span className="loading loading-spinner text-error"></span>
        </div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
    <div ref={sliderRef} className="keen-slider my-3 zoom-out ">
      {data && data.map((images, idx) => (
        <div key={idx} className="keen-slider__slide zoom-out_slide">
        <div style={scaleStyle(idx)}>
            <Image
            src={images.image_url}
            width={1760} height={2000}
            alt={images.name}
            className="rounded-xl w-full h-[200px] md:h-[400px] object-cover"
            />
        </div>
        </div>
      ))}
    </div>
    );
 }