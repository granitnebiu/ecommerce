import { clientSanity, urlFor } from "lib/sanity.client";
import React from "react";

export default function ProductDetails({ product, products }) {
  const { image, name, details, price } = product;
  return (
    <div>
      <div className="product-details-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image[0]).url()} />
          </div>
        </div>
        {/* <div className="small-images-container">
          {image?.map((item, index) => (
            <img key={index} src={urlFor(item).url()} className="" onMouseEnter={() => {}} />
          ))}
        </div> */}
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
