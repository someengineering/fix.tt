import {StoryblokComponent, storyblokEditable} from "@storyblok/react";

const Pricing_Div_Text_Center = ({ blok }) => {

    return (
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8" {...storyblokEditable(blok)}>
            {blok.div.map((nestedBlok) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </div>
)
    ;
};
export default Pricing_Div_Text_Center;
