'use client';

import { apiPlugin, storyblokInit } from '@storyblok/react';
import components from "../../storyblok";

storyblokInit({
    accessToken: process.env.STORYBLOK_OAUTH_TOKEN,
    use: [apiPlugin],
    components,
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
