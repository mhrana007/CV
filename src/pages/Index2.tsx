import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export default function ModernCV() {
  const [theme, setTheme] = useState<"blue" | "minimal">("blue");

  const themeClasses = {
    blue: {
      bg: "bg-neutral-50",
      card: "bg-white shadow-md border border-neutral-200",
      title: "text-neutral-900",
      subtitle: "text-blue-600",
      badge: "bg-blue-100 text-blue-800",
    },
    minimal: {
      bg: "bg-white",
      card: "bg-white border border-neutral-300",
      title: "text-black",
      subtitle: "text-neutral-500",
      badge: "bg-neutral-800 text-white",
    },
  };

  return (
    <div className={`${themeClasses[theme].bg} min-h-screen py-10 px-4`}>
      <div className="max-w-4xl mx-auto">
        {/* Theme Switch */}
        <div className="flex justify-end mb-4">
          <button
            className="px-3 py-1 text-sm border rounded hover:bg-neutral-100"
            onClick={() => setTheme(theme === "blue" ? "minimal" : "blue")}
          >
            Switch to {theme === "blue" ? "Minimal" : "Blue"} Theme
          </button>
        </div>

        {/* Header */}
        <Card className={`${themeClasses[theme].card} mb-6`}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div>
                <h1 className={`text-3xl font-bold ${themeClasses[theme].title}`}>
                  Mehedi Hasan
                </h1>
                <p className={`text-lg ${themeClasses[theme].subtitle}`}>
                  Advanced Software & IT Service Professional
                </p>
              </div>
              <div className="flex flex-col gap-2 text-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <Mail size={16} /> info@example.com
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={16} /> +880 1234 567 890
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} /> Dhaka, Bangladesh
                </div>
                <div className="flex items-center gap-1">
                  <Github size={16} /> github.com/mehedi
                </div>
                <div className="flex items-center gap-1">
                  <Linkedin size={16} /> linkedin.com/in/mehedi
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Content */}
        <Tabs defaultValue="experience">
          <TabsList className="mb-4">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          {/* Experience */}
          <TabsContent value="experience">
            <Card className={`${themeClasses[theme].card} mb-4`}>
              <CardContent className="py-4">
                <h2 className={`text-xl font-semibold ${themeClasses[theme].title}`}>
                  Masco Group
                </h2>
                <p className={`${themeClasses[theme].subtitle}`}>
                  Software Engineer (ERP, E-Commerce, Internal Automation)
                </p>
                <p className="mt-2 text-neutral-700">
                  Contributed to the design, development, and maintenance of enterprise-scale
                  applications, focusing on ERP, e-commerce, and internal automation systems.
                </p>
                <ul className="list-disc pl-5 mt-2 text-neutral-700">
                  <li>Developed scalable backend APIs using .NET</li>
                  <li>Optimized PostgreSQL queries for high performance</li>
                  <li>Managed deployment on CentOS with Nginx</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills */}
          <TabsContent value="skills">
            <Card className={`${themeClasses[theme].card} mb-4`}>
              <CardContent className="py-4">
                <h2 className={`text-xl font-semibold ${themeClasses[theme].title}`}>
                  Technical Skills
                </h2>
                <Separator className="my-3" />
                <div className="flex flex-wrap gap-2">
                  {[
                    "C# / .NET",
                    "Angular",
                    "PostgreSQL",
                    "Nginx",
                    "CentOS",
                    "Docker",
                    "AWS",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      className={themeClasses[theme].badge}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education */}
          <TabsContent value="education">
            <Card className={`${themeClasses[theme].card} mb-4`}>
              <CardContent className="py-4">
                <h2 className={`text-xl font-semibold ${themeClasses[theme].title}`}>
                  Education
                </h2>
                <p className="mt-2 text-neutral-700">
                  Bachelor of Science in Computer Science and Engineering  
                  <br />
                  Dhaka International University — 2018
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
