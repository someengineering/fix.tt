import { HashnodeUser } from '@/interfaces/hashnode';

export const getUserLink = (user: HashnodeUser): string | undefined => {
  const socialMediaLinks = user.socialMediaLinks;

  return (
    socialMediaLinks.website ||
    socialMediaLinks.linkedin ||
    socialMediaLinks.twitter ||
    socialMediaLinks.youtube ||
    socialMediaLinks.github
  );
};

export const sanitizeMarkdown = (markdown: string): string => {
  return markdown
    .replace(/\s+align="\w+"/g, '')
    .replace(/]\(https?:\/\/(www\.)?fix\.tt\/?/g, '](/')
    .replace(/]\(https?:\/\/blog\.fix\.tt\/?/g, '](/blog/');
};
