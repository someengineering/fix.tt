import { storyblokEditable } from "@storyblok/react";
import {RichTextRenderer} from "@/utils/richTextRenderer";
import ButtonLink from "@/components/common/links/ButtonLink";
import React from "react";

const Compare = ({ blok }) => (
    <div className="px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl text-center" {...storyblokEditable(blok)}>
        <div className="mb-12 flex items-center justify-center space-x-10" aria-hidden="true">
          <img src={blok.picture_1.filename} alt={blok.picture_1.alt} className="h-24 w-24 text-cornflower-blue-600"/>
          <span className="h-10 w-10 rounded-full bg-marian-blue-50 text-lg font-extrabold leading-10">
        VS
      </span>
          <img src={blok.picture_2.filename} alt={blok.picture_2.alt} className="h-24 w-24"/>
        </div>
        <h2 className="text-pretty text-4xl font-extrabold sm:text-5xl">
          {blok.caption}
        </h2>
        {blok.description.map((desc) => (
            <div className="markdown compare-page">
            <RichTextRenderer document={desc.value} />
            </div>
        ))}
          <div className="my-12 space-x-5">
              <ButtonLink href={blok.button_href} size="lg">
                  Try Fix Security for free
              </ButtonLink>
          </div>
      </div>
    </div>
);

export default Compare;
