import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const DynamicComponent = ({ blok }) => (
    <div {...storyblokEditable(blok)}>
        <p>{blok.content}</p>
    </div>
);

const StoryblokRenderer = ({ story }) => (
    <>
        {story.content.body.map((blok) => (
            <StoryblokComponent blok={blok} key={blok._uid} />
        ))}
    </>
);

export default StoryblokRenderer;
