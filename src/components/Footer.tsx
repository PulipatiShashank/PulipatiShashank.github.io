import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border/50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Brand */}
          <div className="mb-4 md:mb-0">
            <div className="font-bold text-xl mb-2">
              Portfolio
            </div>
            <p className="text-muted-foreground text-sm">
              Turning caffeine into scalable solutions.
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4 mb-4 md:mb-0">
            <a 
              href="https://github.com/PulipatiShashank/" target="_blank"
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-smooth"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/pulipati-shashank-3b9341288/" target="_blank"
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-smooth"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:pulipatishashank@gmail.com" target="_blank"
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-smooth"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            © {currentYear} Pulipati Shashank. Made with <Heart className="h-4 w-4 text-red-500" /> using React & TypeScript
          </p>
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            Made with vibe coding
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;