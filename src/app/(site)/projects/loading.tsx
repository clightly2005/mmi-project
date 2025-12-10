import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
//just when projects are loading from DB to show skeleton
export default function Loading() {
  return (
    <div className="space-y-4 max-w-6xl mx-auto p-8">
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
    </div>
  );
}
