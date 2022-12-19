const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function CreateStripeSession(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      const redirectUrl = "http://localhost:3000";
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1MGfV5JOT9nq2m4zqkoetkdz" },
          { shipping_rate: "shr_1MGlr9JOT9nq2m4zvPL4LRQL" },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace("image-", "https://cdn.sanity.io/images/gsc1oi15/production/")
            .replace("-webp", ".webp");

          console.log(newImage);
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
                //multiply by 100 because the price should be in cents
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        allow_promotion_codes: false,
        success_url: `${redirectUrl}/?success=true`,
        cancel_url: `${redirectUrl}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      // res.redirect(303, session.url);
      // res.json({ id: session.id });
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
