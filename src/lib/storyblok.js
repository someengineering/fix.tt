import { getStoryblokApi } from "@storyblok/react";

export const fetchStory = async (slug) => {
    const storyblokApi = getStoryblokApi();
    try {
        let { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
            version: "draft",
        });
        return data?.story || null;
    } catch (error) {
        console.error(`Error fetching story [${slug}]: `, error);
        return null;
    }
};
