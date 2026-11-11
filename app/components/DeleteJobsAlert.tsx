"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteJob } from "@/lib/actions/jobs";
import type { JobListing } from "@/types/job";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteJobsAlert({ job, onDeleted }: { job: JobListing; onDeleted: () => void }) {
    const [open, setOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState("")

    const handleDelete = async () => {
        setIsDeleting(true)
        setError("")
        try {
            await deleteJob(job._id)
            // Tell the parent to remove this job from its table state.
            onDeleted()
            setOpen(false)
        } catch {
            setError("Failed to delete the job. Please try again.")
        } finally {
            setIsDeleting(false)
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={(nextOpen) => { if (!isDeleting) { setOpen(nextOpen); setError("") } }}>
            <AlertDialogTrigger render={<Button variant="destructive" aria-label={`Delete ${job.title}`}><Trash2></Trash2> </Button>} />
            <AlertDialogContent className={`bg-red-400 text-slate-800`}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className={`text-slate-700`}>
                        This action cannot be undone. This will permanently delete this
                        job posting from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {error && <p role="alert" className="text-sm font-medium">{error}</p>}
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className={`bg-red-400`} onClick={handleDelete} disabled={isDeleting}>{isDeleting ? "Deleting…" : "Delete"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
