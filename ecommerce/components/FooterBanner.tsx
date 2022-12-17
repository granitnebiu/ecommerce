import React from "react";
import Link from "next/link";
import { urlFor } from "lib/sanity.client";
import { FooterBannerData } from "typing";

interface Props {
  footerBannerData: FooterBannerData;
}

export default function FooterBanner({
  footerBannerData: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    description,
    product,
    buttonText,
    image,
  },
}: Props) {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <p>{midText}</p>
          <p>{description}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <img className="footer-banner-image" src={urlFor(image).url()} />
        </div>
      </div>
    </div>
  );
}
