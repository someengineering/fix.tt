import {StoryblokComponent, storyblokEditable} from "@storyblok/react";

const pricing_paragraph_lg = ({ blok }) => {

    return (
        <p className="mx-auto mt-6 max-w-prose text-balance text-lg font-semibold text-gray-900 sm:text-xl" {...storyblokEditable(blok)}>
            {blok.value}
        </p>
)
    ;
};
export default pricing_paragraph_lg;
