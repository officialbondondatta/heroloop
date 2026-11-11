"use client"

import { useId, type FormEvent } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  buttonText?: string
  label?: string
}

const SearchBar = ({
  onSearch,
  placeholder = "Search...",
  buttonText = "Search",
  label = "Search",
}: SearchBarProps) => {
  const inputId = useId()
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const formData = Object.fromEntries(data.entries())
    const search = formData.search
    onSearch(search as string)
  }

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      aria-label={label}
      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#131316] p-5 sm:flex-row sm:p-7"
    >
      <div className="relative flex-1">
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-neutral-400"
        />
        <Input
          id={inputId}
          name="search"
          placeholder={placeholder}
          className="h-14 rounded-xl border-white/10 bg-[#1a1a1e] pl-12 text-white placeholder:text-neutral-400 focus-visible:ring-violet-400/30 sm:h-16 dark:bg-[#1a1a1e]"
        />
      </div>
      <Button
        type="submit"
        className="h-14 rounded-xl bg-white px-7 text-base font-semibold text-neutral-800 hover:bg-neutral-200 sm:h-16"
      >
        {buttonText}
      </Button>
    </form>
  )
}

export default SearchBar
