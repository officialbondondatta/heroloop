import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import logo from "@/app/assets/images/logo.png"

export default function NotFoundPage() {
  return (
    <main className="flex min-h-svh flex-col items-center bg-[#191919] px-6 py-10 text-white">
      <Link
        href="/"
        aria-label="Hireloop home"
        className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b80ff]"
      >
        <Image src={logo} alt="Hireloop" className="h-auto w-38.5" />
      </Link>

      <div className="flex w-full max-w-lg flex-1 flex-col items-center justify-center py-16 text-center">
        <p className="text-[7rem] leading-none font-semibold tracking-tighter text-[#8b80ff] sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Looks like a wrong turn.
        </h1>
        <p className="mt-4 max-w-sm text-base leading-7 text-neutral-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#6352ff] px-6 text-sm font-medium text-white transition-colors hover:bg-[#7465ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b80ff]"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to home
        </Link>
      </div>
    </main>
  )
}
