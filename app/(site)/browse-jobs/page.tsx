import BrowseJobs from "@/app/components/BrowseJobs"
import { getJob } from "@/lib/actions/jobs"
import type { JobListing } from "@/types/job"

const BrowseJobsPage = async () => {
  const jobs: JobListing[] = await getJob("")
  return <BrowseJobs jobs={jobs} />
}

export default BrowseJobsPage
