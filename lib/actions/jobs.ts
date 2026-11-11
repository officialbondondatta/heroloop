import { JobFormData } from "@/types/job";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"


export const createJob = async (data: JobFormData) => {
    const result = await fetch(`${BASEURL}/jobs`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return result.json()
}

export const getJob = async () => {
    const result = await fetch(`${BASEURL}/jobs`)
    return result.json()
}

export const deleteJob = async (jobid: string) => {
    const result = await fetch(`${BASEURL}/jobs/${jobid}`, {
        method: "DELETE"
    })
    if (!result.ok) {
        throw new Error("Failed to delete job")
    }
    // Deletion only needs a successful status, including 204 with no body.
}