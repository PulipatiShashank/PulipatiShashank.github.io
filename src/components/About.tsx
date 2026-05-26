import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/Reveal";

const About = () => {
  const skills = [
    "Python", "SQL", "HTML", "CSS", "JavaScript", "Amazon Web Services", "Lambda", "CloudFormation", "CloudWatch", "EC2", "DynamoDB", "RDS", "SQS", "IAM", "S3", "Git", "Jira", "VS Code", "Eclipse", "IntelliJ", "Maven", "Postman", "Linux", "PostgreSQL"
  ];

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-4xl mx-auto leading-relaxed px-2">
            Software Engineer with 1.5+ years of experience in building and maintaining cloud-based applications, automating tasks using Python, and developing full-stack solutions. Hands-on experience building GenAI-powered tools using OpenAI APIs. Strong foundation in prompt engineering, full-stack development, and cloud infrastructure. Passionate about creating intelligent, scalable systems that bridge traditional software with AI innovation.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* About Text */}
          <Reveal className="space-y-6 order-2 lg:order-1" delay={100}>
            <Card className="card-glass hover:glow-primary transition-smooth">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">My Journey</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4">
                  With 1.5+ years of experience in software development, I specialize in building cloud-based, full-stack applications that integrate intelligent automation and real-world functionality. My work focuses on delivering scalable, maintainable systems using technologies like Python, JavaScript, AWS, and SQL.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  I have hands-on experience developing GenAI-powered tools using OpenAI APIs, with a strong foundation in prompt engineering, backend services, and cloud infrastructure. I'm passionate about bridging traditional software with AI innovation to create smarter digital solutions.                
                </p>
              </CardContent>
            </Card>
          </Reveal>

          {/* Skills */}
          <Reveal className="order-1 lg:order-2" delay={200}>
            <Card className="card-glass hover:glow-accent transition-smooth">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {skills.map((skill, index) => (
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