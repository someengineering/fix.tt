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

export const sanitizeHtml = (html: string): string => {
  return html
    .replace(/<br\s?\/?>/g, '')
    .replace(/(<\/?)div>/g, '$1p>')
    .replace(/\shref="https?:\/\/(www\.)?fix\.(security|tt)\/?/g, ' href="/')
    .replace(
      /\shref="https?:\/\/podcast\.fix\.(security|tt)\/?/g,
      ' href="/podcast/',
    );
};
