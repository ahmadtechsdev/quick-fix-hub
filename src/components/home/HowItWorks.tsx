import { ClipboardList, Calendar, CheckCircle } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const steps = [
  {
    icon: ClipboardList,
    title: 'Select Your Service',
    description: 'Browse our services and choose what you need. From electrical to plumbing, we\'ve got you covered.',
    step: '01',
  },
  {
    icon: Calendar,
    title: 'Book Your Appointment',
    description: 'Pick a convenient date and time. Fill in your details and any special requirements.',
    step: '02',
  },
  {
    icon: CheckCircle,
    title: 'Get It Done',
    description: 'Our verified professional arrives on time and completes the job to your satisfaction.',
    step: '03',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container-max section-padding">
        <SectionHeader
          label="How It Works"
          title="Book in 3 Simple Steps"
          description="Getting a handyman has never been easier. Just follow these simple steps."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-card rounded-2xl p-8 shadow-soft card-hover"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-8">
                <span className="font-display font-bold text-5xl text-primary/10">
                  {step.step}
                </span>
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <step.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
