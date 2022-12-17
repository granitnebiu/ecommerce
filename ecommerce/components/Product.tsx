import { urlFor } from "lib/sanity.client";
import Link from "next/link";
import React from "react";
import { ProductsData } from "typing";
interface Props {
  product: ProductsData;
}

export default function Product({ product: { image, name, slug, price } }: Props) {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            className="product-image"
            src={urlFor(image && image[0])
              .width(250)
              .height(250)
              .url()}
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
}
