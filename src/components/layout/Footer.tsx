import { Link } from 'react-router-dom';
import { Wrench, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    'Electrical Services',
    'Plumbing',
    'AC & Repairs',
    'Carpentry',
    'Painting',
    'Installations',
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Book Now', path: '/booking' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container-max section-padding py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                Handyman<span className="text-primary">Africa</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Your trusted partner for all handyman services. Fast, reliable, and affordable solutions for your home and business.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-background/70 hover:text-primary text-sm transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-primary" />
                <div className="space-y-1">
                  <a href="tel:+2349043400000" className="text-background/70 hover:text-primary text-sm transition-colors block">
                    +234 (0) 904 340 0000
                  </a>
                  <a href="tel:+2349162189362" className="text-background/70 hover:text-primary text-sm transition-colors block">
                    +234 (0) 916 218 9362
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-primary" />
                <a href="mailto:handymanafrica@gmail.com" className="text-background/70 hover:text-primary text-sm transition-colors">
                  handymanafrica@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-primary" />
                <span className="text-background/70 text-sm">
                  No. 16 Ademola Adetokumbo Crescent, Wuse II, Abuja
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              © {currentYear} HandymanAfrica. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-background/50 hover:text-background text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-background/50 hover:text-background text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
