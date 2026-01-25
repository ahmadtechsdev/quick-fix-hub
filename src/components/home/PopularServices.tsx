import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeader from '../common/SectionHeader';
import { services } from '@/data/services';

const PopularServices = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-max section-padding">
        <SectionHeader
          label="Our Services"
          title="Popular Handyman Services"
          description="From quick fixes to major projects, we've got the expertise to handle it all."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services#${service.id}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft card-hover"
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur-sm flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {service.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold text-sm">
                    From {service.startingPrice}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services">
            <Button variant="outline" size="lg" className="gap-2">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
