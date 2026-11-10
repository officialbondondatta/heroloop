"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

import logo from "@/app/assets/images/logo.png"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "@/lib/auth-client"


export default function Navbar() {
    const { data: session, isPending } = useSession()
    const user = session?.user
    const links = [
        { label: "Browse Jobs", href: "/jobs" },
        { label: "Company", href: "/company" },
        { label: "Pricing", href: "/pricing" },
        ...(user?.role ? [{ label: "Dashboard", href: `/dashboard/${user?.role}` }] : [])
    ]

    const handleSignOut = async () => {
        await signOut()
    }
    return (
        <header className="px-4 py-5 sm:px-6 lg:px-9 lg:py-7">
            <nav
                aria-label="Main navigation"
                className="mx-auto flex max-w-360 flex-wrap items-center justify-between gap-x-6 rounded-2xl bg-[#222222] px-5 py-3 text-white lg:pr-3 lg:pl-7"
            >
                <Link
                    href="/"
                    aria-label="Hireloop home"
                    className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b80ff]"
                >
                    <Image
                        src={logo}
                        alt="Hireloop"
                        loading="eager"
                        className="h-auto w-35 lg:w-41"
                    />
                </Link>

                {/* shadcn manages menu state, Escape, and focus automatically. */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon-lg"
                                className="text-white hover:bg-white/10 hover:text-white md:hidden"
                            />
                        }
                        aria-label="Open navigation"
                    >
                        <Menu className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-56 border border-white/10 bg-[#222222] p-2 text-white md:hidden"
                    >
                        {links.map(({ label, href }) => (
                            <DropdownMenuItem
                                key={href}
                                render={<Link href={href} />}
                                className="cursor-pointer py-3 focus:bg-white/10 focus:text-white"
                            >
                                {label}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator className="bg-white/15" />
                        {!isPending &&
                            (user ? (
                                <>
                                    <p className="px-2 py-3 text-sm wrap-break-word text-neutral-300">
                                        Welcome, {user.name || "there"}!
                                    </p>
                                    <DropdownMenuItem
                                        onClick={handleSignOut}
                                        className="cursor-pointer py-3 text-[#a79fff] focus:bg-white/10 focus:text-[#a79fff]"
                                    >
                                        Sign Out
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <DropdownMenuItem
                                        render={<Link href="/sign-in" />}
                                        className="cursor-pointer py-3 text-[#a79fff] focus:bg-white/10 focus:text-[#a79fff]"
                                    >
                                        Sign In
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        render={<Link href="/sign-up" />}
                                        className="cursor-pointer bg-[#6352ff] py-3 text-white focus:bg-[#7465ff] focus:text-white"
                                    >
                                        Get Started
                                    </DropdownMenuItem>
                                </>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div
                    id="navbar-links"
                    className="hidden items-center gap-6 md:flex lg:gap-11"
                >
                    {links.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            className="rounded-sm py-2 text-base text-white/95 transition-colors hover:text-[#a79fff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b80ff]"
                        >
                            {label}
                        </Link>
                    ))}

                    <div className="mt-2 flex flex-col gap-2 border-t border-white/15 pt-4 md:mt-0 md:flex-row md:items-center md:gap-6 md:border-t-0 md:border-l md:py-0 md:pl-6 lg:gap-11 lg:pl-11">
                        {!isPending &&
                            (user ? (
                                <>
                                    <p
                                        className="max-w-40 truncate text-sm text-neutral-300"
                                        title={user.name}
                                    >
                                        Welcome, {user.name || "there"}!
                                    </p>
                                    <Button
                                        onClick={handleSignOut}
                                        className="h-12 rounded-xl bg-[#6352ff] px-6 text-base text-white hover:bg-[#7465ff] lg:h-14"
                                    >
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="ghost"
                                        nativeButton={false}
                                        render={<Link href="/sign-in" />}
                                        className="h-11 text-base text-[#8b80ff] hover:bg-white/5 hover:text-[#a79fff] lg:text-lg"
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        nativeButton={false}
                                        render={<Link href="/sign-up" />}
                                        className="h-12 rounded-xl bg-[#6352ff] px-6 text-base text-white shadow-[inset_0_2px_4px_0_#ffffff30] hover:bg-[#7465ff] lg:h-14 lg:text-lg"
                                    >
                                        Get Started
                                    </Button>
                                </>
                            ))}
                    </div>
                </div>
            </nav>
        </header>
    )
}
