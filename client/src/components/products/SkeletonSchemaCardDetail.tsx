import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonSchemaCardDetail() {

  return (
    <div className="p-20 flex text-foreground h-full">
      <div className="flex rounded-sm justify-between backdrop-blur-[100px] hover:backdrop-blur-[200px] transition-all duration-200 ease-in-out p-4 bg-gray items-center w-full gap-3">
        <div className="flex justify-center w-1/2 h-full items-center">
          <Skeleton className="h-full w-full rounded-xl" />
        </div>

        <div className="w-1/2 flex flex-col gap-10 align-right h-full">
          <Skeleton className="w-1/2 h-[10px]" />
          <div className="flex flex-col gap-3">
            <Skeleton className="w-3/4 h-[40px]" />
            <Skeleton className="w-1/4 h-[40px]" />
          </div>
          <div className="flex justify-between gap-3">
            <div className="flex flex-col gap-3 w-1/2 justify-center items-center">
              <Skeleton className="w-3/5 h-[90px]" />
              <Skeleton className="w-1/2 h-[25px]" />
            </div>
            <div className="flex flex-col gap-3 w-1/2 ">
              <Skeleton className="w-full h-[25px]" />
              <Skeleton className="w-3/4 h-[25px]" />
              <Skeleton className="w-2/4 h-[25px]" />
              <Skeleton className="w-1/4 h-[25px]" />
            </div>
          </div>
          <Skeleton className="w-full h-[100px]" />

          <div className="flex flex-col gap-3">
            <Skeleton className="w-1/5 h-[35px]" />
            <div className="w-full flex gap-3">
              <Skeleton className="w-1/5 h-[35px]" />
              <Skeleton className="w-1/5 h-[35px]" />
              <Skeleton className="w-1/5 h-[35px]" />
              <Skeleton className="w-1/5 h-[35px]" />
              <Skeleton className="w-1/5 h-[35px]" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="w-1/5 h-[35px]" />
            <div className="w-full flex gap-3">
              <Skeleton className="w-1/5 h-[35px]" />
              <Skeleton className="w-1/5 h-[35px]" />
              <Skeleton className="w-1/5 h-[35px]" />
              <Skeleton className="w-1/5 h-[35px]" />
              <Skeleton className="w-1/5 h-[35px]" />
            </div>
          </div>
          
          <div className="flex justify-around gap-6 items-center w-full">
            <Skeleton className="w-1/3 h-[40px]" />
            <Skeleton className="w-1/3 h-[40px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
