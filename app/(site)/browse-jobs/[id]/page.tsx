import { notFound } from "next/navigation"
import JobDetails from "@/app/components/JobDetails"
import { getJob } from "@/lib/actions/jobs"
import type { JobListing } from "@/types/job"

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  // Use the existing list endpoint until a single-job endpoint is available.
  const jobs: JobListing[] = await getJob()
  const job = jobs.find((item) => item._id === id)

  if (!job) notFound()

  return <JobDetails job={job} />
}

export default JobDetailsPage
