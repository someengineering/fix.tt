import { getStoryblokApi, StoryblokComponent } from '@storyblok/react/rsc';

async function fetchData(slug) {
  let sbParams = { version: 'draft' };

  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
}

export default async function Page({ params }) {
  const { data } = await fetchData(params.slug.join('/')); // Join the slug array to form the correct path

  return (
      <div>
        <StoryblokComponent blok={data.story.content} />
      </div>
  );
}
