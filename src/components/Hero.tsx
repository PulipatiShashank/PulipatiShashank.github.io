import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-gradient opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div>
          <h1 className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white leading-tight" style={{ animationDelay: "0.05s" }}>
            Hi, I'm Shashank
          </h1>
          <p className="hero-line text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed px-2" style={{ animationDelay: "0.2s" }}>
            Generative AI-focused Software Developer crafting beautiful digital experiences with modern technologies
          </p>

          {/* CTA Buttons */}
          <div className="hero-line flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4" style={{ animationDelay: "0.35s" }}>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transform transition duration-300 ease-in-out text-base sm:text-lg px-6 py-3">
              <a href="https://drive.google.com/file/d/1Y6c2mRF_DRISmn1ENYabFTtiUep0R1_T/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Download CV
              </a>
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="hero-line flex gap-6 sm:gap-8 justify-center" style={{ animationDelay: "0.5s" }}>
            <a href="https://github.com/PulipatiShashank/" target="_blank" className="text-white/80 hover:text-white hover:scale-110 transition-smooth p-2 sm:p-1">
              <Github className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
            <a href="https://www.linkedin.com/in/pulipati-shashank-3b9341288/" target="_blank" className="text-white/80 hover:text-white hover:scale-110 transition-smooth p-2 sm:p-1">
              <Linkedin className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
            <a href="mailto:pulipatishashank@gmail.com" target="_blank" className="text-white/80 hover:text-white hover:scale-110 transition-smooth p-2 sm:p-1">
              <Mail className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Floating elements - hidden on mobile for cleaner look */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-20 sm:h-20 bg-primary/20 rounded-full animate-float hidden sm:block" />
      <div className="absolute bottom-1/4 right-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-accent/20 rounded-full animate-float hidden sm:block" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Hero;