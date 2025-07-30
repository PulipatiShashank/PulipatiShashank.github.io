import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const skills = [
    "Python", "SQL", "HTML", "CSS", "JavaScript", "Amazon Web Services", "Lambda", "CloudFormation", "CloudWatch", "EC2", "DynamoDB", "RDS", "SQS", "IAM", "S3", "Git", "Jira", "VS Code", "Eclipse", "IntelliJ", "Maven", "Postman", "Linux", "PostgreSQL"
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-4xl mx-auto">
            Software Engineer with 1.5+ years of experience in building and maintaining cloud-based applications, automating tasks using Python, and developing full-stack solutions. Hands-on experience building GenAI-powered tools using OpenAI APIs. Strong foundation in prompt engineering, full-stack development, and cloud infrastructure. Passionate about creaƟng intelligent, scalable systems that bridge traditional software with AI innovation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div className="space-y-6">
            <Card className="card-glass hover:glow-primary transition-smooth">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
                <p className="text-muted-foreground leading-relaxed">
                  With 1.5+ years of experience in software development, I specialize in building cloud-based, full-stack applications that integrate intelligent automation and real-world functionality. My work focuses on delivering scalable, maintainable systems using technologies like Python, JavaScript, AWS, and SQL.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  I have hands-on experience developing GenAI-powered tools using OpenAI APIs, with a strong foundation in prompt engineering, backend services, and cloud infrastructure. I’m passionate about bridging traditional software with AI innovation to create smarter digital solutions.                
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Skills */}
          <div>
            <Card className="card-glass hover:glow-accent transition-smooth">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="px-3 py-1 hover:scale-105 transition-bounce cursor-default"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;