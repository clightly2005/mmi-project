//this is my server component to render the home page shell 
import Link from "next/link";
import Hero from "../../components/Hero"
import ProjectPreview from "../../components/ProjectPreview";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero></Hero>
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl hero font-semibold">Your Favorite Projects</h2>
          <Link href="/projects" className="rounded-full border button-primary px-4 py-2 text-sm hover:bg-white">
            View All Projects
          </Link>
        </div>
        <ProjectPreview />
      </section>
    </div>
  );
}
