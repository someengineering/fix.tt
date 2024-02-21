import { UserFragment as HashnodeUser } from '@/generated/hashnode/graphql';

const userTitleMapping: Record<string, string> = {
  fixteam: '',
  lloesche: 'Co-founder & CISO',
  scapecast: 'Co-founder & CEO',
  aquamatthias: 'Co-founder & CTO',
};

export const getUserTitle = (user: HashnodeUser): string | undefined => {
  if (user.username in userTitleMapping) {
    return userTitleMapping[user.username];
  }

  return 'Engineer';
};

export const getUserLink = (user: HashnodeUser): string | undefined => {
  const socialMediaLinks = user.socialMediaLinks;

  return socialMediaLinks?.linkedin ?? undefined;
};

export const sanitizeMarkdown = (markdown: string): string => {
  return markdown
    .replace(/\s+align="\w+"/g, '')
    .replace(/]\(https?:\/\/(www\.)?fix\.(security|tt)\/?/g, '](/')
    .replace(/]\(https?:\/\/blog\.fix\.(security|tt)\/?/g, '](/blog/');
};
