import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import { siteContent } from "@/content";

const Contact = () => {
  const { contact } = siteContent;
  const telHref = `tel:${contact.phone.replace(/\s+/g, "")}`;

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
            Feel free to reach out for collaborations or just a friendly chat!
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <Card className="card-glass hover:glow-primary hover:-translate-y-1 transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Email</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <a
                href={`mailto:${contact.email}`}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base break-all"
              >
                {contact.email}
              </a>
            </CardContent>
          </Card>

          <Card className="card-glass hover:glow-primary hover:-translate-y-1 transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Phone</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <a
                href={telHref}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base"
              >
                {contact.phone}
              </a>
            </CardContent>
          </Card>

          <Card className="card-glass hover:glow-primary transition-smooth sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm sm:text-base">{contact.location}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
