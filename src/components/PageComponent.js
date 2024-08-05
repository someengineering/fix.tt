import { fetchStory } from "../lib/storyblok";
import StoryblokRenderer from "../components/StoryblokComponent";

export default async function PageComponent({ slug }) {
    const story = await fetchStory(slug);

    console.log("Fetched Story:", story);

    if (!story || !story.content || !story.content.body) {
        return <div>Error: Story not found or content is empty</div>;
    }

    return (
        <div>
            <StoryblokRenderer story={story} />
        </div>
    );
}
