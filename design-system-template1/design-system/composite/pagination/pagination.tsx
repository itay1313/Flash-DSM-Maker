import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Button } from '../../primitives/button'

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  siblingCount?: number
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, currentPage, totalPages, onPageChange, showFirstLast = true, siblingCount = 1, ...props }, ref) => {
    const getPageNumbers = () => {
      const totalNumbers = siblingCount * 2 + 5
      const totalBlocks = totalNumbers + 2

      if (totalPages <= totalBlocks) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

      const shouldShowLeftDots = leftSiblingIndex > 2
      const shouldShowRightDots = rightSiblingIndex < totalPages - 2

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount
        const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
        return [...leftRange, 'dots', totalPages]
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount
        const rightRange = Array.from(
          { length: rightItemCount },
          (_, i) => totalPages - rightItemCount + i + 1
        )
        return [1, 'dots', ...rightRange]
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = Array.from(
          { length: rightSiblingIndex - leftSiblingIndex + 1 },
          (_, i) => leftSiblingIndex + i
        )
        return [1, 'dots', ...middleRange, 'dots', totalPages]
      }

      return []
    }

    const pageNumbers = getPageNumbers()

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn('ds-flex ds-items-center ds-justify-center ds-space-x-2', className)}
        {...props}
      >
        {showFirstLast && (
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            <ChevronLeft className="ds-h-4 ds-w-4" />
            <ChevronLeft className="ds-h-4 ds-w-4 ds--ml-2" />
          </Button>
        )}
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="ds-h-4 ds-w-4" />
        </Button>
        {pageNumbers.map((page, index) => {
          if (page === 'dots') {
            return (
              <span key={`dots-${index}`} className="ds-px-2">
                <MoreHorizontal className="ds-h-4 ds-w-4 ds-text-text-tertiary" />
              </span>
            )
          }
          return (
            <Button
              key={page}
              variant={currentPage === page ? 'primary' : 'tertiary'}
              size="sm"
              onClick={() => onPageChange(page as number)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Button>
          )
        })}
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="ds-h-4 ds-w-4" />
        </Button>
        {showFirstLast && (
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            <ChevronRight className="ds-h-4 ds-w-4" />
            <ChevronRight className="ds-h-4 ds-w-4 ds--ml-2" />
          </Button>
        )}
      </nav>
    )
  }
)
Pagination.displayName = 'Pagination'

export { Pagination }

