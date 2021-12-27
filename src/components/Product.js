import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const Product = (props) => {
  const { id, title, description, price, category, image, count } = props;
  let random = Math.random();
  const [isPrime] = useState(random < 0.5);
  const [rating] = useState(Math.round(random * 4) + 1);

  const dispatch = useDispatch();

  const addItemToBasket = (value = 1) => {
    const product = {
      id,
      title,
      description,
      price,
      category,
      image,
      rating,
      isPrime,
      count: value,
    };

    // value will be the current count of prod -> if value=1 ie. it has been added to cart if value>1 that means more than 1 quantity of prod is added to cart

    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 z=30 p-10 text-sm text-gray-600 bg-white rounded-lg border-4 dark:bg-black border-shopit_orange text-white">
      <p className="absolute text-xs top-2 right-2">{category}</p>
      <Image
        className="rounded-md"
        loading="lazy"
        src={image}
        alt={title}
        width={100}
        height={170}
        objectFit="contain"
      />
      <p className="font-bold text-black overflow-ellipsis line-clamp-1 dark:text-shopit_orange">
        {title}
      </p>
      <p>{"⭐".repeat(rating)}</p>
      <p className="text-xs my-2 text-gray-500 line-clamp-2">{description}</p>
      <p className="mb-5">Rs.{price} (₹)</p>
      {isPrime && (
        <p className="text-xs space-x-2 -mt-5 mb-2 font-bold text-black dark:text-shopit_orange">
          🤑Prime<span className="text-gray-500"> - Free Delivery</span>
        </p>
      )}
      {!count ? (
        <button
          className="mt-auto button font-bold dark:text-black"
          onClick={() => addItemToBasket()}
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex h-7 text-black justify-end">
          <button
            className="w-7 bg-green-400  font-extrabold mx-4"
            onClick={() => addItemToBasket(count + 1)}
          >
            +
          </button>
          <input
            className="w-12 border-2 border-black text-center"
            type="number"
            min={1}
            value={count}
            onChange={(e) => addItemToBasket(e.target.value)}
          />
          <button
            className="w-7 bg-red-500 font-extrabold mx-4"
            onClick={() => addItemToBasket(count - 1)}
          >
            -
          </button>
          <button className="" onClick={() => addItemToBasket(0)}>
            <Image
              src="/assets/RemoveFromCart.jpg"
              width={25}
              height={25}
              objectFit="contain"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
