

import { stripe } from '@/lib/stripe';
import { checkoutVerify } from '@/lib/actions/payment';
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, Mail, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'



export default async function Success({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        payment_intent,
        payment_status,
        status,
        metadata,
        customer_email
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete' && payment_status === 'paid') {
        const result = await checkoutVerify(session_id)
        console.log(result)
        console.log(payment_status, status, customer_email, metadata, payment_intent)
        return (
            <section id="success" aria-labelledby="success-title" className="flex min-h-[75vh] items-center justify-center px-5 py-16 sm:py-24">
                <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#202020] shadow-2xl shadow-black/20">
                    <div className="h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                    <div className="px-6 py-10 sm:px-10">
                        <div className="mx-auto mb-7 flex size-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 ring-8 ring-emerald-400/5">
                            <Check aria-hidden="true" className="size-9 text-emerald-400" strokeWidth={2.5} />
                        </div>
                        <div className="text-center">
                            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald-400 uppercase">Payment confirmed</p>
                            <h1 id="success-title" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">You’re all set!</h1>
                            <p className="mt-4 text-sm leading-6 text-zinc-400">Thank you for choosing Hireloop. Your payment was completed successfully.</p>
                        </div>

                        <div className="my-8 overflow-hidden rounded-xl border border-white/10 bg-black/15">
                            <div className="flex items-center justify-between gap-4 px-4 py-4 text-sm">
                                <span className="text-zinc-400">Payment status</span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                                    <Check aria-hidden="true" className="size-3.5" /> Paid
                                </span>
                            </div>
                            {customer_email && (
                                <div className="flex items-start gap-3 border-t border-white/10 px-4 py-4">
                                    <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-zinc-500" />
                                    <div className="min-w-0 text-sm">
                                        <p className="text-zinc-400">Confirmation email</p>
                                        <p className="mt-1 break-all text-zinc-200">{customer_email}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Button nativeButton={false} render={<Link href="/browse-jobs" />} className="h-12 w-full rounded-xl bg-[#6352ff] text-sm font-semibold text-white hover:bg-[#7465ff]">
                            Browse jobs <ArrowRight aria-hidden="true" className="ml-1 size-4" />
                        </Button>
                        <Button nativeButton={false} render={<Link href="/" />} variant="ghost" className="mt-2 h-11 w-full rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white">
                            Back to home
                        </Button>
                        <p className="mt-6 text-center text-xs leading-5 text-zinc-500">
                            Need help?{' '}
                            <a href="mailto:orders@example.com" className="text-zinc-300 underline underline-offset-4 hover:text-white">Contact support</a>
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-black/10 px-6 py-4 text-xs text-zinc-500">
                        <ShieldCheck aria-hidden="true" className="size-4" /> Secure payment powered by Stripe
                    </div>
                </div>
            </section>
        )
    }
}
