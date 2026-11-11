"use client"

import Link from "next/link"
import { Banknote, Bookmark, Clock3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { JobListing } from "@/types/job"

interface JobCardProps {
  job: JobListing
  onSave: (jobId: string) => void
}

const JobCard = ({ job, onSave }: JobCardProps) => {
  return (
    <article className="relative flex gap-4 rounded-2xl border border-white/10 bg-[#131316] p-5 text-[#e5e5e7] transition-colors hover:border-violet-400/40 sm:gap-6 sm:p-7">
      {/* Company initials stand in for logos until logo URLs are available. */}
      <div
        aria-hidden="true"
        className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#222228] text-sm font-semibold text-violet-200 sm:size-16"
      >
        {job.company.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight sm:text-2xl">
            <Link
              href={`/browse-jobs/${job._id}`}
              className="after:absolute after:inset-0 after:rounded-2xl hover:text-violet-300 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-violet-400"
            >
              {job.title}
            </Link>
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSave(job._id)}
            aria-label={`Save ${job.title}`}
            className="relative z-10 shrink-0 text-neutral-400 hover:bg-white/5 hover:text-white"
          >
            <Bookmark aria-hidden="true" className="size-5" />
          </Button>
        </div>
        <p className="mt-2 text-sm leading-6 text-neutral-500 sm:text-base">
          {job.company} • {job.location}
          {job.isRemote ? " (Remote)" : ""}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 sm:mb-3">
          <Badge
            variant="outline"
            className="gap-2 rounded-lg border-white/10 bg-white/[0.025] px-3 py-1.5 font-normal text-neutral-200"
          >
            <Banknote aria-hidden="true" className="size-4" />€{job.minSalary} –
            €{job.maxSalary} / {job.frequency}
          </Badge>
          <Badge
            variant="outline"
            className="gap-2 rounded-lg border-white/10 bg-white/[0.025] px-3 py-1.5 font-normal text-neutral-200"
          >
            <Clock3 aria-hidden="true" className="size-4" />
            {job.employmentType}
          </Badge>
        </div>
      </div>
    </article>
  )
}

export default JobCard
