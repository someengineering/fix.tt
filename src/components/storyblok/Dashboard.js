import { storyblokEditable } from "@storyblok/react";
import React from 'react';

const Dashboard = ({ blok }) => (
    <picture {...storyblokEditable(blok)}>
        <source srcSet={`${blok.picture.filename}/m/0x0/filters:format(webp)`} type="image/webp" />
        <source srcSet={`${blok.picture.filename}/m/0x0/filters:format(png)`} type="image/png" />
        <img src={blok.picture.filename} alt={blok.picture.alt} />
    </picture>
);

export default Dashboard;