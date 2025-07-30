import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-gradient opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Hi, I'm Shashank
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Generative AI-focused Software Developer crafting beautiful digital experiences with modern technologies
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transform transition duration-300 ease-in-out">
              <a href="https://drive.google.com/file/d/1Y6c2mRF_DRISmn1ENYabFTtiUep0R1_T/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-7 w-7" />
                  Download CV
              </a>
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-6 justify-center">
            <a href="https://github.com/PulipatiShashank/" target="_blank" className="text-white/80 hover:text-white hover:scale-110 transition-smooth">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/pulipati-shashank-3b9341288/" target="_blank" className="text-white/80 hover:text-white hover:scale-110 transition-smooth">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="mailto:pulipatishashank@gmail.com" target="_blank" className="text-white/80 hover:text-white hover:scale-110 transition-smooth">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-primary/20 rounded-full animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Hero;