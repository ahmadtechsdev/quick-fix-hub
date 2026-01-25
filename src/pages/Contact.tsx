import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeader from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '+254 700 000 000',
    href: 'tel:+254700000000',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@handymanafrica.com',
    href: 'mailto:info@handymanafrica.com',
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'Nairobi, Kenya',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Mon - Sat: 7AM - 8PM',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message sent!',
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const whatsappNumber = '254700000000';
  const whatsappMessage = encodeURIComponent('Hello! I have a question about your services.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
        <div className="container-max section-padding text-center">
          <SectionHeader
            label="Get in Touch"
            title="Contact Us"
            description="Have questions or need a quote? We're here to help. Reach out through any channel."
          />
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground">
                  We're always ready to hear from you. Whether you need a quick fix or a major project, 
                  our team is here to provide solutions.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="bg-card rounded-xl p-5 shadow-soft"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.content}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-[#25D366]/10 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" fill="white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">Chat on WhatsApp</h4>
                    <p className="text-sm text-muted-foreground">Get quick responses via WhatsApp</p>
                  </div>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="whatsapp">
                      Chat Now
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft">
              <h3 className="font-display font-bold text-xl text-foreground mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+254 700 000 000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-max section-padding">
          <SectionHeader
            label="FAQ"
            title="Frequently Asked Questions"
          />

          <div className="grid md:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
            {[
              {
                q: 'How quickly can you respond to service requests?',
                a: 'We aim to respond within 30 minutes during business hours. For emergencies, we offer same-day service.',
              },
              {
                q: 'Do I need to create an account to book?',
                a: 'No account needed! Simply fill out our booking form and we\'ll take care of the rest.',
              },
              {
                q: 'What areas do you serve?',
                a: 'We currently serve Nairobi and its surrounding areas. We\'re expanding to more regions soon.',
              },
              {
                q: 'Are your handymen verified?',
                a: 'Yes, all our professionals undergo thorough background checks and skill verification.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-soft">
                <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
