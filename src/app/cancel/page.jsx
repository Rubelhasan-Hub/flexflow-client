import { ArrowLeft, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function Cancel() {
    return (
        <main className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
            <section className="bg-[#1e293b] border border-slate-700 p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg w-full text-center">
                
                <div className="mx-auto bg-red-500/10 w-20 h-20 flex items-center justify-center rounded-full mb-6">
                    <XCircle className="text-red-500 w-12 h-12" />
                </div>

                <h1 className="text-3xl font-bold text-white mb-4">Payment Canceled</h1>
                
                <p className="text-slate-400 mb-8 leading-relaxed">
                    It looks like you cancelled your payment. No charges were made to your card. 
                    If you changed your mind or faced any issues, feel free to try again.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/classes"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all"
                    >
                        <ArrowLeft size={18} /> Browse Other Classes
                    </Link>
                    
                    <p className="text-slate-500 text-sm">
                        Questions? Email us at <a href="mailto:orders@example.com" className="text-blue-400 hover:underline">orders@example.com</a>
                    </p>
                </div>
            </section>
        </main>
    );
}