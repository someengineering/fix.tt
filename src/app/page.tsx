import { getStoryblokApi, ISbStoriesParams } from '@storyblok/react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import StoryblokRenderer from '@/app/StoryblokRenderer';
import { generateMetadataFromStory } from '@/lib/storyblok';

async function fetchData(
  slug: string,
  version: 'published' | 'draft' | undefined,
) {
  const sbParams: ISbStoriesParams = {
    version: version,
  };
  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    throw new Error('Storyblok API is not initialized');
  }

  return await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
}

export async function generateMetadata(): Promise<Metadata> {
  const story = await fetchData('home', 'published');

  return generateMetadataFromStory(story, false);
}

export default async function Page({
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: { _storyblok?: string };
}) {
  const slugPath = 'home';
  let data;
  try {
    const version = searchParams._storyblok ? 'draft' : 'published';
    const response = await fetchData(slugPath, version);
    data = response.data;
  } catch (error) {
    notFound();
  }
  return <StoryblokRenderer story={data.story} />;
}
