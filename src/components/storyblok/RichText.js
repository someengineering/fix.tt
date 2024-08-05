import {RichTextRenderer} from "@/utils/richTextRenderer";
import {storyblokEditable} from "@storyblok/react";

const RichText = ({ blok }) => {
  return <RichTextRenderer document={blok.value} {...storyblokEditable(blok)}/>;
};

export default RichText;
