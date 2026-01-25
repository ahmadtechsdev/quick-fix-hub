import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ArrowRight, Calendar, User, MapPin, FileText } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { services } from '@/data/services';
import { useToast } from '@/hooks/use-toast';

type BookingStep = 1 | 2 | 3;

interface BookingFormData {
  service: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

const initialFormData: BookingFormData = {
  service: '',
  fullName: '',
  phone: '',
  email: '',
  address: '',
  preferredDate: '',
  preferredTime: '',
  notes: '',
};

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<BookingStep>(1);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
  }, [searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData((prev) => ({ ...prev, service: serviceId }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.service) {
      toast({
        title: 'Please select a service',
        variant: 'destructive',
      });
      return;
    }
    if (step === 2) {
      if (!formData.fullName || !formData.phone || !formData.email || !formData.address) {
        toast({
          title: 'Please fill in all required fields',
          variant: 'destructive',
        });
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 3) as BookingStep);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1) as BookingStep);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual form service like Formspree)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setStep(3);
  };

  const selectedService = services.find((s) => s.id === formData.service);

  const steps = [
    { number: 1, title: 'Select Service', icon: FileText },
    { number: 2, title: 'Your Details', icon: User },
    { number: 3, title: 'Confirmation', icon: CheckCircle },
  ];

  return (
    <Layout>
      <section className="py-16 md:py-20">
        <div className="container-max section-padding">
          {/* Progress Steps */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        step >= s.number
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step > s.number ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <s.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium ${
                        step >= s.number ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 sm:w-24 h-0.5 mx-2 ${
                        step > s.number ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-2xl mx-auto">
            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-8">
                  What service do you need?
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.service === service.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <service.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{service.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            From {service.startingPrice}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <Button onClick={handleNext} variant="hero" size="lg" className="gap-2">
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Booking Form */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
                    Your Details
                  </h2>
                  {selectedService && (
                    <p className="text-muted-foreground">
                      Booking: <span className="text-primary font-medium">{selectedService.title}</span>
                    </p>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+254 700 000 000"
                        required
                      />
                    </div>
                  </div>

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
                    <Label htmlFor="address">Service Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street, Nairobi"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime">Preferred Time</Label>
                      <Input
                        id="preferredTime"
                        name="preferredTime"
                        type="time"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Describe your problem or any specific requirements..."
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <Button type="button" variant="ghost" onClick={handleBack} className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button type="submit" variant="hero" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="animate-fade-in text-center py-12">
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
                  Booking Submitted!
                </h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto mb-6">
                  Thank you for choosing HandymanAfrica. Our team will contact you shortly to confirm your appointment.
                </p>

                <div className="bg-card rounded-xl p-6 max-w-md mx-auto text-left shadow-soft mb-8">
                  <h4 className="font-semibold text-foreground mb-4">Booking Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Service:</span>
                      <span className="text-foreground font-medium">{selectedService?.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Name:</span>
                      <span className="text-foreground font-medium">{formData.fullName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Address:</span>
                      <span className="text-foreground font-medium">{formData.address}</span>
                    </div>
                    {formData.preferredDate && (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Date:</span>
                        <span className="text-foreground font-medium">
                          {formData.preferredDate} {formData.preferredTime && `at ${formData.preferredTime}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 max-w-md mx-auto">
                  <p className="text-sm text-foreground">
                    <strong>What's next?</strong> We'll call or WhatsApp you within 30 minutes to confirm your booking and discuss any details.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
