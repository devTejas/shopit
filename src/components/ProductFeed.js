import React from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import Product from "./Product";

const ProductFeed = ({ products }) => {
  const items = useSelector(selectItems);

  return (
    // <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100">
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 sm:-mt-32 xs:-mt-20 mx-auto">
      {/* { id, title, description, price, category, image } */}
      {products
        .slice(0, 4)
        .map(({ id, title, description, price, category, image }) => {
          let count = items[id]?.count;
          return (
            <Product
              key={id}
              id={id}
              title={title}
              description={description}
              image={image}
              price={price}
              category={category}
              count={count ? count : 0}
            />
          );
        })}
      <img src="/assets/ad.jpg" className="md:col-span-full mx-auto" />
      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, description, price, category, image }) => {
            let count = items[id]?.count;
            return (
              <Product
                key={id}
                id={id}
                title={title}
                description={description}
                image={image}
                price={price}
                category={category}
                count={count ? count : 0}
              />
            );
          })}
      </div>
      {products
        .slice(5)
        .map(({ id, title, description, price, category, image }) => {
          let count = items[id]?.count;
          return (
            <Product
              key={id}
              id={id}
              title={title}
              description={description}
              image={image}
              price={price}
              category={category}
              count={count ? count : 0}
            />
          );
        })}
    </div>
  );
};

export default ProductFeed;
