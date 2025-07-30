import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Movie Booking System",
      description: "A modern, responsive movie booking platform built with Python Flask, featuring seat selection, user authentication, admin panel, and email confirmations.",
      technologies: ["HTML", "CSS", "JavScript", "Python", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "https://github.com/PulipatiShashank/movie-booking-system",
      image: "src/assets/project1.png"
    },
    ,
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing projects and skills. Features smooth animations and modern design principles.",
      technologies: ["TypeScript", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
      image: "src/assets/project3.jpg"
    },
    {
      title: "Image Steganography",
      description: "This Python tool hides secret messages inside JPEG or PNG images using Least Significant Bit (LSB) steganography. It can also extract those messages later.",
      technologies: ["TypeScript", "React", "Socket.io", "MongoDB"],
      liveUrl: "#",
      githubUrl: <a> href="https://github.com/PulipatiShashank/image-steganography"</a>,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className="card-glass hover:glow-primary transition-smooth group overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {project.title}
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="text-sm">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;