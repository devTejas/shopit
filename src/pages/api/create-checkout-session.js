const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;
  console.log(items, email);

  const transformedItems = [];
  const itemImages = [];

  for (const key in items) {
    if (Object.hasOwnProperty.call(items, key)) {
      const element = items[key];
      let cartItem = {
        description: element.description,
        quantity: element.count,
        price_data: {
          currency: "inr",
          unit_amount: parseInt(element.price * 100),
          product_data: {
            name: element.title,
            images: [element.image],
          },
        },
      };
      transformedItems.push(cartItem); // pushing the item data
      itemImages.push(element.image); // pushing images to itemImages
    }
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // shipping_rates: ['key_from_products_shipping_rates'],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(itemImages.map((image) => image)),
    },
  });

  res.status(200).json({ id: session.id });
};
