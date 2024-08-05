import {StoryblokComponent, storyblokEditable} from "@storyblok/react";

const pricing_paragraph_4xl = ({ blok }) => {

    return (
        <p className="mx-auto max-w-prose text-balance text-4xl font-extrabold sm:text-5xl" {...storyblokEditable(blok)}>
            {blok.div.map((nestedBlok) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </p>
)
    ;
};
export default pricing_paragraph_4xl;
