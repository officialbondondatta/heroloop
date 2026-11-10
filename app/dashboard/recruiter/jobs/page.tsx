"use client"

import Link from "next/link"
import {
    ChevronRight,
    Plus,
    Code2,
    Palette,
    Server,
    Megaphone,
    BadgeCheck,
    BarChart3,
    BriefcaseBusiness,
    Globe2,
    MapPin,
    Users,
    Pencil,
    Trash2,
    EllipsisVertical,
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
import { getJob } from "@/lib/actions/jobs";
import { useEffect, useState } from "react";
import { JobListing } from "@/types/job";


const tableHeaders = [
    "Job Title & Dept",
    "Company & Location",
    "Type",
    "Compensation",
    "Applicants",
    "Status",
    "Deadline",
    "Actions",
]

const categoryStyles = {
    Engineering: { icon: Code2, color: "text-[#8b80ff]" },
    Design: { icon: Palette, color: "text-orange-400" },
    Infrastructure: { icon: Server, color: "text-sky-400" },
    Marketing: { icon: Megaphone, color: "text-violet-300" },
    Quality: { icon: BadgeCheck, color: "text-indigo-400" },
    Analytics: { icon: BarChart3, color: "text-teal-400" },
}
const formatDate = (date: string) =>
    new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    })
const formatSalary = (value: string) =>
    Number(value) >= 1000 ? `${Number(value) / 1000}k` : value

const ManageJobsPage = () => {
    const [jobs, setJobs] = useState<JobListing[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    // UI placeholders only; connect these actions when the job API is ready.
    const handleAction = (action: string, jobId: string) => {
        console.log({ action, jobId })
    }
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getJob()
                setJobs(data)
            } catch {
                setError("Failed to load jobs")
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [])
    if (loading) return <p>Loading jobs...</p>
    if (error) return <p>{error}</p>
    return (
        <section className="mx-auto w-full max-w-[1600px] px-4 py-6 text-white sm:px-7">
            <nav
                aria-label="Breadcrumb"
                className="mb-3 flex items-center gap-1 text-xs text-neutral-400"
            >
                <span>Manage Jobs</span>
                <ChevronRight aria-hidden="true" className="size-4" />
                <span aria-current="page" className="text-violet-200">
                    Job Listings &amp; Postings
                </span>
            </nav>
            <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Manage Job Posts
                    </h1>
                    <p className="mt-2 text-sm text-neutral-400">
                        Review live listings, monitor applicants, and update job details
                        across your organization.
                    </p>
                </div>
                <Button
                    nativeButton={false}
                    render={<Link href="/dashboard/recruiter/jobs/new" />}
                    className="h-10 gap-2 rounded-xl bg-[#6352ff] px-4 text-white hover:bg-[#7465ff]"
                >
                    <Plus aria-hidden="true" className="size-4" />
                    New Job Post
                </Button>
            </header>

            {/* The shadcn table scrolls horizontally on smaller screens. */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141414]">
                <Table className="min-w-280 text-xs">
                    <TableHeader className="bg-[#0c0c0d]">
                        <TableRow className="border-white/10 hover:bg-transparent">
                            {tableHeaders.map((heading) => (
                                <TableHead
                                    key={heading}
                                    className={`h-12 px-4 text-[11px] tracking-wider text-neutral-400 uppercase ${heading === "Actions" ? "text-right" : ""}`}
                                >
                                    {heading}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job) => {
                            const category = categoryStyles[
                                job.category as keyof typeof categoryStyles
                            ] ?? { icon: BriefcaseBusiness, color: "text-neutral-400" }
                            const Icon = category.icon
                            const LocationIcon = job.isRemote ? Globe2 : MapPin
                            return (
                                <TableRow
                                    key={job._id}
                                    className="border-white/5 hover:bg-white/2.5"
                                >
                                    <TableCell className="px-4 py-5">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#242428] ${category.color}`}
                                            >
                                                <Icon aria-hidden="true" className="size-5" />
                                            </span>
                                            <div>
                                                <p className="font-medium text-white">{job.title}</p>
                                                <p className={`mt-1 text-[11px] ${category.color}`}>
                                                    {job.category}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4">
                                        <p>{job.company}</p>
                                        <p className="mt-1 flex items-center gap-1 text-neutral-400">
                                            <LocationIcon
                                                aria-hidden="true"
                                                className="size-4 shrink-0"
                                            />
                                            {job.isRemote && job.location !== "Remote"
                                                ? `Remote (${job.location})`
                                                : job.location}
                                        </p>
                                    </TableCell>
                                    <TableCell className="px-4">
                                        <Badge className="rounded-full border-white/5 bg-white/5 px-2.5 py-1 text-[10px] font-normal text-neutral-300">
                                            {job.employmentType}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4">
                                        €{formatSalary(job.minSalary)} – €
                                        {formatSalary(job.maxSalary)} /{" "}
                                        {job.frequency === "hour"
                                            ? "hr"
                                            : job.frequency === "year"
                                                ? "yr"
                                                : "mo"}
                                    </TableCell>
                                    <TableCell className="px-4">
                                        <span className="flex items-center gap-1.5 text-violet-200">
                                            <Users aria-hidden="true" className="size-4" />
                                            {job.applicants} Candidates
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4">
                                        <Badge
                                            className={`gap-1.5 rounded-full border-0 px-2.5 py-1 text-[10px] font-normal ${job.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-white/5 text-neutral-400"}`}
                                        >
                                            <span className="size-1.5 rounded-full bg-current" />
                                            {job.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4">
                                        <p
                                            className={
                                                job.status === "Expired" ? "text-neutral-400" : ""
                                            }
                                        >
                                            {formatDate(job.deadline)}
                                        </p>
                                        <p className="mt-1 text-[10px] text-neutral-500">
                                            {job.status === "Expired"
                                                ? "Closed"
                                                : `Posted ${formatDate(job.postedAt)}`}
                                        </p>
                                    </TableCell>
                                    <TableCell className="px-4">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <Button
                                                size="sm"
                                                onClick={() => handleAction("update", job._id)}
                                                aria-label={`Update ${job.title}`}
                                                className="gap-1 rounded-lg bg-[#6352ff]/20 text-xs text-violet-200 hover:bg-[#6352ff]/30"
                                            >
                                                <Pencil aria-hidden="true" className="size-4" />
                                                Update
                                            </Button>
                                            <Button
                                                size="icon-sm"
                                                onClick={() => handleAction("delete", job._id)}
                                                aria-label={`Delete ${job.title}`}
                                                className="rounded-lg bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                                            >
                                                <Trash2 aria-hidden="true" className="size-4" />
                                            </Button>
                                            <Button
                                                size="icon-sm"
                                                onClick={() => handleAction("more", job._id)}
                                                aria-label={`More actions for ${job.title}`}
                                                className="bg-transparent text-neutral-400 hover:bg-white/10 hover:text-white"
                                            >
                                                <EllipsisVertical
                                                    aria-hidden="true"
                                                    className="size-4"
                                                />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

export default ManageJobsPage
