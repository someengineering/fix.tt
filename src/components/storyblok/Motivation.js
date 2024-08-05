import { storyblokEditable } from "@storyblok/react";
import {RichTextRenderer} from "@/utils/richTextRenderer";
import {
    LuBug,
    LuCloudy,
    LuDatabase, LuGithub,
    LuListChecks,
    LuListTree,
    LuNetwork, LuPencilRuler, LuSearchCode,
    LuSendToBack,
    LuShuffle
} from "react-icons/lu";
import React from 'react';


const features = [
  {
    name: 'CSPM',
    icon: (props) => <LuListChecks {...props} />,
  },
  {
    name: 'Inventory',
    icon: (props) => <LuBug {...props} />,
  },
  {
    name: 'Remediation',
    icon: (props) => <LuShuffle {...props} />,
  },
    {
        name: 'Cloud asset inventory',
        icon: (props) => <LuDatabase {...props} />,
    },
    {
        name: 'Compliance checks',
        icon: (props) => <LuListChecks {...props} />,
    },
    {
        name: 'Resource relationships',
        icon: (props) => <LuSendToBack {...props} />,
    },
    {
        name: 'Agentless coverage',
        icon: (props) => <LuDatabase {...props} />,
    },
    {
        name: 'Security graph',
        icon: (props) => <LuNetwork {...props} />,
    },
    {
        name: 'Multi-cloud visibility',
        icon: (props) => <LuCloudy {...props} />,
    },
    {
        name: 'Open source',
        icon: (props) => <LuGithub {...props} />,
    },
    {
        name: 'Data model',
        icon: (props) => <LuListTree {...props} />,
    },
    {
        name: 'Customization',
        icon: (props) => <LuPencilRuler {...props} />,
    },
    {
        name: 'Full-text search',
        icon: (props) => <LuSearchCode {...props} />,
    },
];

const Motivation = ({ blok }) => (
    <div className="mx-auto max-w-7xl px-6 lg:px-8" {...storyblokEditable(blok)}>
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="mb-3 text-lg font-bold uppercase text-gray-600 sm:text-xl">
          {blok.caption}
        </h2>
        <p className="max-w-prose text-pretty text-4xl font-extrabold sm:text-5xl">
            <span className="text-cornflower-blue-600">
              {blok.header_span}
            </span>
          {blok.header_text}
        </p>
        <div className="max-w-prose text-lg leading-8 text-gray-600">
          {blok.description.map(desc => (
              <div className="mt-6">
                <RichTextRenderer document={desc.value}/>
              </div>
          ))}
        </div>
        <dl className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-10 sm:mt-12 lg:max-w-none lg:grid-cols-3">
          {blok.motivation_items.map((feature, index) =>
            (
                <div key={`feature-${index}`} className="flex flex-col">
                    <dt className="text-lg font-bold text-gray-900">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-marian-blue-50">
                            {features.filter(f => f.name === feature.caption)[0] &&
                                features.filter(f => f.name === feature.caption)[0].icon({ className: 'h-6 w-6 text-cornflower-blue-600', "aria-hidden": 'true' })}
                        </div>
                        {feature.caption}
                    </dt>
                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                        <p className="flex-auto">{feature.text}</p>
                    </dd>
                </div>
            )
          )}
        </dl>
      </div>
    </div>
);

export default Motivation;
