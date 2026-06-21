import Link from "next/link";
import { Button } from "@heroui/react";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] px-6">
            <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 p-10 rounded-3xl text-center shadow-2xl">

                {/* Icon Section */}
                <div className="flex justify-center mb-6">
                    <div className="bg-red-500/10 p-4 rounded-full">
                        <ShieldAlert size={48} className="text-red-500" />
                    </div>
                </div>

                {/* Text Section */}
                <h1 className="text-3xl font-black text-white mb-3">Access Denied</h1>
                <p className="text-neutral-400 mb-8 leading-relaxed">
                    It looks like you don ot have permission to access this page. Please make sure you are logged in or contact an administrator.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <Link href="/signin" className="w-full">
                        <Button className="w-full bg-green-600 text-white font-bold h-12 hover:bg-green-700">
                            Go to Login
                        </Button>
                    </Link>

                    <Link href="/" className="w-full">
                        <Button
                            variant="bordered"
                            className="w-full border-neutral-700 text-neutral-300 font-bold h-12 hover:bg-neutral-800 flex items-center gap-2"
                        >
                            <Home size={18} /> Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;