'use client';

import React from 'react';
import { StoryblokComponent, useStoryblokState } from '@storyblok/react';

interface StoryblokRendererProps {
    story: {
        content: {
            body: Array<any>;
        };
    };
}

const StoryblokRenderer: React.FC<StoryblokRendererProps> = ({ story }) => {
    // Enable live updates in the Storyblok Visual Editor
    const liveStory = useStoryblokState(story);

    return (
        <div>
            {liveStory?.content?.body.map((blok) => (
                <StoryblokComponent blok={blok} key={blok._uid} />
            ))}
        </div>
    );
};

export default StoryblokRenderer;
