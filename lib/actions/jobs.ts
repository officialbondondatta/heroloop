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