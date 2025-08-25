import {
  RiTwitterXLine,
  RiFacebookCircleLine,
  RiLinkedinBoxLine,
} from 'react-icons/ri';
import { generateShareLinks } from '@/lib/utils/blog';

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const shareLinks = generateShareLinks(url, title);

  return (
    <div className="flex items-center gap-4 text-gray-400">
      <span className="text-sm font-medium">Share:</span>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-900 transition-colors"
        aria-label="Share on Twitter"
      >
        <RiTwitterXLine className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-900 transition-colors"
        aria-label="Share on Facebook"
      >
        <RiFacebookCircleLine className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-900 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <RiLinkedinBoxLine className="w-5 h-5" />
      </a>
    </div>
  );
}
