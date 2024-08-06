import {storyblokEditable} from "@storyblok/react";
import Image from "next/image";

const extractDimensionsFromUrl = (url) => {
    const regex = /\/(\d+)x(\d+)\//;
    const match = url.match(regex);
    if (match) {
        return {
            width: parseInt(match[1], 10),
            height: parseInt(match[2], 10)
        };
    }
    return { width: 100, height: 100 };
};

const StoryblokImage = ({ blok, picture, className }) => {
    const isSVG = picture.filename.endsWith('.svg');
    const { width, height } = extractDimensionsFromUrl(picture.filename);


    if (isSVG) {
        return (
            <Image
                src={picture.filename}
                alt={picture.alt || 'Image'}
                width={width}
                height={height}
                className={`${className} ${blok.roundedCorners} ${blok.shadow}`}
            />
        );
    }

    return (
        <picture {...storyblokEditable(blok)}>
            <source srcSet={`${picture.filename}/m/0x0/filters:format(webp)`} type="image/webp" />
            <source srcSet={`${picture.filename}/m/0x0/filters:format(png)`} type="image/png" />
            <img
                src={picture.filename}
                alt={picture.alt}
                className={`${className} ${blok.roundedCorners} ${blok.shadow}`}
            />
        </picture>
    );
};

export default StoryblokImage;
