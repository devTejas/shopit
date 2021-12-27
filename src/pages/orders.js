import moment from "moment";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import React from "react";
import { db } from "../../firebaseConfig";
import Header from "../components/header";
import OrderItem from "../components/OrderItem";

const Orders = ({ orders }) => {
  const session = useSession();
  return (
    <div
      className={`font-poppins dark:bg-black ${
        orders?.length ? "h-full" : "h-screen"
      }`}
    >
      <Head>
        <title>Shopit | Orders</title>
      </Head>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1
          className={
            "text-3xl border-b mb-2 pb-1 border-yellow-400 dark:text-shopit_orange"
          }
        >
          Your Orders
        </h1>
        {session[0] ? (
          <h2 className="dark:text-white">
            {orders?.length ? orders?.length : 0} orders
          </h2>
        ) : (
          <h2 className="dark:text-white">Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map((orderItem) => (
            <OrderItem key={orderItem.id} {...orderItem} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //   Get the users logged in credentials...
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }

  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  console.log("session - ", session, "orders - ", orders);

  return {
    props: {
      orders,
      session,
    },
  };
}
