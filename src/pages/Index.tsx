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
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  Download,
  Facebook,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

const summary =
  "Full-stack Software Engineer specializing in enterprise-grade web applications, microservices, AI chatbot platforms, and cloud-integrated systems. Strong experience in .NET Core, React, Angular, Next.js, FastAPI, PostgreSQL, SQL Server, MongoDB, and AWS services. Skilled in building secure, scalable, multi-tenant applications with JWT/SSO authentication, role-based access control, streaming AI chat, knowledge retrieval, and automation workflows. Experienced in delivering business-critical systems for smart infrastructure, security management, ERP, eCommerce, and Town Council operations.";

const skillGroups = {
  backend: [
    "C#",
    ".NET Core",
    "ASP.NET MVC",
    "FastAPI",
    "Python",
    "Microservices",
    "REST APIs",
    "Entity Framework",
    "Dapper",
  ],
  frontend: [
    "React",
    "Angular",
    "Next.js 15",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "jQuery",
    "Bootstrap",
    "HTML5",
    "CSS3",
  ],
  cloudAi: [
    "Amazon Bedrock",
    "Strands Agents",
    "Amazon Lex",
    "Knowledge Base",
    "AWS Lambda",
    "API Gateway",
    "ECS/Fargate",
    "AWS CDK",
    "CloudWatch",
  ],
  database: [
    "SQL Server",
    "PostgreSQL",
    "MongoDB",
    "DocumentDB",
    "Redis",
    "Valkey",
  ],
  security: [
    "JWT",
    "SSO",
    "OAuth 2.0",
    "OIDC",
    "SAML",
    "OpenIddict",
    "RBAC",
    "Audit logging",
  ],
  tools: [
    "Git",
    "Docker",
    "PowerShell deployment scripts",
    "OpenSSL",
    "MQTTX",
    "EMQX",
    "MCP Servers",
    "Visual Studio",
    "RDLC",
    "Crystal Reports",
  ],
};

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "Xtroit",
    period: "July 2025 - Present",
    bullets: [
      "Built and maintained AI SMART Assistance, a secure multi-tenant AI chatbot platform for Town Council operations using Next.js, FastAPI, Amazon Bedrock, and Strands Agents.",
      "Implemented streaming AI chat responses, session management, chat history restoration, file upload, and tool execution progress tracking.",
      "Integrated MCP-based tools for knowledge base retrieval, database querying, case retrieval, PDF extraction, noticeboard access, and building maintenance workflows.",
      "Developed tenant-aware runtime configuration for tools, models, security settings, business rules, and user access control.",
      "Implemented JWT/SSO authentication, RBAC authorization, audit logging, and secure tenant/user context propagation.",
      "Worked on AWS deployment architecture using ECS/Fargate, Lambda, API Gateway, CDK, CloudWatch, and PowerShell automation.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Surbana Jurong Bangladesh Ltd.",
    period: "May 2023 - June 2025",
    bullets: [
      "Developed cloud-integrated smart infrastructure solutions using .NET Core, React, PostgreSQL, Docker, OpenIddict, MQTTX, EMQX, and microservice-based architecture.",
      "Contributed to the HDB Smart Lighting Platform for Singapore's Housing & Development Board, supporting smart lighting management, motion traffic statistics, and operational insights.",
      "Designed and reviewed backend services, APIs, and frontend modules to improve system maintainability and code quality.",
      "Worked on secure authentication, IoT data communication, and scalable service integration for Town Council and smart infrastructure use cases.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Masco Group",
    period: "November 2016 - May 2023",
    bullets: [
      "Led development of ERP, eCommerce, admin panel, and chat application features using .NET Core, ASP.NET MVC, Angular, React, PostgreSQL, and SQL Server.",
      "Developed garments ERP modules including merchandising, supply chain, knitting, reporting, and business workflow management.",
      "Built and maintained Masco Bazar, an online platform for daily commodity sales with admin management and customer-facing features.",
      "Created reports using RDLC and Crystal Reports and optimized database queries for business analytics and operational reporting.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Advanced Software and IT Service",
    period: "October 2015 - October 2016",
    bullets: [
      "Developed CRM and ERP modules using ASP.NET MVC, C#, JavaScript, jQuery, and SQL Server.",
      "Worked on DealerCRM, supporting vehicle inventory management and customer lead tracking for car dealerships and finance providers.",
    ],
  },
];

const projects = [
  {
    name: "AI SMART Assistance",
    description:
      "Secure Town Council AI chatbot platform with streaming AI chat, tenant-aware tool/model configuration, JWT/SSO authentication, MCP tool integrations, admin dashboards, chat history, file upload, and cloud deployment automation.",
    stack: "Next.js 15, FastAPI, Amazon Bedrock, Strands Agents, MongoDB/DocumentDB, AWS",
  },
  {
    name: "HDB Smart Lighting Platform",
    description:
      "Centralized smart lighting management platform for HDB and Town Councils to manage vendor-based lighting systems, motion traffic statistics, heat map metrics, and maintenance planning support.",
    stack: "React, .NET Core 6, Microservices, OpenIddict, PostgreSQL, MQTTX, EMQX, OpenSSL, Docker",
  },
  {
    name: "KONDOLINK",
    description:
      "Web-based security management platform for building operations, supporting clients including SMS Security Canada and MAGNUM Security USA.",
    stack: ".NET Core, Angular, SQL Server",
  },
  {
    name: "ERP & eCommerce Systems",
    description:
      "ERP, eCommerce, admin panel, reporting, and chat application features for Masco Group and Masco Bazar.",
    stack: ".NET Core, ASP.NET MVC, Angular, React, PostgreSQL, SQL Server, RDLC, Crystal Reports",
  },
];

const education = [
  {
    degree: "M.Sc. in Computer Science",
    institution: "Jahangirnagar University",
    year: "2017",
    result: "CGPA: 3.35/4.00",
  },
  {
    degree: "B.Sc. in Computer Science and Software Engineering (CSSE)",
    institution: "American International University-Bangladesh (AIUB)",
    year: "2015",
    result: "CGPA: 3.53/4.00",
  },
];

export default function ModernCV() {
  const baseUrl = import.meta.env.BASE_URL;

  const themeClasses = {
    bg: "bg-slate-50",
    card: "bg-white shadow-sm border border-slate-200",
    title: "text-slate-950",
    subtitle: "text-cyan-700",
    textMuted: "text-slate-700",
    badge:
      "bg-slate-100 text-slate-800 hover:bg-cyan-700 hover:text-white transition-colors duration-200",
    linkBtn:
      "text-cyan-700 border border-cyan-700 hover:bg-cyan-700 hover:text-white",
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = `${baseUrl}Mehedi_Hasan_CV.pdf`;
    link.download = "Mehedi_Hasan_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`${themeClasses.bg} min-h-screen py-8 px-4`}>
      <div className="max-w-5xl mx-auto">
        <Card className={`${themeClasses.card} mb-6 overflow-hidden`}>
          <CardHeader className="bg-white">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden border border-slate-300 shadow-sm">
                <img
                  src={`${baseUrl}Mehedi.jpg`}
                  alt="Mehedi Hasan Profile"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1
                  className={`text-4xl font-extrabold leading-tight mb-2 ${themeClasses.title}`}
                >
                  Mehedi Hasan
                </h1>
                <p
                  className={`text-xl font-semibold mb-4 ${themeClasses.subtitle}`}
                >
                  Senior Full-Stack Engineer | AI Chatbot & Cloud Integration
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-3 text-sm text-slate-600">
                  <a
                    href="mailto:mhrana.csse@gmail.com"
                    className="inline-flex items-center gap-2 hover:text-cyan-700"
                  >
                    <Mail size={15} />
                    mhrana.csse@gmail.com
                  </a>
                  <a
                    href="tel:+8801751339533"
                    className="inline-flex items-center gap-2 hover:text-cyan-700"
                  >
                    <Phone size={15} />
                    +8801751339533
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mehedi-hasan-5b0921ba/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-cyan-700"
                  >
                    <Linkedin size={15} />
                    linkedin.com/in/mehedi-hasan-5b0921ba
                  </a>
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={15} />
                    Bangladesh
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap justify-center md:justify-start items-center gap-3">
                  <a
                    href="https://github.com/mhrana007"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Profile"
                    className="inline-flex h-10 w-10 items-center justify-center rounded border border-slate-300 text-slate-700 hover:border-cyan-700 hover:text-cyan-700"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mehedi-hasan-5b0921ba/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn Profile"
                    className="inline-flex h-10 w-10 items-center justify-center rounded border border-slate-300 text-slate-700 hover:border-cyan-700 hover:text-cyan-700"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="https://www.facebook.com/mehedi.rana.90"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook Profile"
                    className="inline-flex h-10 w-10 items-center justify-center rounded border border-slate-300 text-slate-700 hover:border-cyan-700 hover:text-cyan-700"
                  >
                    <Facebook size={18} />
                  </a>
                  <button
                    onClick={downloadPDF}
                    className={`inline-flex items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors ${themeClasses.linkBtn}`}
                  >
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div id="cv-content">
          <Card className={`${themeClasses.card} mb-6`}>
            <CardHeader>
              <CardTitle className={themeClasses.title}>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`leading-7 ${themeClasses.textMuted}`}>{summary}</p>
            </CardContent>
          </Card>

          <Card className={`${themeClasses.card} mb-6`}>
            <CardHeader>
              <CardTitle className={themeClasses.title}>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="backend">
                <TabsList className="grid h-auto w-full grid-cols-2 md:grid-cols-6">
                  <TabsTrigger value="backend" className="gap-1">
                    <Code2 size={14} />
                    Backend
                  </TabsTrigger>
                  <TabsTrigger value="frontend" className="gap-1">
                    <Globe size={14} />
                    Frontend
                  </TabsTrigger>
                  <TabsTrigger value="cloudAi" className="gap-1">
                    <BrainCircuit size={14} />
                    Cloud & AI
                  </TabsTrigger>
                  <TabsTrigger value="database" className="gap-1">
                    <Database size={14} />
                    Database
                  </TabsTrigger>
                  <TabsTrigger value="security" className="gap-1">
                    <ShieldCheck size={14} />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="gap-1">
                    <Cloud size={14} />
                    Tools
                  </TabsTrigger>
                </TabsList>

                {Object.entries(skillGroups).map(([key, skills]) => (
                  <TabsContent key={key} value={key} className="mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          className={`${themeClasses.badge} justify-center rounded py-2 text-center`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Card className={`${themeClasses.card} mb-6`}>
            <CardHeader>
              <CardTitle className={themeClasses.title}>Professional Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {experiences.map((item, index) => (
                <div key={`${item.company}-${item.period}`}>
                  <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                    <div className="md:w-64 mb-3 md:mb-0">
                      <div className="inline-flex items-center gap-2 text-cyan-700 mb-2">
                        <BriefcaseBusiness size={16} />
                        <span className="text-sm font-semibold">{item.period}</span>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-950">
                        {item.role}
                      </h3>
                      <p className={`font-medium ${themeClasses.subtitle}`}>
                        {item.company}
                      </p>
                    </div>
                    <ul className={`flex-1 list-disc pl-5 space-y-2 ${themeClasses.textMuted}`}>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                  {index < experiences.length - 1 && <Separator className="mt-8" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className={`${themeClasses.card} mb-6`}>
            <CardHeader>
              <CardTitle className={themeClasses.title}>Key Projects</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="rounded border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="font-semibold text-slate-950">{project.name}</h3>
                  <p className={`mt-2 text-sm leading-6 ${themeClasses.textMuted}`}>
                    {project.description}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                    Tech stack
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{project.stack}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className={`${themeClasses.card} mb-6`}>
            <CardHeader>
              <CardTitle className={themeClasses.title}>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {education.map((item, index) => (
                <div key={item.degree}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-medium text-lg text-slate-950">
                        {item.degree}
                      </h3>
                      <p className="text-slate-600">{item.institution}</p>
                      <p className="text-slate-600">{item.result}</p>
                    </div>
                    <Badge variant="outline" className="w-fit rounded">
                      {item.year}
                    </Badge>
                  </div>
                  {index < education.length - 1 && <Separator className="mt-5" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className={`${themeClasses.card} mb-12`}>
            <CardHeader>
              <CardTitle className={themeClasses.title}>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={themeClasses.textMuted}>
                Available for senior full-stack engineering, AI chatbot, cloud
                integration, and enterprise application development opportunities.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="mailto:mhrana.csse@gmail.com"
                  className={`inline-flex items-center gap-2 rounded px-4 py-2 ${themeClasses.linkBtn}`}
                >
                  <Mail size={18} />
                  Email
                </a>
                <a
                  href="tel:+8801751339533"
                  className={`inline-flex items-center gap-2 rounded px-4 py-2 ${themeClasses.linkBtn}`}
                >
                  <Phone size={18} />
                  Phone
                </a>
                <a
                  href="https://github.com/mhrana007"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded px-4 py-2 ${themeClasses.linkBtn}`}
                >
                  <Github size={18} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/mehedi-hasan-5b0921ba/"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded px-4 py-2 ${themeClasses.linkBtn}`}
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
