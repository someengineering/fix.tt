import {StoryblokComponent, storyblokEditable} from "@storyblok/react";

const Pricing_Div_Cols_1 = ({ blok }) => {

    return (
        <div className="mx-auto mt-10 grid max-w-md grid-cols-1 items-stretch gap-8 text-left md:max-w-2xl lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-2" {...storyblokEditable(blok)}>
            {blok.div.map((nestedBlok) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </div>
)
    ;
};
export default Pricing_Div_Cols_1;
