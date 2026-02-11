import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ArrowRight, Calendar as CalendarIcon, User, MapPin, FileText, Clock } from 'lucide-react';
import { format } from 'date-fns';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
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
    setStep(2);
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

    const serviceName = selectedService?.title || formData.service;
    const dateFormatted = formData.preferredDate
      ? format(new Date(formData.preferredDate), 'MMMM d, yyyy')
      : 'Not specified';
    const timeFormatted = formData.preferredTime || 'Not specified';

    // 1. Submit to Formspree
    try {
      await fetch('https://formspree.io/f/xaqdqowy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Service: serviceName,
          'Full Name': formData.fullName,
          'Phone Number': formData.phone,
          'Email Address': formData.email,
          'Service Address': formData.address,
          'Preferred Date': dateFormatted,
          'Preferred Time': timeFormatted,
          'Additional Notes': formData.notes || 'None',
        }),
      });
    } catch {
      // Continue to WhatsApp even if Formspree fails
    }

    // 2. Redirect to WhatsApp with pre-filled message
    const whatsappNumber = '2349043400000';
    const message = `Hello HandymanAfrica 👋

New Booking Request

Service: ${serviceName}
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}
Preferred Date: ${dateFormatted}
Preferred Time: ${timeFormatted}
Additional Notes: ${formData.notes || 'None'}

Please confirm this booking. Thank you.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

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
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
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
                      <Label>Preferred Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-between text-left font-normal h-10 border-input focus:ring-ring focus:ring-2 focus:ring-offset-2",
                              !formData.preferredDate && "text-muted-foreground"
                            )}
                          >
                            <span>
                              {formData.preferredDate
                                ? format(new Date(formData.preferredDate), "PPP")
                                : "Select a date"}
                            </span>
                            <CalendarIcon className="w-4 h-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-card border-border shadow-elevated z-50" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.preferredDate ? new Date(formData.preferredDate) : undefined}
                            onSelect={(date) =>
                              setFormData((prev) => ({
                                ...prev,
                                preferredDate: date ? format(date, 'yyyy-MM-dd') : '',
                              }))
                            }
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Time</Label>
                      <Select
                        value={formData.preferredTime}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, preferredTime: value }))
                        }
                      >
                        <SelectTrigger className="w-full h-10 [&>svg.lucide-chevron-down]:hidden border-input">
                          <span className="flex items-center justify-between w-full">
                            <SelectValue placeholder="Select a time" />
                            <Clock className="w-4 h-4 opacity-50" />
                          </span>
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border shadow-elevated z-50">
                          {[
                            '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
                            '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
                            '04:00 PM', '05:00 PM', '06:00 PM',
                          ].map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
              <div className="animate-fade-in py-8 md:py-12">
                {/* Success Icon & Header */}
                <div className="text-center mb-10">
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-success" />
                  </div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
                    Booking Submitted!
                  </h2>
                  <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
                    Thank you for choosing HandymanAfrica. Our team will contact you shortly to confirm your appointment.
                  </p>
                </div>

                {/* Booking Summary Card */}
                <div className="bg-card rounded-2xl max-w-lg mx-auto shadow-soft border border-border overflow-hidden mb-8">
                  <div className="bg-primary/5 px-6 py-4 border-b border-border">
                    <h4 className="font-display font-semibold text-foreground text-lg">Booking Summary</h4>
                  </div>
                  <div className="px-6 py-5 space-y-5">
                    {/* Service */}
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Service</p>
                        <p className="text-foreground font-medium">{selectedService?.title}</p>
                      </div>
                    </div>

                    <div className="border-t border-border/50" />

                    {/* Name */}
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Name</p>
                        <p className="text-foreground font-medium">{formData.fullName}</p>
                      </div>
                    </div>

                    <div className="border-t border-border/50" />

                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Address</p>
                        <p className="text-foreground font-medium">{formData.address}</p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    {(formData.preferredDate || formData.preferredTime) && (
                      <>
                        <div className="border-t border-border/50" />
                        <div className="flex items-start gap-4">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Preferred Date & Time</p>
                            <p className="text-foreground font-medium">
                              {formData.preferredDate && format(new Date(formData.preferredDate), 'MMMM d, yyyy')}
                              {formData.preferredTime && ` at ${formData.preferredTime}`}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* What's Next */}
                <div className="bg-primary/5 rounded-2xl p-6 max-w-lg mx-auto text-center">
                  <p className="text-foreground text-sm md:text-base">
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
