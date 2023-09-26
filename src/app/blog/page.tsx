import { Metadata } from 'next';

import BlogPostList from '@/components/blog/BlogPostList';

export const metadata: Metadata = {
  title: 'Blog',
};

export default function Blog() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Fix blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <BlogPostList />
        </div>
      </div>
    </div>
  );
}
