//this is my server component to render the home page shell 

import Hero from "../../../components/Hero"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero></Hero>
      <section className="mx-auto max-w-6xl px-4 pb-20">
      </section>
    </div>
  );
}
