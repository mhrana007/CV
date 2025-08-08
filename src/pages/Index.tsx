import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Github, Linkedin, Download, Menu, X, Globe, Facebook } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function CV() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Get the base URL for assets
  const baseUrl = import.meta.env.BASE_URL;
  
  // Function to download pre-made PDF file
  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = `${baseUrl}Mehedi_Hasan_CV.pdf`;
    link.download = 'Mehedi_Hasan_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to generate PDF from webpage
  const generatePDF = async () => {
    try {
      // Get the CV content div
      const element = document.getElementById('cv-content');
      if (!element) return;

      // Temporarily remove sticky positioning for better PDF generation
      const stickyElements = element.querySelectorAll('.sticky');
      stickyElements.forEach(el => {
        (el as HTMLElement).style.position = 'static';
        (el as HTMLElement).style.top = 'auto';
      });

      // Configure html2canvas options
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        height: element.scrollHeight,
        windowHeight: element.scrollHeight
      });

      // Restore sticky positioning
      stickyElements.forEach(el => {
        (el as HTMLElement).style.position = 'sticky';
        (el as HTMLElement).style.top = '2rem'; // top-8 = 2rem
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Calculate PDF dimensions
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // If content is too long, split into multiple pages
      if (imgHeight * ratio > pdfHeight) {
        const totalPages = Math.ceil(imgHeight * ratio / pdfHeight);
        
        for (let i = 1; i < totalPages; i++) {
          pdf.addPage();
          const yOffset = -pdfHeight * i;
          pdf.addImage(imgData, 'PNG', imgX, imgY + yOffset, imgWidth * ratio, imgHeight * ratio);
        }
      }

      pdf.save('Mehedi_Hasan_CV_Generated.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
      
      // Ensure sticky positioning is restored even if there's an error
      const element = document.getElementById('cv-content');
      if (element) {
        const stickyElements = element.querySelectorAll('.sticky');
        stickyElements.forEach(el => {
          (el as HTMLElement).style.position = 'sticky';
          (el as HTMLElement).style.top = '2rem';
        });
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Md. Mehedi Hasan</h2>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white shadow-md p-4">
          <div className="flex flex-col space-y-2">
            <a href="#about" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#experience" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Experience</a>
            <a href="#skills" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Skills</a>
            <a href="#education" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Education</a>
            <a href="#contact" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 pt-8 md:pt-16 pb-16" id="cv-content">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar - Profile Information */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-8">
              <Card className="border-none shadow-lg">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src={`${baseUrl}Mehedi.jpg`}
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold">Md. Mehedi Hasan</CardTitle>
                  <p className="text-muted-foreground mt-1">Sr. Software Engineer</p>
                  
                  <div className="flex justify-center mt-4 space-x-2">
                    <Button size="icon" variant="ghost" aria-label="GitHub" onClick={() => window.open('https://github.com/mhrana007', '_blank')}>
                      <Github className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label="LinkedIn" onClick={() => window.open('https://www.linkedin.com/in/mehedi-hasan-5b0921ba/', '_blank')}>
                      <Linkedin className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label="Facebook" onClick={() => window.open('https://www.facebook.com/mehedi.rana.90', '_blank')}>
                      <Facebook className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Separator className="my-4" />
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 mr-3 mt-1 text-muted-foreground" />
                      <span>mhrana.csse@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span>+8801751339533</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-3 mt-1 text-muted-foreground" />
                      <span>Faridpur, Bangladesh</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span>Bangladeshi</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-6">
                    <Button variant="outline" className="w-full" onClick={downloadPDF}>
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                    <Button variant="outline" className="w-full" onClick={generatePDF}>
                      <Download className="mr-2 h-4 w-4" /> Generate PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation - Desktop Only */}
              <div className="hidden md:block mt-8">
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <nav className="space-y-2">
                      <a href="#about" className="flex px-4 py-2 hover:bg-gray-100 rounded-md">About</a>
                      <a href="#experience" className="flex px-4 py-2 hover:bg-gray-100 rounded-md">Experience</a>
                      <a href="#skills" className="flex px-4 py-2 hover:bg-gray-100 rounded-md">Skills</a>
                      <a href="#education" className="flex px-4 py-2 hover:bg-gray-100 rounded-md">Education</a>
                      <a href="#contact" className="flex px-4 py-2 hover:bg-gray-100 rounded-md">Contact</a>
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-8 lg:col-span-9 space-y-8 pt-16 md:pt-0">
            {/* About Section */}
            <section id="about" className="scroll-mt-20">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    I am a Senior Software Engineer with experience delivering scalable, secure, and high-performance software solutions.
					My expertise covers both back-end and front-end development, specializing in .NET Core, Microservices, Angular and PostgreSQL.
					I have successfully led projects in IoT platforms, API integrations, and enterprise systems, combining strong technical proficiency with
					problem-solving and leadership skills..
                  </p>
                </CardContent>
              </Card>
            </section>
            
            {/* Experience Section */}
            <section id="experience" className="scroll-mt-20">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-lg">Sr. Software Engineer</h3>
                        <p className="text-muted-foreground">Surbana Jurong</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">May 2023 - Present</Badge>
                      </div>
                    </div>
					<p className="text-muted-foreground mb-2">
				  At <strong>Surbana Jurong Bangladesh Ltd.</strong>, I am responsible for the design, development, and optimization of large-scale 
				  <strong> IoT-based smart city solutions</strong>.
					</p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      <li>Leading <strong>R&D</strong> for the <strong>HDB Smart Lighting Platform</strong>, enabling centralized monitoring and control of smart lighting systems.</li>
					  <li>Implementing <strong>.NET Core 8 microservices</strong> and <strong>PostgreSQL</strong> databases for scalable and secure solutions.</li>
					  <li>Configuring and integrating <strong>EMQX MQTT broker</strong> for real-time device communication.</li>
					  <li>Ensuring system security through <strong>HDB IAM</strong> and <strong>WOD ADFS</strong> authentication, and API hardening.</li>
					  <li>Reviewing and optimizing source code to maintain <strong>clean architecture</strong> and high-quality standards.</li>
					  <li>Collaborating with cross-functional teams to align technical solutions with business requirements.</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  <div>
				  <div className="flex justify-between mb-2">
				  <div>
					<h3 className="font-medium text-lg">Sr. Software Engineer</h3>
					<p className="text-muted-foreground">Masco Group</p>
				  </div>
				  <div className="text-right">
					<Badge variant="outline">Nov 2016 - May 2023</Badge>
				  </div>
				</div>
				<p className="text-muted-foreground mb-2">
				  At <strong>Masco Group</strong>, I contributed to the design, development, and maintenance of enterprise-scale applications, 
				  with a focus on <strong>ERP, e-commerce, and internal automation systems</strong>. Key responsibilities included:
				</p>
				<ul className="list-disc pl-5 text-muted-foreground space-y-1">
				  <li>Developed and enhanced <strong>Masco Bazar</strong> e-commerce platform, including admin panel, order management, and real-time chat integration.</li>
				  <li>Built ERP modules for <strong>Merchandising, Supply Chain, and Knitting</strong> using ASP.NET MVC, C#, and SQL Server.</li>
				  <li>Created responsive web interfaces with <strong>Angular, React, JavaScript, and Bootstrap</strong> for enterprise applications.</li>
				  <li>Designed and integrated <strong>REST APIs</strong> for seamless system interoperability.</li>
				  <li>Implemented <strong>Crystal Reports</strong> and <strong>RDLC</strong> for advanced reporting and analytics.</li>
				  <li>Optimized database performance for <strong>SQL Server</strong> to handle high transaction loads.</li>
				  <li>Reviewed source code to ensure clean architecture and high-quality standards.</li>
				</ul>

				  </div>                  
                  
                  <Separator />
                  <div>
                  <div className="flex justify-between mb-2">
				  <div>
					<h3 className="font-medium text-lg">Software Engineer</h3>
					<p className="text-muted-foreground">Advanced Software and IT Service</p>
				  </div>
				  <div className="text-right">
					<Badge variant="outline">Oct 2015 - Oct 2016</Badge>
				  </div>
				</div>
				<p className="text-muted-foreground mb-2">
				  At <strong>Advanced Software and IT Service</strong>, I was involved in the design and development of enterprise and 
				  client-focused software solutions, with a focus on CRM and security management systems. Key responsibilities included:
				</p>
				<ul className="list-disc pl-5 text-muted-foreground space-y-1">
				  <li>Developed <strong>DealerCRM</strong> for US-based automotive dealerships to manage vehicle inventory and customer leads.</li>
				  <li>Built <strong>KONDOLINK</strong> security management software for clients in Canada and the USA using .NET Core and Angular.</li>
				  <li>Designed and implemented responsive front-end components with Angular, JavaScript, and Bootstrap.</li>
				  <li>Integrated REST APIs for seamless data exchange between systems.</li>
				  <li>Conducted code reviews to ensure maintainability, scalability, and adherence to best practices.</li>
				</ul>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            {/* Skills Section */}
            <section id="skills" className="scroll-mt-20">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="technical">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="technical">Technical</TabsTrigger>
					  <TabsTrigger value="frontend">Frontend</TabsTrigger>
                      <TabsTrigger value="backend">Backend</TabsTrigger>                      
					  <TabsTrigger value="database">Database</TabsTrigger>
                    </TabsList>
                    <TabsContent value="technical" className="mt-3">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <Badge className="justify-center py-2">Object-Oriented Programming (OOP)</Badge>
                        <Badge className="justify-center py-2">Microservices Architecture</Badge>
						<Badge className="justify-center py-2">AWS</Badge>
                        <Badge className="justify-center py-2">CQRS Pattern</Badge>
                        <Badge className="justify-center py-2">API Design & Integration (REST)</Badge>
                        <Badge className="justify-center py-2">Authentication & Authorization (OIDC,SAML)</Badge>
                        <Badge className="justify-center py-2">Docker & Containerization</Badge>
                        <Badge className="justify-center py-2">Real-time Messaging (MQTT, EMQX)</Badge>
                        <Badge className="justify-center py-2">Version Control (Git,GitHub, Bitbucket,SVN)</Badge>
						<Badge className="justify-center py-2">OpenSSL</Badge>
                      </div>
                    </TabsContent>
                    <TabsContent value="backend" className="mt-3">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <Badge className="justify-center py-2">C#, ASP.NET MVC, .NET Core</Badge>
                        <Badge className="justify-center py-2">Web API & Microservices Development</Badge>
						<Badge className="justify-center py-2">Entity Framework, Dapper, ADO.NET</Badge>
						<Badge className="justify-center py-2">Reporting Tools (RDLC, Crystal Reports)</Badge>
                      </div>
                    </TabsContent>
                    <TabsContent value="frontend" className="mt-3">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <Badge className="justify-center py-2">React.js, Angular</Badge>
                        <Badge className="justify-center py-2">JavaScript (ES6+), TypeScript</Badge>
                        <Badge className="justify-center py-2">HTML5, CSS3, Bootstrap, Tailwind CSS</Badge>
                        <Badge className="justify-center py-2">Responsive & Mobile-First Design</Badge>
                        <Badge className="justify-center py-2">Ajax, jQuery, Axios</Badge>
                      </div>
                    </TabsContent>
					<TabsContent value="database" className="mt-3">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <Badge className="justify-center py-2">PostgreSQL</Badge>
                        <Badge className="justify-center py-2">Microsoft SQL Server (2008–2016)</Badge>
                        <Badge className="justify-center py-2">Database Design & Optimization</Badge>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>
            
            {/* Education Section */}
            <section id="education" className="scroll-mt-20">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
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
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
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
                      <p className="text-muted-foreground">Village: Ashapur, Post office: Nalia, Thana: Madhukhali, District: Faridpur</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            {/* Contact Section */}
            <section id="contact" className="scroll-mt-20">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Get In Touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Feel free to reach out for collaborations or just a friendly chat.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Contact Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                          <span>mhrana.csse@gmail.com</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                          <span>+8801751339533</span>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-3 mt-1 text-muted-foreground" />
                          <span>Faridpur, Bangladesh</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Social Profiles</h3>
                      <div className="flex space-x-3">
                        <Button variant="outline" size="icon" onClick={() => window.open('https://github.com/mhrana007', '_blank')}>
                          <Github className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => window.open('https://www.linkedin.com/in/mehedi-hasan-5b0921ba/', '_blank')}>
                          <Linkedin className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => window.open('https://www.facebook.com/mehedi.rana.90', '_blank')}>
                          <Facebook className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}