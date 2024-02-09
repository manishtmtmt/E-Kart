import Stripe from "stripe";
import { NextResponse, NextRequest, URLPattern } from "next/server";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
console.log(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export async function POST(req) {
  try {
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    console.log(baseUrl, "baseUrl");
    const cartItems = await req.json();
    console.log("cartItems", cartItems);
    console.log(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1OhWDsSDyXQ8u5YLN8lmPKZN" },
        { shipping_rate: "shr_1OhWFqSDyXQ8u5YLnUuu4HES" },
      ],
      line_items: cartItems.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img
          .replace(
            "image-",
            `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/`
          )
          .replace("-webp", ".webp");

        return {
          price_data: {
            currency: "INR",
            product_data: {
              name: item.name,
              images: [newImage],
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
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/?canceled=true`,
    };

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json(session);
  } catch (error) {
    console.log("[CODE_ERROR]", error.message);
    return new NextResponse("Internal error", { status: 500 });
  }
}
