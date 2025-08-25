import { IconType } from 'react-icons';
import {
  RiTwitterFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiInstagramLine,
  RiYoutubeLine,
  RiDiscordFill,
} from 'react-icons/ri';

export interface SocialLink {
  name: string;
  href: string;
  icon: IconType | string; // Can be either a React Icon or an SVG path
  isCustomSvg?: boolean;
}

export interface FooterLink {
  name: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const socialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/digiservicesapp',
    icon: RiTwitterFill,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/digiservicesapp',
    icon: RiGithubFill,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/digiservicesapp',
    icon: RiLinkedinBoxFill,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/digiservicesapp',
    icon: RiInstagramLine,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/digiservicesapp',
    icon: RiYoutubeLine,
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/digiservicesapp',
    icon: RiDiscordFill,
  },
];

// Example of how to add a custom SVG icon
// const customSvgIcon = "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3 8h-1.35c-.538 0-.65.221-.65.778V10h2l-.209 2H13v7h-3v-7H8v-2h2V8.192C10 6.307 10.896 5 13.123 5H15v3z";

export const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '/features' },
      { name: 'How it Works', href: '/how-it-works' },
      { name: 'Use Cases', href: '/use-cases' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Security', href: '/security' },
      { name: 'Enterprise', href: '/enterprise' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Guides', href: '/guides' },
      { name: 'Blog', href: '/blog' },
      { name: 'Community', href: '/community' },
      {
        name: 'Status',
        href: 'https://status.digiservicesapp.com',
        isExternal: true,
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Partners', href: '/partners' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/privacy-policy#cookies' },
      { name: 'GDPR', href: '/gdpr' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  },
];

export const companyInfo = {
  name: 'DigiServicesApp',
  tagline: 'AI-powered project management for digital professionals',
  description:
    'Streamline your workflow with intelligent task management, team collaboration, and automated project insights.',
  address: {
    street: '123 Innovation Way',
    city: 'Digital City',
    state: 'DC',
    zip: '12345',
    country: 'United States',
  },
  contact: {
    email: 'hello@digiservicesapp.com',
    phone: '+1 (555) 123-4567',
    support: 'support@digiservicesapp.com',
  },
};
