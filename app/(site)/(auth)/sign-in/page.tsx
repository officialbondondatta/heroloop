"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

type SignInData = { email: string; password: string }
const inputClassName =
    "h-12 w-full rounded-xl border border-white/10 bg-[#191919] px-4 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-[#8b80ff] focus:ring-2 focus:ring-[#8b80ff]/20"

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [submitted, setSubmitted] = useState<SignInData | null>(null)
    const router = useRouter()
    const params = useSearchParams()
    const redirectTo = params.get("redirectTo") || "/"
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data: SignInData = {
            email: String(formData.get("email") ?? "").trim(),
            password: String(formData.get("password") ?? ""),
        }
        const res = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            callbackURL: redirectTo
        })
        if (res.data?.token) {
            router.push('/')
            alert("Sign in succeessful")
        }
        // Integrate authentication here using data. Credentials stay in memory only.
        setSubmitted(data)
    }

    return (
        <main className="flex min-h-[calc(100svh-140px)] items-center justify-center px-4 py-10 sm:px-6">
            <section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#222222] p-6 shadow-2xl shadow-black/20 sm:p-9">
                <p className="mb-3 text-xs font-medium tracking-[0.18em] text-[#a79fff] uppercase">
                    Your next chapter
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                    Welcome back.
                </h1>
                <p className="mt-3 text-sm leading-6 text-neutral-400">
                    Sign in to take your next step with Hireloop.
                </p>

                <form
                    onSubmit={handleSubmit}
                    onChange={() => setSubmitted(null)}
                    className="mt-8"
                >
                    <FieldGroup className="gap-5">
                        <Field className="gap-2">
                            <FieldLabel
                                htmlFor="email"
                                className="block text-sm font-medium text-neutral-200"
                            >
                                Email address
                            </FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                required
                                className={inputClassName}
                            />
                        </Field>
                        <Field className="gap-2">
                            <FieldLabel
                                htmlFor="password"
                                className="block text-sm font-medium text-neutral-200"
                            >
                                Password
                            </FieldLabel>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"

                                    required
                                    className={`${inputClassName} pr-12`}
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showPassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-neutral-400 hover:text-white focus-visible:outline-2 focus-visible:outline-[#8b80ff]"
                                >
                                    {showPassword ? (
                                        <EyeOff aria-hidden="true" className="size-4" />
                                    ) : (
                                        <Eye aria-hidden="true" className="size-4" />
                                    )}
                                </button>
                            </div>
                        </Field>
                        <Button
                            type="submit"
                            className="h-12 w-full gap-2 rounded-xl bg-[#6352ff] text-sm text-white shadow-[inset_0_2px_4px_0_#ffffff20] hover:bg-[#7465ff]"
                        >
                            Sign in
                            <ArrowRight aria-hidden="true" className="size-4" />
                        </Button>
                        <p role="status" className="text-center text-sm text-[#c4bdff]">
                            {submitted
                                ? "Details collected. No account changes have been made."
                                : ""}
                        </p>
                    </FieldGroup>
                </form>
                <p className="mt-6 text-center text-sm text-neutral-400">
                    New to Hireloop?{" "}
                    <Link
                        href="/sign-up"
                        className="rounded-sm font-medium text-[#a79fff] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b80ff]"
                    >
                        Create an account
                    </Link>
                </p>
            </section>
        </main>
    )
}
