import { Link } from 'react-router-dom';
import { Shield, Clock, BadgeCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrustBadge from '../common/TrustBadge';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-max section-padding py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <TrustBadge icon={Shield} text="Verified Professionals" />
              <TrustBadge icon={Clock} text="Fast Response" />
              <TrustBadge icon={BadgeCheck} text="Affordable Pricing" />
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                Book Trusted Handymen{' '}
                <span className="text-gradient">in Minutes</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Fast, reliable, and affordable handyman services for your home and business. 
                No hassle, no waiting – just quality work, guaranteed.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking">
                <Button variant="hero" size="xl" className="gap-2 group">
                  Book a Handyman
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="xl">
                  View Services
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="font-display font-bold text-3xl text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Jobs Completed</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="font-display font-bold text-3xl text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Expert Handymen</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="font-display font-bold text-3xl text-foreground">4.9★</p>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:order-last animate-fade-in">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main Image Container */}
              <div className="absolute inset-4 rounded-3xl gradient-hero floating-shadow overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=600&fit=crop"
                  alt="Professional handyman at work"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <p className="font-display font-bold text-2xl">Professional</p>
                    <p className="font-display font-bold text-2xl">Service</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-2 -right-2 bg-card rounded-2xl p-4 shadow-elevated animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Verified</p>
                    <p className="text-xs text-muted-foreground">All Professionals</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-2 bg-card rounded-2xl p-4 shadow-elevated animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Same Day</p>
                    <p className="text-xs text-muted-foreground">Service Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
