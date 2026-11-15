

import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation'



export default async function Success({ searchParams }: { searchParams: { session_id?: string } }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        payment_intent,
        payment_status,
        status,
        customer_email
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete' && payment_status === 'paid') {
        console.log(payment_status, status, customer_email)
        console.log(payment_intent)
        return (
            <section id="success">
                <p>
                    We appreciate your business! A confirmation email will be sent to{' '}
                    {customer_email}. If you have any questions, please email{' '}
                    <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        )
    }
}