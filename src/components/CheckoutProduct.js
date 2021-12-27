import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const CheckoutProduct = ({
  id,
  title,
  description,
  price,
  category,
  image,
  rating,
  isPrime,
  count,
}) => {
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
    <div className="grid grid-cols-5 pb-2 border-b text-white">
      <Image src={image} width={200} height={200} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <p className="dark:text-shopit_orange">{title}</p>
        <p>{"⭐".repeat(rating)}</p>
        <p className="text-xs my-2 text-gray-500 line-clamp-3">{description}</p>
        <p>
          Rs. {price} (₹) * {count} = {price * count} (₹)
        </p>
        {isPrime && (
          <p className="text-xs text-shopit_orange">🤑FREE Next-day Delivery</p>
        )}
        <div className="flex h-7 text-black justify-end">
          <button
            className="w-7 bg-green-400 font-extrabold mx-4"
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
      </div>
    </div>
  );
};

export default CheckoutProduct;
