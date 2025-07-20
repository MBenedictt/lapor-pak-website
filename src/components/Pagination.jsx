import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Pagination = ({ className = "", ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={`mx-auto flex w-full justify-center ${className}`}
    {...props}
  />
);

const PaginationContent = ({ className = "", ...props }) => (
  <ul
    className={`flex flex-row items-center gap-1 ${className}`}
    {...props}
  />
);

const PaginationItem = ({ className = "", ...props }) => (
  <li className={`${className}`} {...props} />
);

const PaginationLink = ({
  className = "",
  isActive,
  size = "icon",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const active = isActive
    ? "bg-primary text-primary-foreground hover:bg-primary/90"
    : "hover:bg-accent hover:text-accent-foreground";

  const sizeClass =
    size === "default"
      ? "h-10 px-4 py-2"
      : size === "sm"
      ? "h-9 rounded-md px-3"
      : size === "lg"
      ? "h-11 rounded-md px-8"
      : "h-10 w-10"; // icon

  return (
    <button
      aria-current={isActive ? "page" : undefined}
      className={`${base} ${active} ${sizeClass} ${className}`}
      {...props}
    />
  );
};

const PaginationPrevious = ({ className = "", ...props }) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={`gap-1 pl-2.5 ${className}`}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Sebelumnya</span>
  </PaginationLink>
);

const PaginationNext = ({ className = "", ...props }) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={`gap-1 pr-2.5 ${className}`}
    {...props}
  >
    <span>Berikutnya</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);

const PaginationEllipsis = ({ className = "", ...props }) => (
  <span
    aria-hidden
    className={`flex h-9 w-9 items-center justify-center ${className}`}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
