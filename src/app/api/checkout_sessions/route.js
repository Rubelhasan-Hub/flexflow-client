import { NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';

export async function POST(req) {
  try {
    const { classData, userEmail, userName } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: classData.className,
            description: classData.description,
          },
          unit_amount: classData.price * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata: {
        classId: classData._id,
        userEmail: userEmail,
        userName: userName,
        className: classData.className,
        trainerName: classData.trainerName,
        // অ্যারে যেহেতু মেটাডেটাতে সরাসরি যায় না, তাই JSON হিসেবে পাঠাচ্ছি
        scheduleDays: JSON.stringify(classData.scheduleDays) 
      },
      success_url: `${process.env.BETTER_AUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BETTER_AUTH_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}