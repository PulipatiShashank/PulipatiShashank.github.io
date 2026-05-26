import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import project1Image from "@/assets/project1.png";
import project3Image from "@/assets/project3.jpg";
import Reveal from "@/components/Reveal";

const Projects = () => {
  const projects = [
    {
      title: "Movie Booking System",
      description: "A modern, responsive movie booking platform built with Python Flask, featuring seat selection, user authentication, admin panel, and email confirmations.",
      technologies: ["HTML", "CSS", "JavaScript", "Python", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "https://github.com/PulipatiShashank/movie-booking-system",
      image: project1Image
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing projects and skills. Features smooth animations and modern design principles.",
      technologies: ["TypeScript", "React", "Tailwind CSS"],
      liveUrl: "https://pulipatiShashank.github.io/",
      githubUrl: "https://github.com/PulipatiShashank/PulipatiShashank.github.io",
      image: project3Image
    },
    {
      title: "Image Steganography",
      description: "This Python tool hides secret messages inside JPEG or PNG images using Least Significant Bit (LSB) steganography. It can also extract those messages later.",
      technologies: ["Python", "PIL", "Cryptography", "GUI"],
      liveUrl: "#",
      githubUrl: "https://github.com/PulipatiShashank/image-steganography",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop"
    }
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
            A showcase of my recent work and personal projects
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 120}>
            <Card
              className="card-glass hover:glow-primary hover:-translate-y-1 transition-smooth group overflow-hidden h-full"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-lg sm:text-xl">
                  <span className="leading-tight">{project.title}</span>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-9 w-9 p-0 touch-manipulation"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-9 w-9 p-0 touch-manipulation"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                      disabled={project.liveUrl === '#'}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs px-2 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;