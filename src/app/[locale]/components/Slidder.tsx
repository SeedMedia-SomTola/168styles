import React from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider, KeenSliderInstance, KeenSliderOptions } from "keen-slider/react"
import "./styles/styles.css"

import Image from 'next/image';
import { useState } from 'react';

    const images = [
        "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
        "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
        "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
        "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    ]

export default function Slidder() {
      const [details, setDetails] = useState<KeenSliderInstance["track"]["details"] | null>(null)

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    detailsChanged(s) {
      setDetails(s.track.details)
    },
    initial: 2,
  } as KeenSliderOptions)

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

    return (
    <div ref={sliderRef} className="keen-slider my-3 zoom-out ">
      {images.map((images, idx) => (
        <div key={idx} className="keen-slider__slide zoom-out_slide">
        <div style={scaleStyle(idx)}>
            <Image
            src={images}
            width={430}
            height={430}
            alt={`slider ${idx + 1}`}
            className="rounded-xl w-full h-[200px] md:h-[400px] object-cover"
            />
        </div>
        </div>
      ))}
    </div>
    );
 }