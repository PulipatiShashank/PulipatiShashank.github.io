import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { siteContent } from "@/content";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { social, contact } = siteContent;

  return (
    <footer className="bg-muted/50 border-t border-border/50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="font-bold text-xl mb-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Turning caffeine into scalable solutions.
            </p>
          </div>

          <div className="flex gap-4 mb-4 md:mb-0">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-smooth"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-smooth"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-smooth"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            © {currentYear} Pulipati Shashank. Made with <Heart className="h-4 w-4 text-red-500" /> using React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
