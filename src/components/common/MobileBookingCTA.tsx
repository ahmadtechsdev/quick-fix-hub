import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MobileBookingCTA = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-border p-3">
      <Link to="/booking" className="block">
        <Button variant="hero" size="lg" className="w-full gap-2">
          <Calendar className="w-5 h-5" />
          Book a Handyman Now
        </Button>
      </Link>
    </div>
  );
};

export default MobileBookingCTA;
