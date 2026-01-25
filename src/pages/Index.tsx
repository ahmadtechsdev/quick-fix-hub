import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import PopularServices from '@/components/home/PopularServices';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <PopularServices />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
