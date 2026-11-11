"use client"

import { Banknote, Bookmark, Clock3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/shared/SearchBar"
import { Badge } from "@/components/ui/badge"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { jobTypes, type JobListing } from "@/types/job"
import { useRouter } from "next/navigation";


const categoryOptions = [
  { value: "Analytics", label: "Analytics" },
  { value: "Design", label: "Design & Creative" },
  { value: "Marketing", label: "Marketing & Sales" },
  { value: "Quality", label: "Quality" },
  { value: "Operations", label: "Operations" },
  { value: "Engineering", label: "Engineering" }
]
const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "salary", label: "Highest Salary" },
  { value: "deadline", label: "Closing Soon" },
]

const BrowseJobs = ({ jobs }: { jobs: JobListing[] }) => {
  const router = useRouter()
  const handleSearch = (query: string) => {
    const params = new URLSearchParams()
    params.set('search', query as string)
    router.push(`/browse-jobs?${params.toString()}`)
  }


  const handleFilter = (filter: "employmentType" | "category", value: string) => {
    const params = new URLSearchParams()

    if (value) {
      params.set(filter, value)
    } else {
      params.delete(filter)
    }

    router.push(`/browse-jobs?${params.toString()}`)
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
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by job title, keywords..."
          buttonText="Search Jobs"
          label="Search by job title or keywords"
        />

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
                <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-400">
                  <input
                    type="radio"
                    name="employmentType"
                    value=""
                    defaultChecked
                    onChange={() => handleFilter("employmentType", "")}
                    className="size-5 cursor-pointer accent-[#6352ff]"
                  />
                  <span>All types</span>
                </label>
                {jobTypes.map((type) => (
                  <label
                    key={type}
                    className="flex cursor-pointer items-center gap-3 text-sm text-neutral-400"
                  >
                    <input
                      type="radio"
                      name="employmentType"
                      value={type}
                      onChange={() => handleFilter("employmentType", type)}
                      className="size-5 cursor-pointer accent-[#6352ff]"
                    />
                    <span>{type}</span>
                    <span className="ml-auto text-xs text-neutral-500">
                      {jobs.filter((job) => job.employmentType === type).length}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-7 border-t border-white/10 pt-6">
              <legend className="pt-6 text-lg font-medium">Job Category</legend>
              <div className="mt-5 space-y-4">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-400">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    defaultChecked
                    onChange={() => handleFilter("category", "")}
                    className="size-5 cursor-pointer accent-[#6352ff]"
                  />
                  <span>All categories</span>
                </label>
                {categoryOptions.map((category) => (
                  <label
                    key={category.value}
                    className="flex cursor-pointer items-center gap-3 text-sm text-neutral-400"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      onChange={() => handleFilter("category", category.value)}
                      className="size-5 cursor-pointer accent-[#6352ff]"
                    />
                    <span>{category.label}</span>
                    <span className="ml-auto text-xs text-neutral-500">
                      {
                        jobs.filter((job) => job.category === category.value)
                          .length
                      }
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
