import React from "react";

/**
amount,
id​,
images,
items,
key,
​timestamp,
*/

const OrderItem = ({ amount, id, images, items, timestamp }) => {
  return (
    <div className="relative border-2 rounded-md border-shopit_orange">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600 rounded-t-md dark:bg-gray-200">
        <div className="">
          <p className="text-xs">ORDER PLACED</p>
          {/* <p className="">{moment.unix(timestamp).format("DD MM YYYY")}</p> */}
        </div>
        <div className="">
          <p className="text-xs font-bold">TOTAL</p>
          <p className="">Rs. {amount}</p>
        </div>
        {/* text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500 */}
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-42 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className="h-20 object-contain sm:h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
