import { Zap, Droplets, Wind, Hammer, PaintBucket, Wrench } from 'lucide-react';

export const services = [
  {
    id: 'electrical',
    icon: Zap,
    title: 'Electrical Services',
    shortDescription: 'Professional electrical repairs, installations, and maintenance.',
    fullDescription: 'Our certified electricians handle everything from simple repairs to complete electrical installations. We ensure your home or business is safe and up to code.',
    includes: [
      'Light fixture installation',
      'Outlet and switch repairs',
      'Electrical panel upgrades',
      'Wiring and rewiring',
      'Safety inspections',
      'Generator installation',
    ],
    
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop',
  },
  {
    id: 'plumbing',
    icon: Droplets,
    title: 'Plumbing',
    shortDescription: 'Expert plumbing solutions for leaks, clogs, and installations.',
    fullDescription: 'From minor leaks to major plumbing overhauls, our skilled plumbers provide reliable solutions that last. We use quality materials and proven techniques.',
    includes: [
      'Leak detection and repair',
      'Drain cleaning and unclogging',
      'Pipe installation and repair',
      'Water heater services',
      'Toilet and faucet repairs',
      'Sewer line services',
    ],
    
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop',
  },
  {
    id: 'ac-repairs',
    icon: Wind,
    title: 'AC & Repairs',
    shortDescription: 'Cooling solutions including AC installation, repair, and maintenance.',
    fullDescription: 'Keep your space comfortable year-round with our comprehensive AC services. We service all major brands and provide energy-efficient solutions.',
    includes: [
      'AC installation',
      'Repair and maintenance',
      'Refrigerant recharge',
      'Duct cleaning',
      'Thermostat installation',
      'Emergency repairs',
    ],
    
    image: 'https://images.unsplash.com/photo-1631545806609-21a8b2c9e8f0?w=400&h=300&fit=crop',
  },
  {
    id: 'carpentry',
    icon: Hammer,
    title: 'Carpentry',
    shortDescription: 'Custom woodwork, furniture repair, and structural carpentry.',
    fullDescription: 'Our skilled carpenters bring craftsmanship to every project. From custom furniture to structural repairs, we deliver quality woodwork.',
    includes: [
      'Custom furniture building',
      'Cabinet installation',
      'Door and window fitting',
      'Deck and fence construction',
      'Furniture repair',
      'Trim and molding work',
    ],
    
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
  },
  {
    id: 'painting',
    icon: PaintBucket,
    title: 'Painting',
    shortDescription: 'Interior and exterior painting with premium finishes.',
    fullDescription: 'Transform your space with our professional painting services. We use high-quality paints and meticulous techniques for flawless results.',
    includes: [
      'Interior painting',
      'Exterior painting',
      'Wall preparation and repair',
      'Texture and specialty finishes',
      'Cabinet refinishing',
      'Color consultation',
    ],
    
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop',
  },
  {
    id: 'installations',
    icon: Wrench,
    title: 'Installations',
    shortDescription: 'Professional installation of appliances, fixtures, and more.',
    fullDescription: 'From TVs to ceiling fans, our technicians ensure proper installation of all your home fixtures and appliances. Safe, secure, and done right.',
    includes: [
      'TV mounting',
      'Ceiling fan installation',
      'Appliance setup',
      'Shelving and storage',
      'Smart home devices',
      'Security system installation',
    ],
    
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
];

export type Service = typeof services[0];
