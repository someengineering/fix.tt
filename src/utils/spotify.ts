import GithubSlugger from 'github-slugger';

export const getEpisodeSlug = (name: string): string => {
  const slugger = new GithubSlugger();

  return slugger.slug(name.slice(0, name.lastIndexOf(' with ')));
};
