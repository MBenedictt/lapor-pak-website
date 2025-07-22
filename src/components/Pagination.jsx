/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

function Pagination({ className = "", ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={`mx-auto flex w-full justify-center ${className}`}
      {...props}
    />
  )
}

function PaginationContent({ className = "", ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={`flex flex-row items-center gap-2 ${className}`}
      {...props}
    />
  )
}

function PaginationItem(props) {
  return <li data-slot="pagination-item" {...props} />
}

function PaginationLink({
  className = "",
  isActive,
  size = "icon",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const active = isActive
    ? "border border-gray-300 bg-gray-100 text-primary-foreground hover:bg-primary/90"
    : "hover:bg-gray-200 hover:text-accent-foreground"

  const sizeClass =
    size === "default"
      ? "h-10 px-4 py-2"
      : size === "sm"
        ? "h-9 rounded-md px-3"
        : size === "lg"
          ? "h-11 rounded-md px-8"
          : "h-10 w-10"

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={`${base} ${active} ${sizeClass} ${className}`}
      {...props}
    />
  )
}

function PaginationPrevious({ className = "", ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={`gap-1 px-2.5 sm:pl-2.5 hover:bg-gray-200 ${className}`}
      {...props}
    >
      <ChevronLeft className="h-4 w-4 mt-[3px] max-md:mt-0" />
      <span className="hidden sm:block">Sebelumnya</span>
    </PaginationLink>
  )
}

function PaginationNext({ className = "", ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={`gap-1 px-2.5 sm:pr-2.5 hover:bg-gray-200 ${className}`}
      {...props}
    >
      <span className="hidden sm:block">Berikutnya</span>
      <ChevronRight className="h-4 w-4 mt-[3px] max-md:mt-0" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className = "", ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={`flex h-9 w-9 items-center justify-center ${className}`}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}