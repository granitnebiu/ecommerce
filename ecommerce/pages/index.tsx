import React from "react";
import { clientSanity } from "../lib/sanity.client";
import { Product, FooterBanner, HeroBanner } from "../components";
import { GetServerSidePropsContext } from "next";

export default function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner heroBannerData={bannerData} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner />
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const query = '*[_type == "product"]';
  const products = await clientSanity.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await clientSanity.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
};
