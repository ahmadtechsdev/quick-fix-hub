import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeader from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
        <div className="container-max section-padding text-center">
          <SectionHeader
            label="What We Offer"
            title="Our Handyman Services"
            description="Professional, reliable, and affordable services for all your home and business needs."
          />
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24">
        <div className="container-max section-padding space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-elevated">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    {service.fullDescription}
                  </p>
                </div>

                {/* What's Included */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">What's Included:</h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                  <Link to={`/booking?service=${service.id}`}>
                    <Button variant="hero" className="gap-2">
                      Book Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/50">
        <div className="container-max section-padding text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
            Can't Find What You Need?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We offer many more services. Contact us to discuss your specific requirements.
          </p>
          <Link to="/contact">
            <Button variant="default" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
