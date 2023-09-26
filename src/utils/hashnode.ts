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
