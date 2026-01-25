import { Star, Quote } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const testimonials = [
  {
    name: 'Sarah Kimani',
    role: 'Homeowner, Nairobi',
    content: 'HandymanAfrica saved me when my plumbing burst at midnight. They arrived within the hour and fixed everything. Highly professional!',
    rating: 5,
    avatar: 'SK',
  },
  {
    name: 'James Oduya',
    role: 'Business Owner',
    content: 'We use them for all our office maintenance. Their electricians are certified and always on time. Great value for money.',
    rating: 5,
    avatar: 'JO',
  },
  {
    name: 'Mary Wanjiku',
    role: 'Property Manager',
    content: 'Managing 50+ units means constant repairs. HandymanAfrica handles everything efficiently. They\'re now our go-to service provider.',
    rating: 5,
    avatar: 'MW',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container-max section-padding">
        <SectionHeader
          label="Testimonials"
          title="What Our Customers Say"
          description="Don't just take our word for it. Here's what our satisfied customers have to say."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-soft card-hover relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-semibold text-primary">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
