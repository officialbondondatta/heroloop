export interface JobFormData {
  title: string
  company: string
  category: string
  employmentType: string
  isRemote: boolean
  location: string
  deadline: string
  // Form inputs return strings, including salary amounts and empty values.
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  requirements: string
}

export interface JobListing extends JobFormData {
  _id: string
  applicants: number
  status: "Active" | "Expired"
  postedAt: string
}
