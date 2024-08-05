import {
    getStoryblokApi, StoryblokComponent
} from "@storyblok/react/rsc";

export default async function Page({ params }) {
    const { data } = await fetchData(params.slug);

    return (
        <div>
            <StoryblokComponent blok={data.story.content} />
        </div>
    );
}

export async function fetchData(slug) {
    let sbParams = { version: "draft" };

    const storyblokApi = getStoryblokApi();
    return await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
}
