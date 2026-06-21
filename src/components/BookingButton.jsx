"use client";
import { Button } from "@heroui/react";

export default function BookingButton({ classData, userEmail , userName}) {
  
  const handlePayment = async () => {

    console.log(classData);
    
    if (!classData) {
      console.error("classData is missing!");
      return;
    }

    try {
      console.log("Sending payment request for:", classData.className);

      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classData, userEmail , userName}),
      });

      const data = await res.json();
      console.log("Response from Stripe:", data);

      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert("Payment Error: " + data.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Something went wrong with the payment request.");
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      className="w-full bg-green-500 text-black font-bold h-12 hover:bg-green-400 mb-3"
    >
      Book Now — ${classData?.price || "0"}
    </Button>
  );
}