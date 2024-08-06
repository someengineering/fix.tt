import React from 'react';
import parse from 'html-react-parser';
import { storyblokEditable, renderRichText } from '@storyblok/react';

const HeadlineTextBlockMinimal = ({ blok }) => {
    const renderText = (text) => {
        if (typeof text === 'object' && text !== null) {
            // Render the rich text as HTML string
            return renderRichText(text);
        }
        return text;
    };

    return (
        <>
            <h1 className="text-pretty text-balance text-4xl font-extrabold sm:text-5xl header-text-block__headline" {...storyblokEditable(blok)}>
                {blok.headline}
            </h1>
            <div className="max-w-prose header-text-block__introduction">
                {parse(renderText(blok.introduction))}
            </div>
        </>
    );
};

export default HeadlineTextBlockMinimal;