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

export interface ApplicationListing extends JobApplication {
  _id: string
  status?: string
  appliedAt?: string
  employmentType?: string
  isRemote?: boolean
  archived?: boolean
}
