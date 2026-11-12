import { notFound } from "next/navigation"
import JobDetails from "@/app/components/JobDetails"
import { getJobById } from "@/lib/actions/jobs"
import type { JobListing } from "@/types/job"

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const job: JobListing | null = await getJobById(id)

  if (!job) notFound()

  return <JobDetails job={job} />
}

export default JobDetailsPage
