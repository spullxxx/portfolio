import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Projects } from "@/components/Projects";
import { Capabilities } from "@/components/Capabilities";
import { AILab } from "@/components/AILab";
import { Skills } from "@/components/Skills";
import { Process } from "@/components/Process";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { StripeBand } from "@/components/ui/section-header";

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main className="mx-auto max-w-page">
        <Hero />
        <Journey />
        <StripeBand />
        <Projects />
        <StripeBand />
        <Capabilities />
        <AILab />
        <StripeBand />
        <Skills />
        <Process />
        <StripeBand />
        <Experience />
        <StripeBand />
        <Contact />
        <SpotifyEmbed />
        <div aria-hidden className="h-10 border-x border-line" />
      </main>
      <div className="mx-auto max-w-page">
        <Footer />
      </div>
    </div>
  );
}
