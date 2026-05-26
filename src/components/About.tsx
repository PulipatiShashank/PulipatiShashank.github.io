import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/Reveal";
import { siteContent } from "@/content";

const About = () => {
  const { about } = siteContent;

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-4xl mx-auto leading-relaxed px-2">
            {about.intro}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <Reveal className="space-y-6 order-2 lg:order-1" delay={100}>
            <Card className="card-glass hover:glow-primary transition-smooth">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">My Journey</h3>
                {about.journey.map((p, i) => (
                  <p
                    key={i}
                    className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4 last:mb-0"
                  >
                    {p}
                  </p>
                ))}
              </CardContent>
            </Card>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={200}>
            <Card className="card-glass hover:glow-accent transition-smooth">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                  Skills &amp; Technologies
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {about.skills.map((skill, index) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="chip-aurora px-3 py-1.5 cursor-default text-xs sm:text-sm rounded-full"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
