import Link from "next/link";
import React from "react";
import { heroBannerData } from "typing";

import { urlFor } from "../lib/sanity.client";
interface Props {
  heroBannerData: heroBannerData[];
}

export default function HeroBanner({ heroBannerData }: Props) {
  const data = heroBannerData[0];
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{data.smallText}</p>
        <h2>{data.midText}</h2>
        <h1>{data.largeText1}</h1>
        <img src={urlFor(data.image).url()} alt="headphones" className="hero-banner-image" />
        <div>
          <Link href={`/product/${data.product}`}>
            <button type="button">{data.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
