import { Button } from "@heroui/react";
import Image from "next/image";
import { Clock, Calendar, Target, Award, Heart } from "lucide-react"; // Heart icon যোগ করেছি
import { ArrowLeft } from "@gravity-ui/icons";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BookingButton from "@/components/BookingButton";
import FavoriteButton from "./FavoriteButton";
import { authHeader } from "@/lib/session";

const DetailsPage = async ({ params }) => {
    const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const authHeaders = await authHeader();

    const res = await fetch(`${baseUrl}/api/all-classes/${id}`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders
        }
    });
    const data = await res.json();

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;
    if (!user) {
        redirect("/signin");
    }

    return (
        <div className="min-h-screen bg-[#0a0f1d] text-white py-12 px-4 lg:px-20">
            {/* Header Info */}
            <div className="mb-10">
                <div className="flex gap-2 mb-4">
                    <span className="bg-neutral-800 px-3 py-1 rounded text-xs font-bold uppercase">{data.category}</span>
                    <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded text-xs font-bold uppercase">{data.difficulty}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black">{data.className}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="relative w-full h-75 md:h-125 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
                        <Image
                            src={data.classImage}
                            alt={data.className}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Target className="text-green-500" /> About This Class</h2>
                        <p className="text-neutral-400 leading-relaxed text-lg">{data.description}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <DetailCard icon={<Clock size={20} />} title="DURATION" value={`${data.duration} min`} />
                        <DetailCard icon={<Calendar size={20} />} title="SCHEDULE" value={data.scheduleDays?.join(', ')} />
                        <DetailCard icon={<Award size={20} />} title="DIFFICULTY" value={data.difficulty} />
                    </div>
                </div>

                {/* Right Column: Sticky Booking & Favorites */}
                <div className="lg:col-span-1">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl sticky top-24">
                        <div className="text-4xl font-black mb-6">${data.price}<span className="text-sm text-neutral-500 font-normal"> / session</span></div>


                        <BookingButton classData={data} userEmail={user?.email} userName={user?.name || user?.username} />

                        {/* Favorite Button */}
                        <FavoriteButton classData={data} userEmail={user?.email} />

                        <div className="mt-6 border-t border-neutral-800 pt-6">
                            <p className="text-sm text-neutral-400 mb-2">Trainer Email</p>
                            <p className="font-bold break-all">{data.trainerEmail}</p>
                        </div>
                    </div>
                </div>



                <Link href="/classes" className="flex items-center gap-2">
                    <Button className="w-full bg-green-500 text-black font-bold h-12 hover:bg-green-400 mb-3">
                        View All Classes <ArrowLeft size={18} />
                    </Button>
                </Link>
            </div>
        </div >
    );
};



const DetailCard = ({ icon, title, value }) => (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
        <div className="text-green-500 mb-3">{icon}</div>
        <p className="text-[10px] tracking-widest text-neutral-500 font-bold uppercase">{title}</p>
        <p className="text-md font-bold mt-1">{value}</p>
    </div>
);

export default DetailsPage;