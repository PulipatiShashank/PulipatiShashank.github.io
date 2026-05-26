import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Contact", href: "#contact", id: "contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? y / docH : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <nav
        className={`fixed top-0 w-full z-50 transition-smooth ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div
              className="font-bold text-xl cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`relative transition-smooth hover:scale-105 ${
                      isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                );
              })}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 border-t border-border/50 flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded transition-smooth ${
                    active === item.id
                      ? "text-foreground bg-muted"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
