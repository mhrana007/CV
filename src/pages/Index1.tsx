import { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Download, Menu, X, Globe, Facebook } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function CV() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = `${baseUrl}Mehedi_Hasan_CV.pdf`;
    link.download = 'Mehedi_Hasan_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePDF = async () => {
    try {
      const element = document.getElementById('cv-content');
      if (!element) return;

      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
      const imgX = (pdfWidth - canvas.width * ratio) / 2;
      let imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, canvas.width * ratio, canvas.height * ratio);
      pdf.save('Mehedi_Hasan_CV_Generated.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Md. Mehedi Hasan</h2>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 bg-white shadow p-4 space-y-2 z-40">
          <a href="#about" className="block hover:bg-gray-100 p-2 rounded" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#experience" className="block hover:bg-gray-100 p-2 rounded" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          <a href="#skills" className="block hover:bg-gray-100 p-2 rounded" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#education" className="block hover:bg-gray-100 p-2 rounded" onClick={() => setMobileMenuOpen(false)}>Education</a>
          <a href="#contact" className="block hover:bg-gray-100 p-2 rounded" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      )}

      <div id="cv-content" className="max-w-5xl mx-auto grid md:grid-cols-[280px_1fr] gap-6 px-4 md:px-0 pt-16 md:pt-8">
        {/* Sidebar */}
        <aside className="bg-gray-50 border-r border-gray-200 p-6 space-y-6">
          <div className="text-center">
            <img
              src={`${baseUrl}Mehedi.jpg`}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full object-cover border-2 border-gray-300"
            />
            <h1 className="text-2xl font-bold mt-4">Md. Mehedi Hasan</h1>
            <p className="text-sm text-gray-500">Sr. Software Engineer</p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center"><Mail className="h-4 w-4 mr-2" /> mhrana.csse@gmail.com</div>
            <div className="flex items-center"><Phone className="h-4 w-4 mr-2" /> +8801751339533</div>
            <div className="flex items-start"><MapPin className="h-4 w-4 mr-2 mt-0.5" /> Faridpur, Bangladesh</div>
            <div className="flex items-center"><Globe className="h-4 w-4 mr-2" /> Bangladeshi</div>
          </div>

          <div className="flex space-x-2">
            <Button size="icon" variant="outline" onClick={() => window.open('https://github.com/mhrana007', '_blank')}>
              <Github className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => window.open('https://www.linkedin.com/in/mehedi-hasan-5b0921ba/', '_blank')}>
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => window.open('https://www.facebook.com/mehedi.rana.90', '_blank')}>
              <Facebook className="h-5 w-5" />
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Skills</h3>
            <ul className="space-y-1 text-sm">
              <li>Object-Oriented Programming (OOP)</li>
              <li>Microservices Architecture</li>
              <li>API Design & Integration</li>
              <li>Docker & Containerization</li>
              <li>Authentication & Authorization</li>
              <li>PostgreSQL & SQL Server</li>
              <li>React.js & Angular</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={downloadPDF}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button variant="outline" className="w-full" onClick={generatePDF}>
              <Download className="mr-2 h-4 w-4" /> Generate PDF
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="space-y-6">
          <section id="about">
            <h2 className="text-xl font-bold border-b border-gray-200 pb-1">About Me</h2>
            <p className="mt-2 text-sm text-gray-700">
              I am a Senior Software Engineer with experience delivering scalable, secure, and high-performance software solutions...
            </p>
          </section>

          <section id="experience">
            <h2 className="text-xl font-bold border-b border-gray-200 pb-1">Work Experience</h2>
            <div className="mt-4 space-y-5">
              {/* Repeat for each job */}
              <div>
                <div className="flex justify-between">
                  <h3 className="font-semibold">Sr. Software Engineer – Surbana Jurong</h3>
                  <Badge variant="outline">May 2023 - Present</Badge>
                </div>
                <ul className="list-disc list-inside text-sm mt-2 text-gray-700 space-y-1">
                  <li>Leading R&D for the HDB Smart Lighting Platform...</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="education">
            <h2 className="text-xl font-bold border-b border-gray-200 pb-1">Education</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex justify-between">
                <span>BSc in Computer Science – AIUB</span>
                <Badge variant="outline">2011 - 2015</Badge>
              </div>
            </div>
          </section>

          <section id="contact">
            <h2 className="text-xl font-bold border-b border-gray-200 pb-1">Contact</h2>
            <p className="mt-2 text-sm">Feel free to reach out for collaborations or just a friendly chat.</p>
          </section>
        </main>
      </div>
    </div>
  );
}
