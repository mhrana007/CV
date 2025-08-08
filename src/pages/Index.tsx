import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Download,
  Facebook,
  Globe,  
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ModernCV() {
  const [theme, setTheme] = useState<"blue" | "minimal">("blue");

  // Base URL for assets (image, pdf)
  const baseUrl = import.meta.env.BASE_URL;

  // Theme class sets
  const themeClasses = {
    blue: {
      bg: "bg-neutral-50",
      card: "bg-white shadow-md border border-neutral-200",
      title: "text-neutral-900",
      subtitle: "text-blue-600",
      textMuted: "text-neutral-700",
      badge: "bg-blue-100 text-blue-800 hover:bg-blue-800 hover:text-white transition-colors duration-300",
      linkBtn:
        "text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white",
    },
    minimal: {
      bg: "bg-white",
      card: "bg-white border border-neutral-300",
      title: "text-black",
      subtitle: "text-neutral-600",
      textMuted: "text-neutral-800",
      badge: "bg-neutral-800 text-white",
      linkBtn:
        "text-black border border-black hover:bg-black hover:text-white",
    },
  };

  // Download premade PDF
  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = `${baseUrl}Mehedi_Hasan_CV.pdf`;
    link.download = "Mehedi_Hasan_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate PDF from CV HTML
  const generatePDF = async () => {
    try {
      const element = document.getElementById("cv-content");
      if (!element) return;

      // Remove sticky styles if any
      const stickyElements = element.querySelectorAll(".sticky");
      stickyElements.forEach((el) => {
        (el as HTMLElement).style.position = "static";
        (el as HTMLElement).style.top = "auto";
      });

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        height: element.scrollHeight,
        windowHeight: element.scrollHeight,
      });

      stickyElements.forEach((el) => {
        (el as HTMLElement).style.position = "sticky";
        (el as HTMLElement).style.top = "2rem";
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);

      if (imgHeight * ratio > pdfHeight) {
        const totalPages = Math.ceil((imgHeight * ratio) / pdfHeight);
        for (let i = 1; i < totalPages; i++) {
          pdf.addPage();
          const yOffset = -pdfHeight * i;
          pdf.addImage(
            imgData,
            "PNG",
            imgX,
            imgY + yOffset,
            imgWidth * ratio,
            imgHeight * ratio
          );
        }
      }

      pdf.save("Mehedi_Hasan_CV_Generated.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
      const element = document.getElementById("cv-content");
      if (element) {
        const stickyElements = element.querySelectorAll(".sticky");
        stickyElements.forEach((el) => {
          (el as HTMLElement).style.position = "sticky";
          (el as HTMLElement).style.top = "2rem";
        });
      }
    }
  };

  return (
    <div className={`${themeClasses[theme].bg} min-h-screen py-10 px-4`}>
      <div className="max-w-4xl mx-auto">
        {/* Theme Switch */}
        {/*
		<div className="flex justify-end mb-6">
          <button
            className={`px-4 py-2 rounded border transition-colors duration-200 ${themeClasses[theme].linkBtn}`}
            onClick={() => setTheme(theme === "blue" ? "minimal" : "blue")}
            aria-label="Switch Theme"
          >
            Switch to {theme === "blue" ? "Minimal" : "Blue"} Theme
          </button>
        </div>
		*/}
		
        {/* Header */}
        <Card className={`${themeClasses[theme].card} mb-8`}>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0 w-36 h-36 rounded-full overflow-hidden border border-gray-300 shadow-md">
                <img
                  src={`${baseUrl}Mehedi.jpg`}
                  alt="Mehedi Hasan Profile"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <h1
                  className={`text-4xl font-extrabold leading-tight mb-1 ${themeClasses[theme].title}`}
                >
                  Md. Mehedi Hasan
                </h1>
                <p
                  className={`text-xl font-semibold mb-3 ${themeClasses[theme].subtitle}`}
                >
                  Sr. Software Engineer
                </p>
                <div className="flex flex-wrap gap-4 text-sm md:text-base text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Mail size={10} />
                    <a
                      href="mailto:mhrana.csse@gmail.com"
                      className="underline hover:text-blue-600"
                    >
                      mhrana.csse@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={10} />
                    <a href="tel:+8801751339533" className="underline hover:text-blue-600">
                      +8801751339533
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={10} />
                    <span>Faridpur, Bangladesh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={10} />
                    <span>Bangladeshi</span>
                  </div>
                </div>
                <div className="flex mt-4 space-x-3">
                  <a
                    href="https://github.com/mhrana007"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Profile"
                    className={`hover:text-blue-600 transition-colors duration-200`}
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mehedi-hasan-5b0921ba/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn Profile"
                    className={`hover:text-blue-600 transition-colors duration-200`}
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://www.facebook.com/mehedi.rana.90"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook Profile"
                    className={`hover:text-blue-600 transition-colors duration-200`}
                  >
                    <Facebook size={20} />
                  </a>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xs">
                  <button
                    onClick={downloadPDF}
                    className="flex items-center justify-center gap-2 py-2 px-4 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Download size={12} /> Download PDF
                  </button>
                  <button
                    onClick={generatePDF}
                    className="flex items-center justify-center gap-2 py-2 px-4 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Download size={10} /> Generate PDF
                  </button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div id="cv-content">
          {/* About Me */}
          <Card className={`${themeClasses[theme].card} mb-8`}>
            <CardHeader>
              <CardTitle className={themeClasses[theme].title}>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={themeClasses[theme].textMuted}>
                I am a Senior Software Engineer with experience delivering scalable,
                secure, and high-performance software solutions. My expertise covers both
                back-end and front-end development, specializing in .NET Core,
                Microservices, Angular, and PostgreSQL. I have successfully led projects
                in IoT platforms, API integrations, and enterprise systems, combining
                strong technical proficiency with problem-solving and leadership skills.
              </p>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className={`${themeClasses[theme].card} mb-8`}>
            <CardHeader>
              <CardTitle className={themeClasses[theme].title}>Work Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-12">
              {/* Surbana Jurong */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                <div className="md:w-48 mb-3 md:mb-0">
                  <h3 className="font-semibold text-lg">Sr. Software Engineer</h3>
                  <p className={`font-medium ${themeClasses[theme].subtitle}`}>
                    Surbana Jurong
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">May 2023 - Present</p>
                </div>
                <div className={`flex-1 ${themeClasses[theme].textMuted}`}>
                  <p className="mb-2">
                    At <strong>Surbana Jurong Bangladesh Ltd.</strong>, I am responsible
                    for the design, development, and optimization of large-scale{" "}
                    <strong>IoT-based smart city solutions</strong>.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Leading <strong>R&D</strong> for the <strong>HDB Smart Lighting
                      Platform</strong>, enabling centralized monitoring and control of
                      smart lighting systems.
                    </li>
                    <li>
                      Implementing <strong>.NET Core 8 microservices</strong> and{" "}
                      <strong>PostgreSQL</strong> databases for scalable and secure
                      solutions.
                    </li>
                    <li>
                      Configuring and integrating <strong>EMQX MQTT broker</strong> for
                      real-time device communication.
                    </li>
                    <li>
                      Ensuring system security through <strong>HDB IAM</strong> and{" "}
                      <strong>WOD ADFS</strong> authentication, and API hardening.
                    </li>
                    <li>
                      Reviewing and optimizing source code to maintain{" "}
                      <strong>clean architecture</strong> and high-quality standards.
                    </li>
                    <li>
                      Collaborating with cross-functional teams to align technical
                      solutions with business requirements.
                    </li>
                  </ul>
                </div>
              </div>

              <Separator />

              {/* Masco Group */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                <div className="md:w-48 mb-3 md:mb-0">
                  <h3 className="font-semibold text-lg">Sr. Software Engineer</h3>
                  <p className={`font-medium ${themeClasses[theme].subtitle}`}>
                    Masco Group
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">Nov 2016 - May 2023</p>
                </div>
                <div className={`flex-1 ${themeClasses[theme].textMuted}`}>
                  <p className="mb-2">
                    At <strong>Masco Group</strong>, I contributed to the design,
                    development, and maintenance of enterprise-scale applications, with
                    a focus on <strong>ERP, e-commerce, and internal automation systems</strong>.
                    Key responsibilities included:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Developed and enhanced <strong>Masco Bazar</strong> e-commerce
                      platform, including admin panel, order management, and real-time
                      chat integration.
                    </li>
                    <li>
                      Built ERP modules for <strong>Merchandising, Supply Chain, and
                      Knitting</strong> using ASP.NET MVC, C#, and SQL Server.
                    </li>
                    <li>
                      Created responsive web interfaces with <strong>Angular, React,
                      JavaScript, and Bootstrap</strong> for enterprise applications.
                    </li>
                    <li>
                      Designed and integrated <strong>REST APIs</strong> for seamless
                      system interoperability.
                    </li>
                    <li>
                      Implemented <strong>Crystal Reports</strong> and <strong>RDLC</strong>{" "}
                      for advanced reporting and analytics.
                    </li>
                    <li>
                      Optimized database performance for <strong>SQL Server</strong> to
                      handle high transaction loads.
                    </li>
                    <li>Reviewed source code to ensure clean architecture and high-quality standards.</li>
                  </ul>
                </div>
              </div>

              <Separator />

              {/* Advanced Software and IT Service */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                <div className="md:w-48 mb-3 md:mb-0">
                  <h3 className="font-semibold text-lg">Software Engineer</h3>
                  <p className={`font-medium ${themeClasses[theme].subtitle}`}>
                    Advanced Software and IT Service
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">Oct 2015 - Oct 2016</p>
                </div>
                <div className={`flex-1 ${themeClasses[theme].textMuted}`}>
                  <p className="mb-2">
                    At <strong>Advanced Software and IT Service</strong>, I was involved
                    in the design and development of enterprise and client-focused
                    software solutions, with a focus on CRM and security management
                    systems. Key responsibilities included:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Developed <strong>DealerCRM</strong> for US-based automotive
                      dealerships to manage vehicle inventory and customer leads.
                    </li>
                    <li>
                      Built <strong>KONDOLINK</strong> security management software for
                      clients in Canada and the USA using .NET Core and Angular.
                    </li>
                    <li>
                      Designed and implemented responsive front-end components with
                      Angular, JavaScript, and Bootstrap.
                    </li>
                    <li>Integrated REST APIs for seamless data exchange between systems.</li>
                    <li>Conducted code reviews to ensure maintainability, scalability, and adherence to best practices.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className={`${themeClasses[theme].card} mb-8`}>
            <CardHeader>
              <CardTitle className={themeClasses[theme].title}>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="technical">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="frontend">Frontend</TabsTrigger>
                  <TabsTrigger value="backend">Backend</TabsTrigger>
                  <TabsTrigger value="database">Database</TabsTrigger>
                </TabsList>

                <TabsContent value="technical" className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "Object-Oriented Programming (OOP)",
                      "Microservices Architecture",
                      "AWS",
                      "CQRS Pattern",
                      "API Design & Integration (REST)",
                      "Authentication & Authorization (OIDC,SAML)",
                      "Docker & Containerization",
                      "Real-time Messaging (MQTT, EMQX)",
                      "Version Control (Git,GitHub, Bitbucket,SVN)",
                      "OpenSSL",
                    ].map((skill) => (
                      <Badge
                        key={skill}
                        className={themeClasses[theme].badge + " justify-center py-2"}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="frontend" className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "React.js, Angular",
                      "JavaScript (ES6+), TypeScript",
                      "HTML5, CSS3, Bootstrap, Tailwind CSS",
                      "Responsive & Mobile-First Design",
                      "Ajax, jQuery, Axios",
                    ].map((skill) => (
                      <Badge
                        key={skill}
                        className={themeClasses[theme].badge + " justify-center py-2"}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="backend" className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      ".NET Core (WebAPI, MVC)",
                      "C#, ASP.NET, Entity Framework",
                      "REST API Development",
                      "SignalR (Realtime Communication)",
                      "Message Queues (RabbitMQ)",
                      "Linux Server Administration (CentOS, Nginx)",
                    ].map((skill) => (
                      <Badge
                        key={skill}
                        className={themeClasses[theme].badge + " justify-center py-2"}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="database" className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "PostgreSQL",
                      "SQL Server",
                      "Entity Framework Core",
                      "Database Design & Optimization",
                      "Stored Procedures, Triggers",
                    ].map((skill) => (
                      <Badge
                        key={skill}
                        className={themeClasses[theme].badge + " justify-center py-2"}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
{/* Education Section */}
<section id="education" className="scroll-mt-20">
  <Card className={`${themeClasses[theme].card} mb-8`}>
    <CardHeader>
      <CardTitle className={themeClasses[theme].title}>Education</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div>
        <div className="flex justify-between mb-2">
          <div>
            <h3 className="font-medium text-lg">BSc in Computer Science and Engineering</h3>
            <p className="text-muted-foreground">American International University-Bangladesh (AIUB)</p>
          </div>
          <div className="text-right">
            <Badge variant="outline">2011 - 2015</Badge>
          </div>
        </div>
        <p className="text-muted-foreground">
          Cumulative GPA: 3.53 (out of 4.00)
        </p>
      </div>

      <Separator />

      <div>
        <div className="flex justify-between mb-2">
          <div>
            <h3 className="font-medium text-lg">Higher Secondary Certificate (HSC)</h3>
            <p className="text-muted-foreground">B.A.F. Shaheen College, Jashore</p>
          </div>
          <div className="text-right">
            <Badge variant="outline">2010</Badge>
          </div>
        </div>
        <p className="text-muted-foreground">
          Group: Science | GPA: 4.9
        </p>
      </div>

      <Separator />

      <div>
        <div className="flex justify-between mb-2">
          <div>
            <h3 className="font-medium text-lg">Secondary School Certificate (SSC)</h3>
            <p className="text-muted-foreground">Nakol R.C High School, Magura</p>
          </div>
          <div className="text-right">
            <Badge variant="outline">2008</Badge>
          </div>
        </div>
        <p className="text-muted-foreground">
          Group: Science | GPA: 5.00
        </p>
      </div>
    </CardContent>
  </Card>
</section>

{/* Personal Details Section */}
<section id="personal" className="scroll-mt-20">
  <Card className={`${themeClasses[theme].card} mb-8`} >
    <CardHeader>
      <CardTitle className={themeClasses[theme].title}>Personal Details</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-medium">Father's Name</p>
          <p className="text-muted-foreground">Sirajul Islam</p>
        </div>
        <div>
          <p className="font-medium">Mother's Name</p>
          <p className="text-muted-foreground">Saleha Begum</p>
        </div>
        <div>
          <p className="font-medium">Date of Birth</p>
          <p className="text-muted-foreground">October 05, 1993</p>
        </div>
        <div>
          <p className="font-medium">Gender</p>
          <p className="text-muted-foreground">Male</p>
        </div>
        <div>
          <p className="font-medium">Permanent Address</p>
          <p className="text-muted-foreground">
            Village: Ashapur, Post office: Nalia, Thana: Madhukhali, District: Faridpur
          </p>
        </div>
		 <div>
          <p className="font-medium">Nationality</p>
          <p className="text-muted-foreground">Bangladeshi</p>
        </div>
      </div>
    </CardContent>
  </Card>
</section>
          


          {/* Contact / Footer */}
          <Card className={`${themeClasses[theme].card} mb-12`}>
            <CardHeader>
              <CardTitle className={themeClasses[theme].title}>Contact Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={themeClasses[theme].textMuted}>
                Feel free to reach out via email, phone, or social media for
                opportunities or inquiries.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <a
                  href="mailto:mhrana.csse@gmail.com"
                  className={`px-4 py-2 border rounded ${themeClasses[theme].linkBtn} inline-flex items-center gap-2`}
                >
                  <Mail size={18} /> Email
                </a>
                <a
                  href="tel:+8801751339533"
                  className={`px-4 py-2 border rounded ${themeClasses[theme].linkBtn} inline-flex items-center gap-2`}
                >
                  <Phone size={18} /> Phone
                </a>
                <a
                  href="https://github.com/mhrana007"
                  target="_blank"
                  rel="noreferrer"
                  className={`px-4 py-2 border rounded ${themeClasses[theme].linkBtn} inline-flex items-center gap-2`}
                >
                  <Github size={18} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/mehedi-hasan-5b0921ba/"
                  target="_blank"
                  rel="noreferrer"
                  className={`px-4 py-2 border rounded ${themeClasses[theme].linkBtn} inline-flex items-center gap-2`}
                >
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
