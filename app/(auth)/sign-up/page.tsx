"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
} from "@/components/ui/field"
import { authClient } from "@/lib/auth-client";

type SignUpData = { name: string; email: string; password: string }
const inputClassName =
    "h-12 w-full rounded-xl border border-white/10 bg-[#191919] px-4 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-[#8b80ff] focus:ring-2 focus:ring-[#8b80ff]/20"

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [submitted, setSubmitted] = useState<SignUpData | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data: SignUpData = {
            name: String(formData.get("name") ?? "").trim(),
            email: String(formData.get("email") ?? "").trim(),
            password: String(formData.get("password") ?? ""),
        }
        const res = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: "/"
        })
        console.log(res)
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
                    Make your next move.
                </h1>
                <p className="mt-3 text-sm leading-6 text-neutral-400">
                    Join Hireloop and find where you belong.
                </p>

                <form
                    onSubmit={handleSubmit}
                    onChange={() => setSubmitted(null)}
                    className="mt-8"
                >
                    <FieldGroup className="gap-5">
                        <Field className="gap-2">
                            <FieldLabel
                                htmlFor="name"
                                className="block text-sm font-medium text-neutral-200"
                            >
                                Full name
                            </FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                autoComplete="name"
                                placeholder="Your full name"
                                required
                                className={inputClassName}
                            />
                        </Field>
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
                                    autoComplete="new-password"
                                    placeholder="Create a password"
                                    minLength={8}
                                    aria-describedby="password-description"
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
                            <FieldDescription
                                id="password-description"
                                className="text-xs text-neutral-500"
                            >
                                Use at least 8 characters.
                            </FieldDescription>
                        </Field>
                        <Button
                            type="submit"
                            className="h-12 w-full gap-2 rounded-xl bg-[#6352ff] text-sm text-white shadow-[inset_0_2px_4px_0_#ffffff20] hover:bg-[#7465ff]"
                        >
                            Create account
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
                    Already have an account?{" "}
                    <Link
                        href="/sign-in"
                        className="rounded-sm font-medium text-[#a79fff] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b80ff]"
                    >
                        Sign in
                    </Link>
                </p>
            </section>
        </main>
    )
}
