"use client";
import { Button, toast} from "@heroui/react";
import { useEffect, useState } from "react";

export default function BookingButton({ classData, userEmail, userName }) {
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (classData?._id && userEmail) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/check-booking?classId=${classData._id}&userEmail=${userEmail}`)
        .then(res => res.json())
        .then(data => {
          setIsBooked(data.isBooked);
          setLoading(false);
        });
    }
  }, [classData, userEmail]);

  const handlePayment = async () => {
    if (isBooked) {
      toast.danger("You have already booked this class!"); // অথবা toast.error ব্যবহার করুন
      return;
    }



    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classData, userEmail, userName }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isBooked || loading}
      className={`w-full font-bold h-12 mb-3 ${isBooked ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 text-black hover:bg-green-400"}`}
    >
      {isBooked ? "Already Booked" : `Book Now — $${classData?.price || "0"}`}
    </Button>
  );
}