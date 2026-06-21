import { redirect } from 'next/navigation';
import { stripe } from '../../lib/stripe';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)');
    }

  
    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['payment_intent']
    });

    if (session.status === 'open') {
        return redirect('/');
    }


    if (session.status === 'complete') {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings`, {
                method: 'POST',
                cache: 'no-store', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    classId: session.metadata?.classId,
                    userEmail: session.metadata?.userEmail,
                    userName: session.metadata?.userName,
                    transactionId: session.payment_intent?.id,
                    amount: session.amount_total / 100,
                    status: 'confirmed',
                    bookedAt: new Date().toISOString()
                })
            });
        } catch (error) {
            console.error("Database save error:", error);
        }

        return (
            <main className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
                <section className="bg-[#1e293b] border border-slate-700 p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg w-full text-center">
                    
                    <div className="mx-auto bg-green-500/10 w-20 h-20 flex items-center justify-center rounded-full mb-6">
                        <CheckCircle2 className="text-green-500 w-12 h-12" />
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
                    
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Thank you for your business! Your booking has been confirmed. 
                        A confirmation email has been sent to
                        <span className="block text-white font-semibold mt-1">
                            {session.customer_details?.email}
                        </span>
                    </p>

                    <div className="space-y-4">
                        <Link
                            href="/" 
                            className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all"
                        >
                            Go to Home <ArrowRight size={18} />
                        </Link>
                        
                        <p className="text-slate-500 text-sm">
                            Questions? Email us at <a href="mailto:orders@example.com" className="text-blue-400 hover:underline">orders@example.com</a>
                        </p>
                    </div>
                </section>
            </main>
        );
    }
}