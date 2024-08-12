'use client';
import {apiPlugin, StoryblokComponent, storyblokInit, useStoryblokState} from '@storyblok/react';
import components from "../../storyblok";

storyblokInit({
  accessToken: 'rCAcAXzi9QPalZA3rT6nywtt',
  use: [apiPlugin],
  components,
});

const StoryblokRenderer = ({ story }) => {
  const liveStory = useStoryblokState(story);
  return <>
    {liveStory.content.body.map((blok) => (
        <StoryblokComponent blok={blok} key={blok._uid}/>
    ))}
  </>
};

export default StoryblokRenderer;
