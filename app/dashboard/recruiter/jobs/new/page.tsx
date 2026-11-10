"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import {
    ArrowRight,
    Building2,
    ChevronRight,
    Euro,
    Globe2,
    MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldLegend,
} from "@/components/ui/field"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import type { JobFormData } from "@/types/job"
import { createJob } from "@/lib/actions/jobs";

const categoryOptions = [
    { value: "engineering", label: "Engineering & Tech" },
    { value: "design", label: "Design & Creative" },
    { value: "marketing", label: "Marketing & Sales" },
    { value: "operations", label: "Business & Operations" },
    { value: "other", label: "Other" },
]

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

const frequencyOptions = [
    { value: "hour", label: "per hour" },
    { value: "month", label: "per month" },
    { value: "year", label: "per year" },
]

const inputClassName =
    "h-12 rounded-xl border-transparent bg-[#202023] px-4 text-white placeholder:text-neutral-500 focus-visible:border-[#8b80ff] focus-visible:ring-[#8b80ff]/20 dark:bg-[#202023]"
const selectClassName =
    "w-full [&>select]:h-12 [&>select]:rounded-xl [&>select]:border-transparent [&>select]:bg-[#202023] [&>select]:px-4 [&>select]:pr-9 [&>select]:text-white [&>select]:focus-visible:ring-[#8b80ff]/20"
const sectionClassName = "rounded-2xl bg-[#141414] p-5 sm:p-7"
const headingClassName =
    "mb-6 flex items-center gap-2 text-lg font-medium before:size-2 before:rounded-full before:bg-[#6352ff]"

