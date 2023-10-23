import {
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'next-share';
import { FaLinkedin, FaReddit, FaXTwitter } from 'react-icons/fa6';

export default function SocialShareButtons({
  url,
  title,
  hashtags,
}: {
  url: string;
  title?: string;
  hashtags?: string[];
}) {
  return (
    <span className="isolate inline-flex flex-nowrap -space-x-px rounded-md shadow-sm">
      <TwitterShareButton url={url} title={title} hashtags={hashtags}>
        <span
          title="Share on X"
          aria-hidden="true"
          className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black focus:z-10"
        >
          <FaXTwitter className="h-5 w-5" />
        </span>
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title}>
        <span
          title="Share on LinkedIn"
          aria-hidden="true"
          className="relative inline-flex items-center bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-[#007fb1] focus:z-10"
        >
          <FaLinkedin className="h-5 w-5" />
        </span>
      </LinkedinShareButton>
      <RedditShareButton url={url} title={title}>
        <span
          title="Share on Reddit"
          aria-hidden="true"
          className="relative inline-flex items-center rounded-r-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-[#ff4500] focus:z-10"
        >
          <FaReddit className="h-5 w-5" />
        </span>
      </RedditShareButton>
    </span>
  );
}
