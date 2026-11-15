const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"


export const checkoutVerify = async (sessionId: string) => {
    const response = await fetch(`${BASE_URL}/payments/checkout-verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId }),
        cache: 'no-store',
    })

    if (!response.ok) {
        throw new Error(`Payment verification failed (${response.status})`)
    }

    return response.json()
}
