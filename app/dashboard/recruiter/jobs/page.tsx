import { redirect } from "next/navigation"
import ManageJobs from "@/app/components/ManageJobs"
import { getAllJobsByID } from "@/lib/actions/jobs"
import { getSession } from "@/lib/server"
import type { JobListing } from "@/types/job"

export default async function ManageJobsPage() {
    const session = await getSession()

    if (!session?.user?.id) {
        redirect("/sign-in")
    }

    let jobs: JobListing[]
    try {
        jobs = await getAllJobsByID(session.user.id)

    } catch {
        return <p>Failed to fetch jobs. Please try again later.</p>
    }

    return <ManageJobs key={session.user.id} initialJobs={jobs} />
}
