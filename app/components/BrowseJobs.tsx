"use client"

import type { FormEvent } from "react"
import { Banknote, Bookmark, Clock3, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import type { JobListing } from "@/types/job"

const jobTypes = ["Full-time", "Contract", "Freelance"]
const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "salary", label: "Highest Salary" },
  { value: "deadline", label: "Closing Soon" },
]

const BrowseJobs = ({ jobs }: { jobs: JobListing[] }) => {
  // UI handlers only: these do not search, filter, sort, or save jobs yet.
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({ search: new FormData(event.currentTarget).get("search") })
  }
  const handleFilter = (jobType: string, checked: boolean) => {
    console.log({ jobType, checked })
  }
  const handleSort = (sort: string) => {
    console.log({ sort })
  }
  const handleSave = (jobId: string) => {
    console.log({ saveJob: jobId })
  }

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-7 text-[#e5e5e7] sm:px-6 lg:px-9">
      <div className="mx-auto max-w-360">
        <h1 className="sr-only">Browse jobs</h1>
        <form
          onSubmit={handleSearch}
          role="search"
          aria-label="Search jobs"
          className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#131316] p-5 sm:flex-row sm:p-7"
        >
          <div className="relative flex-1">
            <label htmlFor="job-search" className="sr-only">
              Search by job title or keywords
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-neutral-400"
            />
            <Input
              id="job-search"
              name="search"
              placeholder="Search by job title, keywords..."
              className="h-14 rounded-xl border-white/10 bg-[#1a1a1e] pl-12 text-white placeholder:text-neutral-400 focus-visible:ring-violet-400/30 sm:h-16 dark:bg-[#1a1a1e]"
            />
          </div>
          <Button
            type="submit"
            className="h-14 rounded-xl bg-white px-7 text-base font-semibold text-neutral-800 hover:bg-neutral-200 sm:h-16"
          >
            Search Jobs
          </Button>
        </form>

        <div className="mt-7 grid items-start gap-7 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-9">
          <aside
            aria-labelledby="filters-heading"
            className="rounded-2xl border border-white/10 bg-[#131316] p-6"
          >
            <h2 id="filters-heading" className="text-2xl font-semibold">
              Filters
            </h2>
            <fieldset className="mt-7">
              <legend className="mb-5 text-lg font-medium">Job Type</legend>
              <div className="space-y-4">
                {jobTypes.map((type) => (
                  <label
                    key={type}
                    className="flex cursor-pointer items-center gap-3 text-sm text-neutral-400"
                  >
                    <input
                      type="checkbox"
                      name="jobType"
                      value={type}
                      onChange={(event) =>
                        handleFilter(type, event.target.checked)
                      }
                      className="size-5 cursor-pointer accent-white"
                    />
                    <span>{type}</span>
                    <span className="ml-auto text-xs text-neutral-500">
                      {jobs.filter((job) => job.employmentType === type).length}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </aside>

          <section aria-labelledby="results-heading" className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2
                id="results-heading"
                className="text-xl font-semibold sm:text-2xl"
              >
                Found {jobs.length.toLocaleString("en-US")} Professional Jobs
              </h2>
              <div className="flex items-center gap-3 text-sm">
                <label htmlFor="sort" className="text-neutral-500">
                  Sort by:
                </label>
                <NativeSelect
                  id="sort"
                  name="sort"
                  defaultValue="recent"
                  onChange={(event) => handleSort(event.target.value)}
                  className="[&>select]:h-10 [&>select]:rounded-lg [&>select]:border-white/10 [&>select]:bg-[#0c0c0e] [&>select]:text-neutral-200"
                >
                  {sortOptions.map((option) => (
                    <NativeSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            </div>

            <div className="space-y-3.5">
              {jobs.map((job) => (
                <article
                  key={job._id}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-[#131316] p-5 sm:gap-6 sm:p-7"
                >
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
                        {job.title}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSave(job._id)}
                        aria-label={`Save ${job.title}`}
                        className="shrink-0 text-neutral-400 hover:bg-white/5 hover:text-white"
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
                        <Banknote aria-hidden="true" className="size-4" />€
                        {job.minSalary} – €{job.maxSalary} / {job.frequency}
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
              ))}
              {jobs.length === 0 && (
                <p className="rounded-2xl border border-white/10 bg-[#131316] p-8 text-center text-neutral-400">
                  No jobs available yet.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default BrowseJobs
