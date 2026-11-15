import { ArrowLeft, Info, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"

export const PaymentPage = async ({ searchParams }: { searchParams: Promise<{ canceled?: string }> }) => {
    const { canceled } = await searchParams
    if (canceled) {
        console.log(
            'Order canceled -- continue to shop around and check out when you\'re ready.'
        )
    }
    return (
        <main className="dark flex min-h-screen flex-col bg-[#09090b] text-zinc-100">
            <div className="mx-auto w-full max-w-5xl flex-1 px-6 pt-8 pb-20 sm:px-10 lg:pb-24">
                <header className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Go back"
                            className="text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        >
                            <ArrowLeft className="size-5" />
                        </Button>
                        <span className="rounded bg-zinc-800 p-1.5">
                            <LockKeyhole className="size-4" />
                        </span>
                    </div>
                    <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-bold tracking-wider">
                        SANDBOX
                    </span>
                </header>

                <div className="grid gap-10 md:grid-cols-2 md:gap-14">
                    <section aria-label="Order summary">
                        <h1 className="mb-6 text-[11px] font-semibold tracking-widest text-zinc-400">
                            ORDER SUMMARY
                        </h1>
                        <div className="flex items-start justify-between gap-4 border-t border-zinc-800 pt-7">
                            <div>
                                <h2 className="text-base font-medium">Hireloop Pro Plan</h2>
                                <p className="mt-1 text-xs text-zinc-400">
                                    Access to all features
                                </p>
                            </div>
                            <p className="text-base font-medium whitespace-nowrap">
                                $20.00 USD
                            </p>
                        </div>
                    </section>

                    <section aria-label="Payment details">
                        <Button
                            className="h-11 w-full rounded-md bg-[#00d66f] text-black hover:bg-[#00c565]"
                        >
                            <Info className="size-4 fill-black text-[#00d66f]" />
                            <span className="text-lg font-bold">link</span>
                            <span className="mx-3 h-4 border-l border-black/25" />
                            <span className="rounded bg-blue-700 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                VISA
                            </span>
                            <span className="ml-1 text-xs">4242</span>
                        </Button>
                        <div className="my-7 flex items-center gap-4 text-[10px] font-semibold tracking-widest text-zinc-500">
                            <div className="h-px flex-1 bg-zinc-800" />
                            OR
                            <div className="h-px flex-1 bg-zinc-800" />
                        </div>

                        <div className="space-y-6">
                            <form action="/api/checkout_sessions" method="POST">
                                <section>
                                    <Button
                                        type="submit"
                                        role="link"
                                        className="h-13 w-full rounded-md bg-[#0874e8] text-base font-semibold text-white shadow-lg shadow-blue-500/10 hover:bg-blue-600"
                                    >
                                        Pay
                                    </Button>
                                </section>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
            <footer className="border-t border-zinc-800 px-6 py-10 text-center text-[11px] text-zinc-500">
                <p>
                    Powered by <span className="font-semibold">Stripe</span>
                </p>
                <div className="mt-3 flex justify-center gap-5">
                    <Button
                        variant="link"
                        className="h-auto p-0 text-[10px] text-zinc-500"
                    >
                        Terms
                    </Button>
                    <Button
                        variant="link"
                        className="h-auto p-0 text-[10px] text-zinc-500"
                    >
                        Privacy
                    </Button>
                </div>
            </footer>
        </main>
    )
}

export default PaymentPage
