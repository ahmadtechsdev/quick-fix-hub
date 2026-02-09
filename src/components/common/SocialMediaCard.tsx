import { Instagram, Facebook, Phone, LucideIcon } from 'lucide-react';

interface SocialLink {
  name: string;
  icon: LucideIcon | React.FC;
  href: string;
  color: string;
  fill: boolean;
}

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SocialMediaCard = () => {
  const whatsappNumber = '2349043400000';
  const whatsappMessage = encodeURIComponent('Hello! I would like to book a handyman service.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const socialLinks: SocialLink[] = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://www.facebook.com/',
      color: 'bg-[#1877F2] hover:bg-[#166FE5]',
      fill: false,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/handyman_africa/',
      color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90',
      fill: false,
    },
    {
      name: 'TikTok',
      icon: TikTokIcon,
      href: 'https://www.tiktok.com/@handyman_africans',
      color: 'bg-foreground hover:bg-foreground/90',
      fill: false,
    },
    {
      name: 'Call',
      icon: Phone,
      href: 'tel:+2349043400000',
      color: 'bg-primary hover:bg-primary/90',
      fill: false,
    },
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {socialLinks.map((link) => {
        const IconComponent = link.icon;
        const isLucideIcon = IconComponent !== TikTokIcon;
        
        return (
          <a
            key={link.name}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`w-11 h-11 rounded-full ${link.color} text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group relative`}
            aria-label={link.name}
          >
            {isLucideIcon ? (
              <IconComponent className="w-5 h-5" fill={link.fill ? 'currentColor' : 'none'} />
            ) : (
              <IconComponent />
            )}
            <span className="absolute left-full ml-3 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {link.name}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaCard;
