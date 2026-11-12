"use client"

import {
  Banknote,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  Clock3,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { JobListing } from "@/types/job"
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const panelClassName = "rounded-xl border border-white/10 bg-[#131316]"

const JobDetails = ({ job }: { job: JobListing }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user
  const handleApply = () => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
    } else {
      console.log({ applyForJob: job._id })
    }
  }
  const handleSave = () => {
    console.log({ saveJob: job._id })
  }

  const details = [
    {
      label: "Salary Range",
      value: `€${job.minSalary} – €${job.maxSalary} / ${job.frequency}`,
      icon: Banknote,
    },
    {
      label: "Location",
      value: `${job.location}${job.isRemote ? " (Remote)" : ""}`,
      icon: MapPin,
    },
    { label: "Job Type", value: job.employmentType, icon: Clock3 },
    { label: "Experience", value: "Not provided", icon: BriefcaseBusiness },
  ]
  const textSections = [
    { title: "Responsibilities", text: job.responsibilities },
    { title: "Requirements", text: job.requirements },
  ]

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-6 text-[#e5e5e7] sm:px-6 lg:px-9">
      <div className="mx-auto max-w-6xl">
        <header
          className={`${panelClassName} flex flex-wrap items-center justify-between gap-6 bg-linear-to-br from-[#131316] to-[#1c1c20] p-6 sm:p-8`}
        >
          <div className="flex min-w-0 items-center gap-5">
            <div
              aria-hidden="true"
              className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0e0e11] text-xl font-semibold text-violet-200 sm:size-20"
            >
              {job.company.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {job.title}
              </h1>
              <p className="mt-3 text-lg font-medium text-neutral-400">
                {job.company}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSave}
              aria-label={`Save ${job.title}`}
              className="size-12 rounded-lg border-white/10 bg-[#222226] text-neutral-300 hover:bg-white/10 hover:text-white"
            >
              <Bookmark aria-hidden="true" className="size-5" />
            </Button>
            <Button
              onClick={handleApply}
              className="h-12 rounded-lg bg-white px-6 text-black hover:bg-neutral-200"
            >
              Apply Now
            </Button>
          </div>
        </header>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <div className="min-w-0 space-y-6">
            <dl className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              {details.map(({ label, value, icon: Icon }) => (
                <div key={label} className={`${panelClassName} p-5`}>
                  <Icon
                    aria-hidden="true"
                    className="mb-2 size-5 text-neutral-300"
                  />
                  <dt className="text-xs text-neutral-400 uppercase">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium break-words">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              className={`${panelClassName} divide-y divide-white/10 px-6 sm:px-8`}
            >
              <section className="py-7">
                <h2 className="text-xl font-semibold">Job Description</h2>
                <p className="mt-5 text-sm leading-6 text-neutral-400">
                  {job.company} is hiring a {job.title} for a{" "}
                  {job.employmentType} position
                  {job.location ? ` in ${job.location}` : ""}.
                  {job.isRemote ? " Remote work is available." : ""} See the
                  responsibilities and requirements below.
                </p>
              </section>
              {textSections.map(({ title, text }) => (
                <section key={title} className="py-7">
                  <h2 className="text-xl font-semibold">{title}</h2>
                  {text?.trim() ? (
                    <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-6 text-neutral-400 marker:text-neutral-200">
                      {text
                        .split("\n")
                        .filter((line) => line.trim())
                        .map((line, index) => (
                          <li key={index} className="pl-2">
                            {line.replace(/^\s*[•*-]\s*/, "")}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="mt-5 text-sm text-neutral-400">
                      Not provided.
                    </p>
                  )}
                </section>
              ))}
              <section className="py-7">
                <h2 className="text-xl font-semibold">Benefits</h2>
                <p className="mt-5 text-sm leading-6 text-neutral-400">
                  Benefits have not been provided for this listing.
                </p>
              </section>
            </div>
          </div>

          <aside
            aria-labelledby="company-heading"
            className={`${panelClassName} p-6`}
          >
            <h2 id="company-heading" className="text-xl font-semibold">
              Company Overview
            </h2>
            {/* A company photo can replace this panel when one is available. */}
            <div className="mt-6 flex aspect-video flex-col items-center justify-center gap-3 rounded-xl bg-[#1b1b21] p-5 text-center">
              <Building2
                aria-hidden="true"
                className="size-10 text-violet-300"
              />
              <p className="text-lg font-medium">{job.company}</p>
            </div>
            <dl className="mt-5 divide-y divide-white/10 text-sm">
              {[
                { label: "Size", value: "Not provided" },
                { label: "Job Category", value: job.category },
                { label: "Location", value: job.location || "Not provided" },
                { label: "Apply By", value: job.deadline || "Not provided" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 py-5"
                >
                  <dt className="shrink-0 text-xs text-neutral-400 uppercase">
                    {label}
                  </dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default JobDetails
