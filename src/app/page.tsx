import StoryblokRenderer from "@/app/StoryblokRenderer";
import {apiPlugin, getStoryblokApi, ISbStoriesParams, storyblokInit, useStoryblokApi} from "@storyblok/react";
import {isProd} from "@/constants/env";
import {Metadata} from "next";
import {generateMetadataFromStory} from "@/lib/storyblok";
import {notFound} from "next/navigation";
import components from "../../storyblok";

storyblokInit({
  accessToken: process.env.STORYBLOK_OAUTH_TOKEN,
  use: [apiPlugin],
  components,
});

async function fetchData(slug: string) {
  const sbParams: ISbStoriesParams = {
    version: isProd ? 'published' : 'draft',
  };
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
  const story = await fetchData('home');

  return generateMetadataFromStory(story, false);
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slugPath = 'home';
  let data;
  try {
    const response = await fetchData(slugPath);
    data = response.data;
  } catch (error) {
    notFound();
  }
  return (
      <StoryblokRenderer story={data.story} />
  );
}
