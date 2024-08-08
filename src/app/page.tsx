import { ISbStoriesParams } from '@storyblok/react';
import { getStoryblokApi } from '@storyblok/react/rsc';
import { Metadata } from 'next';

import { generateMetadataFromStory } from '@/lib/storyblok';

import PageComponent from '../components/PageComponent';

async function fetchData(slug: string) {
  const sbParams: ISbStoriesParams = { version: 'draft' };
  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    throw new Error('Storyblok API is not initialized');
  }

  return await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const story = await fetchData(params.slug ? params.slug.join('/') : 'home');

  return generateMetadataFromStory(story, true);
}

export default async function Page() {
  const slug = 'home';
  return <PageComponent slug={slug} />;
}
