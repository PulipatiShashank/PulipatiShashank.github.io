import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Download, ArrowDown, Sparkles } from "lucide-react";
import { siteContent } from "@/content";

const Hero = () => {
  const { hero, contact, social } = siteContent;
  const ROLES = hero.roles;
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    if (ROLES.length <= 1) return;
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, [ROLES.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Aurora background */}
      <div className="aurora-mesh" />
      <div className="aurora-grid" />
      <div className="aurora-noise" />

      {/* Floating orbs */}
      <div
        className="absolute top-[18%] left-[12%] w-40 h-40 rounded-full blur-3xl animate-float-slow hidden sm:block"
        style={{ background: "hsl(var(--primary) / 0.35)" }}
      />
      <div
        className="absolute bottom-[18%] right-[10%] w-52 h-52 rounded-full blur-3xl animate-float hidden sm:block"
        style={{ background: "hsl(var(--accent) / 0.35)", animationDelay: "1.2s" }}
      />
      <div
        className="absolute top-[40%] right-[25%] w-32 h-32 rounded-full blur-3xl animate-float-slow hidden md:block"
        style={{ background: "hsl(38 100% 60% / 0.30)", animationDelay: "0.6s" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div
          className="hero-line inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full text-xs sm:text-sm
                     border border-white/15 bg-white/5 backdrop-blur-md text-white/90"
          style={{ animationDelay: "0s" }}
        >
          <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--highlight))]" />
          Available for new opportunities
        </div>

        <h1
          className="hero-line text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 sm:mb-6 leading-[1.05] tracking-tight"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="text-white/90">Hi, I'm </span>
          <span className="text-gradient-animated">{hero.name}</span>
        </h1>

        <p
          className="hero-line text-base sm:text-xl md:text-2xl mb-2 text-white/80 max-w-2xl mx-auto"
          style={{ animationDelay: "0.2s" }}
        >
          {hero.tagline}
        </p>

        <div
          className="hero-line h-9 sm:h-10 md:h-12 mb-8 flex items-center justify-center overflow-hidden"
          style={{ animationDelay: "0.25s" }}
        >
          <span
            key={roleIdx}
            className="text-lg sm:text-2xl md:text-3xl font-semibold text-gradient"
            style={{ animation: "heroIn 0.5s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            {ROLES[roleIdx]}
          </span>
        </div>

        <div
          className="hero-line flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-12 px-4"
          style={{ animationDelay: "0.35s" }}
        >
          <a
            href={hero.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aurora rounded-xl px-6 py-3 text-base sm:text-lg font-medium inline-flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            Download CV
          </a>
          <a
            href="#projects"
            className="btn-outline-aurora rounded-xl px-6 py-3 text-base sm:text-lg font-medium inline-flex items-center gap-2"
          >
            View Projects
          </a>
        </div>

        <div
          className="hero-line flex gap-6 sm:gap-8 justify-center"
          style={{ animationDelay: "0.5s" }}
        >
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/70 hover:text-white hover:scale-110 transition-smooth"
          >
            <Github className="h-6 w-6 sm:h-7 sm:w-7" />
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/70 hover:text-white hover:scale-110 transition-smooth"
          >
            <Linkedin className="h-6 w-6 sm:h-7 sm:w-7" />
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
            className="text-white/70 hover:text-white hover:scale-110 transition-smooth"
          >
            <Mail className="h-6 w-6 sm:h-7 sm:w-7" />
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 hover:text-white animate-float"
      >
        <ArrowDown className="h-5 w-5" />
      </a>
    </section>
  );
};

export default Hero;
