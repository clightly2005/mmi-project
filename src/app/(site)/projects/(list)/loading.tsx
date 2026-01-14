import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
//for when when projects are loading from DB to show the user a skeleton so they know it hasnt frozen
export default function Loading() {
  return (
    <div className="space-y-4 max-w-6xl mx-auto p-8">
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
    </div>
  );
}
