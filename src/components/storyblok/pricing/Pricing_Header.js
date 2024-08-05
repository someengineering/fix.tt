import { storyblokEditable } from "@storyblok/react";

const Pricing_Header = ({ blok }) => {
  return (
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8" {...storyblokEditable(blok)}>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-lg font-bold uppercase text-gray-600 sm:text-xl" {...storyblokEditable(blok)}>
            {blok.value}
          </h2>
        </div>
      </div>
  );
};

export default Pricing_Header;