const AddNewJobPage = () => {
    const [isRemote, setIsRemote] = useState(false)

    // Collect values only; the Publish button does not send or save anything yet.
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data: JobFormData = {
            title: String(formData.get("title") ?? ""),
            company: String(formData.get("company") ?? ""),
            category: String(formData.get("category") ?? ""),
            employmentType: String(formData.get("employmentType") ?? ""),
            isRemote,
            location: String(formData.get("location") ?? ""),
            deadline: String(formData.get("deadline") ?? ""),
            minSalary: String(formData.get("minSalary") ?? ""),
            maxSalary: String(formData.get("maxSalary") ?? ""),
            frequency: String(formData.get("frequency") ?? ""),
            responsibilities: String(formData.get("responsibilities") ?? ""),
            requirements: String(formData.get("requirements") ?? ""),
        }
        const result = await createJob(data)
        console.log(result)
    }

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-6 text-white sm:px-7">
            <header className="mb-7 flex flex-wrap items-center justify-between gap-5 border-b border-white/5 pb-7">
                <div>
                    <nav
                        aria-label="Breadcrumb"
                        className="mb-2 flex items-center gap-1 text-xs text-neutral-400"
                    >
                        <Link href="/dashboard/recruiter/jobs" className="hover:text-white">
                            Manage Jobs
                        </Link>
                        <ChevronRight aria-hidden="true" className="size-4" />
                        <span aria-current="page" className="text-[#c4bdff]">
                            Create New Listing
                        </span>
                    </nav>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        Post a New Job
                    </h1>
                    <p className="mt-2 text-sm text-neutral-400">
                        Fill in the position specifications to attract qualified talent
                        across our network.
                    </p>
                </div>
                <Button
                    type="submit"
                    form="new-job-form"
                    className="h-12 gap-2 rounded-xl bg-[#6352ff] px-6 text-white shadow-lg shadow-[#6352ff]/20 hover:bg-[#7465ff]"
                >
                    Publish Job <ArrowRight aria-hidden="true" className="size-5" />
                </Button>
            </header>

            <form id="new-job-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Basic job details and a native radio group styled as selectable boxes. */}
                <section aria-labelledby="basic-heading" className={sectionClassName}>
                    <h2 id="basic-heading" className={headingClassName}>
                        1. Basic Information
                    </h2>
                    <FieldGroup className="gap-5">
                        <Field className="gap-1.5">
                            <FieldLabel htmlFor="title">
                                Job Title <span className="text-[#8b80ff]">*</span>
                            </FieldLabel>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Frontend Developer"
                                required
                                className={inputClassName}
                            />
                        </Field>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field className="gap-1.5">
                                <FieldLabel htmlFor="company">
                                    Company Name <span className="text-[#8b80ff]">*</span>
                                </FieldLabel>
                                <div className="relative">
                                    <Building2
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-3.5 left-4 size-5 text-neutral-400"
                                    />
                                    <Input
                                        id="company"
                                        name="company"
                                        placeholder="Your company name"
                                        required
                                        className={`${inputClassName} pl-11`}
                                    />
                                </div>
                            </Field>
                            <Field className="gap-1.5">
                                <FieldLabel htmlFor="category">
                                    Job Category <span className="text-[#8b80ff]">*</span>
                                </FieldLabel>
                                <NativeSelect
                                    id="category"
                                    name="category"
                                    defaultValue="engineering"
                                    required
                                    className={selectClassName}
                                >
                                    {categoryOptions.map((option) => (
                                        <NativeSelectOption key={option.value} value={option.value}>
                                            {option.label}
                                        </NativeSelectOption>
                                    ))}
                                </NativeSelect>
                            </Field>
                        </div>
                        <FieldSet className="gap-1.5">
                            <FieldLegend className="mb-0 text-sm">
                                Job Type <span className="text-[#8b80ff]">*</span>
                            </FieldLegend>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                {jobTypes.map((type) => (
                                    <label
                                        key={type}
                                        className="flex h-12 cursor-pointer items-center justify-center rounded-xl border border-transparent bg-[#202023] text-sm text-neutral-400 has-[:checked]:border-[#6352ff] has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#8b80ff]"
                                    >
                                        <input
                                            type="radio"
                                            name="employmentType"
                                            value={type}
                                            defaultChecked={type === "Full-time"}
                                            required
                                            className="sr-only"
                                        />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </FieldSet>
                    </FieldGroup>
                </section>

                <section
                    aria-labelledby="location-heading"
                    className={sectionClassName}
                >
                    <h2 id="location-heading" className={headingClassName}>
                        2. Location, Compensation &amp; Timeline
                    </h2>
                    <FieldGroup className="gap-5">
                        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#202023] p-4">
                            <Globe2
                                aria-hidden="true"
                                className="size-6 shrink-0 text-[#c4bdff]"
                            />
                            <div className="flex-1">
                                <FieldLabel htmlFor="isRemote">Remote Work Allowed</FieldLabel>
                                <p
                                    id="remote-description"
                                    className="mt-1 text-sm text-neutral-400"
                                >
                                    Enable worldwide or distributed candidate applications
                                </p>
                            </div>
                            <Switch
                                id="isRemote"
                                name="isRemote"
                                checked={isRemote}
                                onCheckedChange={setIsRemote}
                                aria-describedby="remote-description"
                                className="shrink-0 data-checked:bg-[#6352ff]"
                            />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field className="gap-1.5">
                                <FieldLabel htmlFor="location" className="flex justify-between">
                                    Job Location{" "}
                                    <span className="text-xs font-normal text-neutral-500">
                                        {isRemote ? "Optional" : "Required"}
                                    </span>
                                </FieldLabel>
                                <div className="relative">
                                    <MapPin
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-3.5 left-4 size-5 text-neutral-400"
                                    />
                                    <Input
                                        id="location"
                                        name="location"
                                        placeholder="New York, USA"
                                        required={!isRemote}
                                        className={`${inputClassName} pl-11`}
                                    />
                                </div>
                            </Field>
                            <Field className="gap-1.5">
                                <FieldLabel htmlFor="deadline">Application Deadline</FieldLabel>
                                <Input
                                    id="deadline"
                                    name="deadline"
                                    type="date"
                                    className={`${inputClassName} scheme-dark`}
                                />
                            </Field>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-3">
                            {[
                                {
                                    name: "minSalary",
                                    label: "Min Salary / Rate",
                                    placeholder: "25",
                                },
                                {
                                    name: "maxSalary",
                                    label: "Max Salary / Rate",
                                    placeholder: "40",
                                },
                            ].map((salary) => (
                                <Field key={salary.name} className="gap-1.5">
                                    <FieldLabel htmlFor={salary.name}>
                                        {salary.label} <span className="sr-only">in euros</span>
                                    </FieldLabel>
                                    <div className="relative">
                                        <Euro
                                            aria-hidden="true"
                                            className="pointer-events-none absolute top-3.5 left-4 size-5 text-neutral-400"
                                        />
                                        <Input
                                            id={salary.name}
                                            name={salary.name}
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder={salary.placeholder}
                                            className={`${inputClassName} pl-11`}
                                        />
                                    </div>
                                </Field>
                            ))}
                            <Field className="gap-1.5">
                                <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
                                <NativeSelect
                                    id="frequency"
                                    name="frequency"
                                    defaultValue="hour"
                                    className={selectClassName}
                                >
                                    {frequencyOptions.map((option) => (
                                        <NativeSelectOption key={option.value} value={option.value}>
                                            {option.label}
                                        </NativeSelectOption>
                                    ))}
                                </NativeSelect>
                            </Field>
                        </div>
                    </FieldGroup>
                </section>

                <section
                    aria-labelledby="requirements-heading"
                    className={sectionClassName}
                >
                    <h2 id="requirements-heading" className={headingClassName}>
                        3. Responsibilities &amp; Requirements
                    </h2>
                    <FieldGroup className="gap-5">
                        <Field className="gap-1.5">
                            <FieldLabel htmlFor="responsibilities">
                                Key Responsibilities <span className="text-[#8b80ff]">*</span>
                            </FieldLabel>
                            <Textarea
                                id="responsibilities"
                                name="responsibilities"
                                placeholder="Describe the role and day-to-day responsibilities…"
                                required
                                className={`${inputClassName} min-h-28 resize-y py-4 leading-6`}
                            />
                        </Field>
                        <Field className="gap-1.5">
                            <FieldLabel htmlFor="requirements">
                                Qualifications &amp; Requirements{" "}
                                <span className="text-[#8b80ff]">*</span>
                            </FieldLabel>
                            <Textarea
                                id="requirements"
                                name="requirements"
                                placeholder="List the skills, experience, and qualifications needed…"
                                required
                                className={`${inputClassName} min-h-28 resize-y py-4 leading-6`}
                            />
                        </Field>
                    </FieldGroup>
                </section>
            </form>
        </section>
    )
}

export default AddNewJobPage
