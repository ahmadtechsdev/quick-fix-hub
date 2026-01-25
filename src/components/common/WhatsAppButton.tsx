import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '2349043400000';
  const message = encodeURIComponent('Hello! I would like to book a handyman service.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-pulse-soft"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" fill="currentColor" />
    </a>
  );
};

export default WhatsAppButton;
