import type {
  JobApplication,
  ApplicationResponse,
  ApplicationListing,
} from "@/types/application"

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export const applyToAJob = async (
  data: JobApplication
): Promise<ApplicationResponse> => {
  const result = await fetch(`${BASEURL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!result.ok) {
    throw new Error(
      result.status === 409
        ? "You have already applied for this job."
        : "Unable to submit your application. Please try again."
    )
  }

  const application: ApplicationResponse = await result.json()
  if (!application.acknowledged || !application.insertedId) {
    throw new Error("Your application was not saved. Please try again.")
  }
  return application
}

export const getApplicationsByUserId = async (
  userId: string
): Promise<ApplicationListing[]> => {
  const query = new URLSearchParams({ userId })
  const result = await fetch(`${BASEURL}/applications?${query}`)
  if (!result.ok) throw new Error("Failed to load applications")
  return result.json()
}
