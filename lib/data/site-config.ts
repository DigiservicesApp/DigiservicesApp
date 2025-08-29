import { IconType } from 'react-icons';
import {
  RiLinkedinBoxFill,
  RiFacebookFill,
  RiTwitterXFill,
  RiPinterestFill,
  RiYoutubeFill,
} from 'react-icons/ri';

export interface SocialLink {
  name: string;
  href: string;
  icon?: IconType | string; // Can be either a React Icon or an SVG path
  isCustomSvg?: boolean;
  svg?: string;
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
    name: 'X',
    href: 'https://x.com/digiservicesapp',
    icon: RiTwitterXFill,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/DigiServicesApp',
    icon: RiFacebookFill,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/digiservicesapp',
    icon: RiLinkedinBoxFill,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@DigiServicesApp',
    icon: RiYoutubeFill,
  },
  {
    name: 'Pinterest',
    href: 'https://www.pinterest.com/DigiServicesApp',
    icon: RiPinterestFill,
  },
  {
    name: 'Crunchbase',
    href: '#',
    isCustomSvg: true,
    svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 70 70' className='w-6 h-6'><path className='fill-current' d='M13.94 33.658a2.962 2.962 0 110.034-2.44h2.296a5.167 5.167 0 100 2.44h-2.296zM23.51 27.257h-.379a5.098 5.098 0 00-2.526.89v-5.752h-2.095v14.794h2.107v-.54a5.167 5.167 0 102.893-9.392zm2.962 5.534v.092a2.94 2.94 0 01-.08.362 2.934 2.934 0 01-.144.373v.046a2.98 2.98 0 01-2.072 1.625l-.281.046h-.063a2.916 2.916 0 01-.322 0 2.962 2.962 0 01-.402-.029h-.057a2.934 2.934 0 01-.752-.23h-.057a2.974 2.974 0 01-.666-.447 2.991 2.991 0 01-.522-.626 2.962 2.962 0 01-.19-.367 2.945 2.945 0 01.035-2.44 2.968 2.968 0 012.377-1.682 2.934 2.934 0 01.304 0 2.968 2.968 0 012.928 2.882 2.957 2.957 0 010 .396z' transform='matrix(3 0 0 3 -17 -60)' /></svg>",
  },
  {
    name: 'F6S',
    href: '#',
    isCustomSvg: true,
    svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800' className='w-6 h-6 fill-current'>  <path d='M156.9 180.1h136.8v57.8h-79.1v124.9h45.8v57.8h-45.8v199.3h-57.8V180.1z' />  <path    d='M372.4 237.9v124.9h68.5c16.6 0 31.1 14.5 31.1 31v194.7c0 16.7-14.5 31.4-31.1 31.4h-95c-16.6 0-31.1-14.3-31.1-30.6V212.3c0-16.8 14.4-32.2 30.3-32.2h95.9c16.6 0 31.1 14.5 31.1 31v72.7h-57.8v-45.8zm0 182.7v141.5h41.9V420.6h-41.9z' />  <path    d='M647.1 283.7h-57.8v-45.8h-41.9v124.9l69.1 0.02c16.4 0 30.5 19.7 30.5 35.8v189.7c0 16.8-14.3 31.6-30.5 31.6h-92.9c-16.3 0-30.5-14.4-30.5-30.7v-106l54.3-0.1v79.1h41.9v-141.5l-65.7 0.02c-16.2 0-30.5-14.6-30.5-31.1V211.3c0-16.6 14.3-31.2 30.5-31.2h92.9c16.3 0 30.5 14.6 30.5 31.2v72.4z' /></svg>",
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
      { name: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Blog', href: '/blog' },
      { name: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
];

export const companyInfo = {
  name: 'DigiServicesApp',
  // Optional logo entry. Can be a string (src) or an object { src }.
  // Optional logo entry. Leave undefined to use text fallback.
  logo: '/images/logo.webp',
  tagline: 'AI-powered project management for digital professionals',
  description:
    'Streamline your workflow with intelligent task management, team collaboration, and automated project insights.',
  address: {
    street: '2719 Whittier Blvd A',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90023',
    country: 'United States',
  },
  contact: {
    email: 'hello@digiservicesapp.com',
    phone: '+1 (830) 394-1861',
    support: 'hello@digiservicesapp.com',
  },
};
