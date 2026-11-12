"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSession } from "@/lib/auth-client"
import { getApplicationsByUserId } from "@/lib/actions/appilcations"
import type { ApplicationListing } from "@/types/application"

const tableHeaders = ["Job Title", "Company", "Applied", "Status", "Action"]
const statusStyles: Record<string, string> = {
  applied: "border-white/15 bg-white/10 text-neutral-400",
  review: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  shortlisted: "border-blue-400/30 bg-blue-400/10 text-blue-400",
  interview: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  rejected: "border-red-500/30 bg-red-500/10 text-red-400",
  offered: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
}
const pageSize = 5

const SeekerApplicationsPage = () => {
  const { data: session, isPending } = useSession()
  const userId = session?.user.id
  const [result, setResult] = useState<{
    userId: string
    applications: ApplicationListing[]
    error: string
  } | null>(null)
  const [tab, setTab] = useState("Active")
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!userId) return
    let cancelled = false
    const fetchApplications = async () => {
      try {
        const applications = await getApplicationsByUserId(userId)
        if (!cancelled) setResult({ userId, applications, error: "" })
      } catch {
        if (!cancelled)
          setResult({
            userId,
            applications: [],
            error: "Unable to load your applications. Please try again later.",
          })
      }
    }
    fetchApplications()
    return () => {
      cancelled = true
    }
  }, [userId])

  const applications =
    result?.userId === userId ? (result?.applications ?? []) : []
  const loading = isPending || Boolean(userId && result?.userId !== userId)
  const error = result?.userId === userId ? result?.error : ""
  const filtered = applications.filter(
    (application) => Boolean(application.archived) === (tab === "Archived")
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  const countStatus = (status: string) =>
    applications.filter(
      (application) => application.status?.toLowerCase() === status
    ).length
  const stats = [
    {
      label: "Total Applied",
      value: applications.length,
      color: "text-neutral-100",
    },
    {
      label: "Shortlisted",
      value: countStatus("shortlisted"),
      color: "text-neutral-100",
    },
    {
      label: "Interviews",
      value: countStatus("interview"),
      color: "text-amber-400",
    },
    {
      label: "Success Rate",
      value: `${applications.length ? Math.round((countStatus("offered") / applications.length) * 100) : 0}%`,
      color: "text-emerald-400",
    },
  ]
  const handleTabChange = (value: string) => {
    setTab(value)
    setPage(1)
  }
  // Opens the browser print dialog, which includes Save as PDF.
  const handleExport = () => window.print()

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-7 text-neutral-200 sm:px-8">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-5">
        <div>
          <h1 className="text-2xl font-semibold">My Applications</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Track your job applications and interview progress.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 print:hidden">
          <div className="flex rounded-xl border border-white/10 bg-[#1a1a1e] p-1">
            {["Active", "Archived"].map((value) => (
              <Button
                key={value}
                variant="ghost"
                aria-pressed={tab === value}
                onClick={() => handleTabChange(value)}
                className={`h-9 rounded-lg px-4 hover:bg-white/5 hover:text-white ${tab === value ? "border-white/10 bg-[#202024] text-white" : "text-neutral-400"}`}
              >
                {value}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleExport}
            className="h-11 gap-2 rounded-lg bg-white px-4 text-black hover:bg-neutral-200"
          >
            <Download aria-hidden="true" className="size-4" />
            Export PDF
          </Button>
        </div>
      </header>
      <div className="mb-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-[#131316] px-6 py-5"
          >
            <p className="text-sm text-neutral-400">{stat.label}</p>
            <p className={`mt-3 text-3xl font-semibold ${stat.color}`}>
              {loading || error ? "—" : stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#131316]">
        <Table className="min-w-[700px]">
          <TableHeader className="bg-[#1a1a1e]">
            <TableRow className="border-white/10 hover:bg-transparent">
              {tableHeaders.map((heading) => (
                <TableHead
                  key={heading}
                  className={`h-12 px-6 text-neutral-500 ${heading === "Action" ? "text-right" : ""}`}
                >
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading || error || !userId || !visible.length ? (
              <TableRow className="border-0 hover:bg-transparent">
                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-neutral-400"
                >
                  <span role={error ? "alert" : "status"}>
                    {loading
                      ? "Loading applications…"
                      : error ||
                        (!userId
                          ? "Please sign in to view your applications."
                          : `No ${tab.toLowerCase()} applications yet.`)}
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              visible.map((application) => {
                const status = application.status || "Applied"
                const date = application.appliedAt
                  ? new Date(application.appliedAt)
                  : null
                return (
                  <TableRow
                    key={application._id}
                    className="border-white/10 hover:bg-white/[0.02]"
                  >
                    <TableCell className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#242429]">
                          <BriefcaseBusiness
                            aria-hidden="true"
                            className="size-5"
                          />
                        </span>
                        <div>
                          <p className="font-medium">{application.title}</p>
                          {application.employmentType && (
                            <p className="mt-1 text-xs text-neutral-400">
                              {application.employmentType}
                              {application.isRemote ? " • Remote" : ""}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6">
                      {application.company}
                    </TableCell>
                    <TableCell className="px-6 text-neutral-400">
                      {date && !Number.isNaN(date.getTime())
                        ? date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            timeZone: "UTC",
                          })
                        : "Not provided"}
                    </TableCell>
                    <TableCell className="px-6">
                      <Badge
                        variant="outline"
                        className={`rounded-full px-3 font-normal capitalize ${statusStyles[status.toLowerCase()] || statusStyles.applied}`}
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 text-right">
                      <Link
                        href={`/browse-jobs/${application.jobId}`}
                        className="rounded-sm hover:text-violet-300 focus-visible:outline-2 focus-visible:outline-violet-400"
                      >
                        Details
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-[#1a1a1e] px-6 py-5 text-sm text-neutral-400">
          <p>
            Showing {filtered.length ? (currentPage - 1) * pageSize + 1 : 0}–
            {Math.min(currentPage * pageSize, filtered.length)} of{" "}
            {filtered.length} applications
          </p>
          <nav
            aria-label="Application pages"
            className="flex items-center gap-2 print:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              className="border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft />
            </Button>
            <span
              aria-current="page"
              className="flex size-8 items-center justify-center rounded-lg bg-white text-black"
            >
              {currentPage}
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
              className="border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white"
            >
              <ChevronRight />
            </Button>
          </nav>
        </footer>
      </div>
    </section>
  )
}

export default SeekerApplicationsPage
