//left image square skeleton with right side text skeleton
//this is the for loading componenent in projects (list)
///modify h or w to chnage the shapes
export default function ProjectCardSkeleton() {
  return (
    <div className="flex w-full max-w-4xl items-center gap-6 rounded-lg bg-white p-6 shadow dark:bg-white-200">
      
      <div className="h-24 w-24 rounded-md bg-gray-300 animate-pulse dark:bg-gray-300" />


      <div className="flex flex-col flex-1 space-y-3">
        <div className="h-5 w-1/3 rounded bg-gray-300 animate-pulse dark:bg-gray-300" />
        <div className="h-4 w-2/3 rounded bg-gray-300 animate-pulse dark:bg-gray-300" />
        <div className="h-4 w-1/2 rounded bg-gray-300 animate-pulse dark:bg-gray-300" />
        <div className="h-4 w-1/4 rounded bg-gray-300 animate-pulse dark:bg-gray-300" />
      </div>
    </div>
  );
}
