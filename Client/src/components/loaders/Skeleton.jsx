import { Skeleton as BaseSkeleton } from "@/components/ui/skeleton";

const Skeleton = ({ className = "" }) => {
  return <BaseSkeleton className={className} />;
};

export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <Skeleton key={columnIndex} className="h-6 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
