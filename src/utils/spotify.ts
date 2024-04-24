import GithubSlugger from 'github-slugger';

export const getEpisodeSlug = (name: string): string => {
  const slugger = new GithubSlugger();

  return slugger.slug(name.slice(0, name.lastIndexOf(' with ')));
};

export const parseEpisodeTitle = (
  str: string,
): {
  title: string;
  guest: { name?: string; title?: string };
} => {
  const [title, guest] = str.split(' - ');
  const [guestName, guestTitle] = guest.split(', ');

  return {
    title,
    guest: { name: guestName, title: guestTitle },
  };
};
