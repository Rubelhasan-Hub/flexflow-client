import { getClasses } from "@/lib/api/classes";
import { Card, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import HeaderSection from "./HeaderSection";

const ClassesPage = async ({ searchParams }) => {
    const params = await searchParams;
    const search = params?.search || "";
    const category = params?.category || "";



    


    const classes = await getClasses(search, category);

    return (
        <div className="min-h-screen bg-[#0a0f1d] px-4 py-10">
            <div className="mx-auto max-w-7xl">
                <HeaderSection />

                <SearchBar
                    initialSearch={search}
                    initialCategory={category}
                />

                {classes?.length === 0 ? (
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-10 text-center">
                        <p className="text-neutral-400">
                            No classes found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {classes?.map((item) => (
                            <Card
                                key={item._id}
                                className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-0 transition-all duration-500 hover:border-green-500/50 hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)]"
                            >
                                {/* 1. Image Section */}
                                <div className="relative h-56 w-full bg-neutral-950 overflow-hidden">
                                    {item?.classImage ? (
                                        <Image
                                            src={item.classImage}
                                            alt={item.className || "Class Image"}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm font-semibold text-neutral-600">
                                            NO IMAGE AVAILABLE
                                        </div>
                                    )}
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 z-10 rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-400 backdrop-blur-md">
                                        {item.category}
                                    </div>
                                </div>

                                {/* 2. Content Section */}
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-white transition-colors group-hover:text-green-400">
                                        {item.className}
                                    </h2>
                                    <p className="mt-1 text-sm text-neutral-400">by {item.trainerName || "Expert Trainer"}</p>

                                    {/* Metadata Row */}
                                    <div className="mt-4 flex gap-4 text-[11px] text-neutral-500 font-medium">
                                        <span className="flex items-center gap-1">
                                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                            {item.difficulty || "Beginner"}
                                        </span>
                                        <span>•</span>
                                        <span>{item.duration || "45"} min</span>
                                    </div>

                                    <div className="mt-4 text-sm text-neutral-400 line-clamp-3">
                                        {item.description}
                                    </div>

                                    {/* 3. Footer: Price + Button */}
                                    <div className="mt-6 flex items-center justify-between border-t border-neutral-800 pt-4">
                                        <span className="text-lg font-black text-white">
                                            ${item.price || "20"}<span className="text-[10px] font-normal text-neutral-500">/session</span>
                                        </span>

                                        <Link href={`/classes/${item._id}`} className="block">
                                            <Button className="bg-neutral-800 text-white font-bold hover:bg-green-600 transition-colors">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassesPage;