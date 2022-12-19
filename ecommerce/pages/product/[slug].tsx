import Product from "@/Product";
//using state contexts
import { useMyStateContext } from "context/StateContext";
import { clientSanity, urlFor } from "lib/sanity.client";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ProductsData } from "typing";

interface Props {
  product: ProductsData;
  products: ProductsData[];
}
export default function ProductDetails({ product, products }: Props) {
  const { image, name, details, price } = product;
  const { decreaseQuantity, increaseQuantity, qty, onAdd } = useMyStateContext();

  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image[index]).url()} className="product-detail-image" />
          </div>

          <div className="small-images-container">
            {Object.values(image)?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item).url()}
                className={i === index ? "small-image selected-image" : "small-image"}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQuantity}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick={() => {}}>
                {qty}
              </span>
              <span className="plus" onClick={increaseQuantity}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button className="add-to-cart" onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button className="buy-now" onClick={() => {}}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-product-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getStaticPaths() {
//   const query = `*[_type == "product"] {
//     slug{
//       current
//     }
//   }
//   `;

//   const products = await clientSanity.fetch(query);
//   const paths = products.map((product) => ({
//     params: {
//       slug: product.slug.current,
//     },
//   }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// }

export async function getStaticPaths() {
  const query = `*[_type == "product"] {
    slug{
      current
    }
  }
  `;
  const products = await clientSanity.fetch(query);
  return {
    paths: products.map((getProduct) => ({ params: { slug: getProduct.slug.current } })),
    fallback: "blocking",
  };
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuery = '*[_type == "product"]';

  const product = await clientSanity.fetch(query);
  const products = await clientSanity.fetch(productQuery);

  return {
    props: {
      product,
      products,
    },
  };
};
