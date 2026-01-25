import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import MobileBookingCTA from '../common/MobileBookingCTA';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBookingCTA />
    </div>
  );
};

export default Layout;
