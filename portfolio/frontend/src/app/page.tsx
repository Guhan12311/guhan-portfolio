'use client';

import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import GitHubSection from '@/components/sections/GitHubSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ResumeSection from '@/components/sections/ResumeSection';
import AIAnalyzerSection from '@/components/sections/AIAnalyzerSection';
import ContactSection from '@/components/sections/ContactSection';
import ChatBot from '@/components/sections/ChatBot';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ServicesSection />
      <GitHubSection />
      <TestimonialsSection />
      <CertificationsSection />
      <ResumeSection />
      <AIAnalyzerSection />
      <ContactSection />
      <Footer />
      <ChatBot />
    </main>
  );
}
