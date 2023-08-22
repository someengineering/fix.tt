export function openGraph({
  title,
  metadata,
}: {
  title?: string;
  metadata?: string;
}): string {
  const ogTitle = title ? encodeURIComponent(title.trim()) : undefined;
  const ogMetadata = metadata ? encodeURIComponent(metadata.trim()) : undefined;

  return `https://og.some.engineering/api/image?theme=fix${
    ogTitle ? `&title=${ogTitle}` : ''
  }${ogMetadata ? `&metadata=${ogMetadata}` : ''}`;
}
