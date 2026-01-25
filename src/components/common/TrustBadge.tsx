import { LucideIcon } from 'lucide-react';

interface TrustBadgeProps {
  icon: LucideIcon;
  text: string;
}

const TrustBadge = ({ icon: Icon, text }: TrustBadgeProps) => {
  return (
    <div className="trust-badge">
      <Icon className="w-4 h-4" />
      <span>{text}</span>
    </div>
  );
};

export default TrustBadge;
