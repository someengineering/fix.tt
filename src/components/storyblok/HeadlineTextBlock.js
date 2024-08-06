import React from 'react';
import parse from 'html-react-parser';
import { storyblokEditable, renderRichText } from '@storyblok/react';

const HeadlineTextBlock = ({ blok }) => {
    const renderText = (text) => {
        if (typeof text === 'object' && text !== null) {
            // Render the rich text as HTML string
            return renderRichText(text);
        }
        return text;
    };

    return (
        <>
            <h2 className="mb-3 text-lg font-bold uppercase text-gray-600 sm:text-xl header-text-block__eyebrow" {...storyblokEditable(blok)}>
                {blok.eyebrow}
            </h2>
            <div className="text-pretty text-balance text-4xl font-extrabold sm:text-5xl header-text-block__headline">
                {parse(renderText(blok.headline))}
            </div>
            <div className="max-w-prose header-text-block__introduction">
                {parse(renderText(blok.introduction))}
            </div>
        </>
    );
};

export default HeadlineTextBlock;