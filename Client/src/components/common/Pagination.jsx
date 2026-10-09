import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page = 1, limit = 10, total = 0, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  if (total <= limit) return null;

  const buttonClass =
    "inline-flex size-10 items-center justify-center border border-border bg-white text-ink transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
      <span className="text-sm text-muted-fg">
        Page {page} of {totalPages} · {total} total
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className={buttonClass}
          disabled={page <= 1}
          onClick={() => onPageChange?.(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          const active = pageNumber === page;
          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange?.(pageNumber)}
              className={`${buttonClass} ${active ? "bg-red text-white hover:bg-red" : ""}`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          type="button"
          className={buttonClass}
          disabled={page >= totalPages}
          onClick={() => onPageChange?.(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
