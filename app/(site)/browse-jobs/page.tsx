import BrowseJobs from "@/app/components/BrowseJobs"
import { getJob } from "@/lib/actions/jobs"
import type { JobListing } from "@/types/job"

const BrowseJobsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {

    const params = await searchParams
    const query = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
        if (typeof value === "string") query.set(key, value)
        else if (Array.isArray(value)) value.forEach((item) => query.append(key, item))
    }
    const jobs: JobListing[] = await getJob(query.toString())
    return <BrowseJobs jobs={jobs} />
}

export default BrowseJobsPage
