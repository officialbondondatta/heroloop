"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import logo from "@/app/assets/images/logo.png"
import { Button } from "@/components/ui/button"

const links = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const toggleRef = useRef<HTMLButtonElement>(null)

    return (
        <header className="px-4 py-5 sm:px-6 lg:px-9 lg:py-7">
            <nav
                aria-label="Main navigation"
                className="mx-auto flex max-w-360 flex-wrap items-center justify-between gap-x-6 rounded-2xl bg-[#222222] px-5 py-3 text-white lg:pr-3 lg:pl-7"
                onKeyDown={(event) => {
                    if (event.key === "Escape" && open) {
                        setOpen(false)
                        toggleRef.current?.focus()
                    }
                }}
            >
                <Link
                    href="/"
                    aria-label="Hireloop home"
                    onClick={() => setOpen(false)}
                    className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b80ff]"
                >
                    <Image src={logo} alt="Hireloop" loading="eager" className="h-auto w-35 lg:w-41" />
                </Link>

                <Button
                    ref={toggleRef}
                    variant="ghost"
                    size="icon-lg"
                    aria-label={open ? "Close navigation" : "Open navigation"}
                    aria-expanded={open}
                    aria-controls="navbar-links"
                    onClick={() => setOpen(!open)}
                    className="text-white hover:bg-white/10 hover:text-white md:hidden"
                >
                    {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </Button>

                <div
                    id="navbar-links"
                    className={`${open ? "flex" : "hidden"} w-full flex-col gap-2 border-t border-white/10 pt-4 pb-2 md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:border-0 md:py-0 lg:gap-11`}
                >
                    {links.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="rounded-sm py-2 text-base text-white/95 transition-colors hover:text-[#a79fff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b80ff]"
                        >
                            {label}
                        </Link>
                    ))}

                    <div className="mt-2 flex flex-col gap-2 border-t border-white/15 pt-4 md:mt-0 md:flex-row md:items-center md:gap-6 md:border-t-0 md:border-l md:py-0 md:pl-6 lg:gap-11 lg:pl-11">
                        <Button
                            variant="ghost"
                            nativeButton={false}
                            render={<Link href="/sign-in" />}
                            onClick={() => setOpen(false)}
                            className="h-11 text-base text-[#8b80ff] hover:bg-white/5 hover:text-[#a79fff] lg:text-lg"
                        >
                            Sign In
                        </Button>
                        <Button
                            nativeButton={false}
                            render={<Link href="/sign-up" />}
                            onClick={() => setOpen(false)}
                            className="h-12 rounded-xl bg-[#6352ff] px-6 text-base text-white shadow-[inset_0_2px_4px_0_#ffffff30] hover:bg-[#7465ff] lg:h-14 lg:text-lg"
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    )
}
