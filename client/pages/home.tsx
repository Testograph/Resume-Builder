'use client';
import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/sections/Hero';
import LogoSection from '@/components/home/sections/Logo';
import StatsSection from '@/components/home/sections/Stats';
import Pricing from '@/components/home/sections/Pricing';
import Testimonial from '@/components/home/sections/Testimonial';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'modals', 'landing'])),
  },
});

const Home: NextPage = () => (
  <div>
    <main className="relative isolate mb-[450px] overflow-hidden bg-zinc-50">
      <Header />
      {/* Hero */}
      <HeroSection />

      {/* Statistics */}
      <StatsSection />
      <Pricing />
      <Testimonial />
    </main>

    <Footer />
  </div>
);

export default Home;
