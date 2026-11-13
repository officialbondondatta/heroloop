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

export interface IUser {
  _id?: string,
  id: string,
  createdAt: Date,
  updatedAt: Date,
  email: string,
  emailVerified: boolean,
  name: string,
  image?: string | null | undefined,
  role: "admin" | "recruiter" | "seeker",

}