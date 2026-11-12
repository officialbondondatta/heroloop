export interface JobApplication {
  userId: string
  jobId: string
  title: string
  company: string
}

export interface ApplicationResponse {
  acknowledged: boolean
  insertedId: string
}
