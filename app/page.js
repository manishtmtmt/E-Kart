import { client } from "@/sanity/lib/client";
import { FooterBanner, HeroBanner, Product } from "../components";

async function getData() {
  try {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);

    return { products, bannerData };
  } catch (error) {
    console.log("🚀 ~ file: page.js:14 ~ getData ~ error:", error);
  }
}

export default async function Home() {
  const { products, bannerData } = await getData();
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>Different variations of speakers</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
}
