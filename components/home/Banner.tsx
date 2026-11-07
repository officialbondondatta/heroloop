"use client"

import Image from "next/image"
import { BriefcaseBusiness, MapPin, Search } from "lucide-react"

import globe from "@/app/assets/images/globe.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

export default function Banner() {
  return (
    <section
      aria-labelledby="banner-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#191919_0%,#080808_35%,#000_65%)] px-4 pt-16 text-white sm:pt-24"
    >
      {/* Keep the introduction and search above the decorative globe. */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Static placeholder: replace the job count with live data later. */}
        <div className="mx-auto flex max-w-lg items-center">
          {/* Fading lines frame the eyebrow badge without crossing its text. */}
          <span
            aria-hidden="true"
            className="h-px min-w-4 flex-1 bg-linear-to-r from-transparent to-[#6352ff]/30"
          />
          <p className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-linear-to-b from-white/10 to-transparent px-4 py-2 font-mono text-xs sm:text-sm">
            <BriefcaseBusiness
              aria-hidden="true"
              className="mr-1 size-4 text-orange-400"
            />
            <span className="font-semibold">50,000+</span>
            <span className="text-neutral-400">NEW JOBS THIS MONTH</span>
          </p>
          <span
            aria-hidden="true"
            className="h-px min-w-4 flex-1 bg-linear-to-l from-transparent to-[#6352ff]/30"
          />
        </div>
        <h1
          id="banner-title"
          className="mt-8 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl"
        >
          Find Your Dream Job Today
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-400 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search UI only. Add the job search logic in this submit handler later. */}
        <form
          role="search"
          aria-label="Search jobs"
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-9 max-w-2xl rounded-2xl border border-white/15 bg-[#111111] p-2"
        >
          <FieldGroup className="gap-2 sm:flex-row sm:items-center">
            <Field className="min-w-0 flex-1 gap-0">
              <FieldLabel htmlFor="job-query" className="sr-only">
                Job title, skill or company
              </FieldLabel>
              <div className="relative flex items-center">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-neutral-300"
                />
                <Input
                  id="job-query"
                  name="query"
                  placeholder="Job title, skill or company"
                  className="h-11 border-0 bg-transparent pl-10 text-white placeholder:text-neutral-400 focus-visible:ring-[#8b80ff]/50 dark:bg-transparent"
                />
              </div>
            </Field>
            <span
              aria-hidden="true"
              className="hidden h-5 w-px bg-white/15 sm:block"
            />
            <Field className="min-w-0 flex-1 gap-0">
              <FieldLabel htmlFor="job-location" className="sr-only">
                Location or remote
              </FieldLabel>
              <div className="relative flex items-center">
                <MapPin
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-neutral-300"
                />
                <Input
                  id="job-location"
                  name="location"
                  placeholder="Location or Remote"
                  className="h-11 border-0 bg-transparent pl-10 text-white placeholder:text-neutral-400 focus-visible:ring-[#8b80ff]/50 dark:bg-transparent"
                />
              </div>
            </Field>
            <Button
              type="submit"
              aria-label="Search jobs"
              className="h-11 rounded-xl bg-[#6352ff] text-white hover:bg-[#7465ff] sm:w-11"
            >
              <Search aria-hidden="true" className="size-5" />
              <span className="sm:sr-only">Search jobs</span>
            </Button>
          </FieldGroup>
        </form>

        {/* Presentational tags until trending search functionality is added. */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="mr-1 text-neutral-400">Trending Position</span>
          {trendingPositions.map((position) => (
            <span
              key={position}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-neutral-200"
            >
              {position}
            </span>
          ))}
        </div>
      </div>

      {/* Fade the cropped artwork into the background without a visible image edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative -mt-8 h-72 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_30%)] sm:h-80"
      >
        <Image
          src={globe}
          alt=""
          sizes="1100px"
          className="absolute -top-120 left-1/2 h-auto w-275 max-w-none -translate-x-1/2"
        />
      </div>
    </section>
  )
}
