"use client"

import { ArrowLeft, CreditCard, Info, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

const inputClass =
  "h-11 rounded-md border-zinc-800 bg-[#1c1c1c] px-3 text-white placeholder:text-zinc-500 dark:bg-[#1c1c1c]"
const labelClass =
  "text-[10px] font-semibold uppercase tracking-wide text-zinc-500"

export default function PaymentPage() {
  return (
    <main className="dark flex min-h-screen flex-col bg-[#09090b] text-zinc-100">
      <div className="mx-auto w-full max-w-5xl flex-1 px-6 pt-8 pb-20 sm:px-10 lg:pb-24">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Go back"
              onClick={() => console.log("Back clicked")}
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
            <h1 className="mb-3 text-[11px] font-semibold tracking-widest text-zinc-400">
              CHOOSE A CURRENCY:
            </h1>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => console.log("BDT currency clicked")}
                className="h-13 justify-start gap-3 rounded-md border-2 border-zinc-100 bg-[#111113] px-3 text-white hover:bg-zinc-800"
              >
                <span aria-hidden="true">🇧🇩</span> BDT 2,553.33
              </Button>
              <Button
                variant="outline"
                onClick={() => console.log("USD currency clicked")}
                className="h-13 justify-start gap-3 rounded-md border-zinc-800 bg-transparent px-3 text-zinc-400 hover:bg-zinc-800"
              >
                <span aria-hidden="true">🇺🇸</span> $20.00
              </Button>
            </div>
            <p className="mt-3 text-[11px] text-zinc-500 italic">
              1 USD = 127.6665 BDT
            </p>
            <div className="mt-7 flex items-start justify-between gap-4 border-t border-zinc-800 pt-7">
              <div>
                <h2 className="text-base font-medium">Hireloop Pro Plan</h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Access to all features
                </p>
              </div>
              <p className="text-base font-medium whitespace-nowrap">
                BDT 2,553.33
              </p>
            </div>
          </section>

          <section aria-label="Payment details">
            <Button
              onClick={() => console.log("Link checkout clicked")}
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
              <div>
                <h2 className="mb-3 text-sm font-medium">
                  Contact information
                </h2>
                <Label htmlFor="email" className="mb-1.5 text-xs text-zinc-400">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <h2 className="mb-3 text-sm font-medium">Payment method</h2>
                <div className="overflow-hidden rounded-md border border-zinc-800">
                  <div className="flex items-center gap-2 border-b border-zinc-800 bg-[#18181b] px-4 py-4 text-xs">
                    <CreditCard className="size-4 text-zinc-400" />
                    Card
                  </div>
                  <div className="space-y-4 p-3.5">
                    <div>
                      <Label
                        htmlFor="card-number"
                        className={`${labelClass} mb-1.5`}
                      >
                        Card information
                      </Label>
                      <div className="relative">
                        <Input
                          id="card-number"
                          inputMode="numeric"
                          placeholder="1234 1234 1234 1234"
                          className={`${inputClass} rounded-b-none pr-20`}
                        />
                        <span
                          className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-1.5"
                          aria-label="Visa and Mastercard"
                        >
                          <span className="rounded bg-blue-950 px-1 text-[8px] font-bold text-blue-200">
                            VISA
                          </span>
                          <span className="flex">
                            <span className="size-3 rounded-full bg-red-500" />
                            <span className="-ml-1 size-3 rounded-full bg-orange-400/90" />
                          </span>
                        </span>
                      </div>
                      <div className="grid grid-cols-2">
                        <Input
                          aria-label="Expiration date"
                          inputMode="numeric"
                          placeholder="MM / YY"
                          className={`${inputClass} rounded-t-none rounded-br-none border-t-0 border-r-0`}
                        />
                        <div className="relative">
                          <Input
                            aria-label="Security code"
                            inputMode="numeric"
                            placeholder="CVC"
                            className={`${inputClass} rounded-t-none rounded-bl-none border-t-0 pr-9`}
                          />
                          <Info className="pointer-events-none absolute top-3.5 right-3 size-4 text-zinc-500" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="cardholder"
                        className={`${labelClass} mb-1.5`}
                      >
                        Cardholder name
                      </Label>
                      <Input
                        id="cardholder"
                        placeholder="Full name on card"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="country"
                        className={`${labelClass} mb-1.5`}
                      >
                        Country or region
                      </Label>
                      <NativeSelect
                        id="country"
                        defaultValue="BD"
                        onChange={() => console.log("Country changed")}
                        className="w-full [&_select]:h-11 [&_select]:rounded-md [&_select]:border-zinc-800 [&_select]:bg-[#1c1c1c]"
                      >
                        <NativeSelectOption value="BD">
                          Bangladesh
                        </NativeSelectOption>
                        <NativeSelectOption value="US">
                          United States
                        </NativeSelectOption>
                        <NativeSelectOption value="GB">
                          United Kingdom
                        </NativeSelectOption>
                      </NativeSelect>
                    </div>
                  </div>
                </div>
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-zinc-800 p-4">
                <input
                  type="checkbox"
                  onChange={() => console.log("Save information clicked")}
                  className="mt-0.5 size-4 accent-blue-600"
                />
                <span>
                  <span className="block text-xs font-medium">
                    Save my information for faster checkout
                  </span>
                  <span className="mt-1.5 block text-[11px] leading-relaxed text-zinc-500">
                    Pay securely on this site and everywhere Link is accepted.
                  </span>
                </span>
              </label>
              <Button
                onClick={() => console.log("Pay clicked")}
                className="h-13 w-full rounded-md bg-[#0874e8] text-base font-semibold text-white shadow-lg shadow-blue-500/10 hover:bg-blue-600"
              >
                Pay
              </Button>
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
            onClick={() => console.log("Terms clicked")}
            className="h-auto p-0 text-[10px] text-zinc-500"
          >
            Terms
          </Button>
          <Button
            variant="link"
            onClick={() => console.log("Privacy clicked")}
            className="h-auto p-0 text-[10px] text-zinc-500"
          >
            Privacy
          </Button>
        </div>
      </footer>
    </main>
  )
}
