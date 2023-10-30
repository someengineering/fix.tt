import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

import PrimaryLink from '@/components/common/links/PrimaryLink';

import larsPhoto from '@/assets/photos/lars.jpg';
import lukasPhoto from '@/assets/photos/lukas.jpg';
import matthiasPhoto from '@/assets/photos/matthias.jpg';

const people = [
  {
    name: 'Lukas Lösche',
    role: 'Co-founder & CISO',
    photo: lukasPhoto,
    bio: (
      <>
        <p className="my-4">
          My background is in building secure distributed systems&mdash;from
          bare metal racked up in a data center running Linux, Windows, and
          FreeBSD to cloud platforms that securely connect vehicles, ships, and
          airplanes owned by the United States Government.
        </p>
        <p className="my-4">
          At Fix, I spend my time on Zoom calls with our users and turn their
          needs and feedback into new product capabilities. I built our original
          open source asset inventory and security graph that&rsquo;s now the
          foundation for Fix. The cloud is a graph, not a table&mdash;and
          security tooling should reflect that. I&rsquo;m also our acting{' '}
          <abbr title="chief information security officer">CISO</abbr>, keeping
          our own infrastructure and systems secure.
        </p>
        <p className="my-4">
          I&rsquo;m a gamer by heart, and attend Gamescom in Cologne every year.
          My Tuesday nights are blocked for playing D&amp;D, and I also maintain
          a pretty popular{' '}
          <PrimaryLink href="https://github.com/lloesche/valheim-server-docker">
            Valheim server Docker image
          </PrimaryLink>
          .
        </p>
      </>
    ),
    linkedinUrl: 'https://linkedin.com/in/lloesche',
    githubUrl: 'https://github.com/lloesche',
  },
  {
    name: 'Lars Kamp',
    role: 'Co-founder & CEO',
    photo: larsPhoto,
    bio: (
      <>
        <p className="my-4">
          I started with economics and statistics, but then found networks and
          computers much more interesting. My first encounter with cloud
          infrastructure was when I had to create a financial model for a global
          network of data centers. Today, that global network is better known as
          Microsoft Azure.
        </p>
        <p className="my-4">
          At Fix, I&rsquo;m usually the first line of support for customers. I
          ask a lot of questions about your existing security stack and the
          compliance frameworks you need to track. Since I come from the cloud
          warehouse space and analytics engineering, I look at security data as
          just another data source that needs to be centralized and visualized
          in a dashboard.
        </p>
        <p className="my-4">
          I love writing about startups with my{' '}
          <PrimaryLink href="https://buildingdistribution.substack.com">
            &ldquo;Building Distribution&rdquo; Substack
          </PrimaryLink>
          . And I track cloud security companies and open source projects in my{' '}
          <PrimaryLink href="https://github.com/someengineering/cloud-security-list">
            &ldquo;Cloud Security List&rdquo;
          </PrimaryLink>
          .
        </p>
      </>
    ),
    linkedinUrl: 'https://linkedin.com/in/larskamp',
    githubUrl: 'https://github.com/scapecast',
  },
  {
    name: 'Matthias Veit',
    role: 'Co-founder & CTO',
    photo: matthiasPhoto,
    bio: (
      <>
        <p className="my-4">
          Before Fix, I was an Apache committer and the technical lead for
          Marathon, a highly available cluster scheduler for container
          orchestration for Apache Mesos. I also built the trip execution and
          vehicle dispatching system for MOIA, Volkswagen&rsquo;s ride pooling
          service.
        </p>
        <p className="my-4">
          At Fix, I lead a team of engineers in creating the building blocks of
          our service. This includes creating a search syntax that enables
          intuitive searching and traversing of our security graph without the
          hassle of a learning a complex graph query language. I also ensure
          that our unified data model works across all resources for{' '}
          <abbr title="Amazon Web Services">AWS</abbr>, Google Cloud, Azure, and
          other platforms Fix supports.
        </p>
        <p className="my-4">
          My current passion is reducing the noise in a security
          engineers&rsquo; life.
        </p>
      </>
    ),
    linkedinUrl: 'https://linkedin.com/in/matthias-veit',
    githubUrl: 'https://github.com/aquamatthias',
  },
];

export default function MeetOurLeadership() {
  return (
    <div className="bg-primary-50 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 gap-y-20 px-6 lg:px-8 xl:grid-cols-6">
        <div className="max-w-2xl xl:col-span-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We&rsquo;ve built products for security, infrastructure,
            observability, and analytics.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We think modern cloud security combines the best of data collection,
            anomaly detection, and presentation of insights in a way that is
            actionable and understandable by a human.
          </p>
        </div>
        <ul
          role="list"
          className="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-4"
        >
          {people.map((person) => (
            <li
              key={person.name}
              className="flex flex-col items-start gap-x-6 gap-y-10 pt-12 sm:flex-row"
            >
              <Image
                className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover sm:aspect-[2/3]"
                src={person.photo}
                alt=""
              />
              <div className="max-w-xl flex-auto">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {person.name}
                </h3>
                <p className="text-base leading-7 text-gray-600">
                  {person.role}
                </p>
                <div className="mt-6 text-base leading-7 text-gray-600">
                  {person.bio}
                </div>
                <ul role="list" className="mt-6 flex gap-x-4">
                  <li>
                    <a
                      href={person.linkedinUrl}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <FaLinkedin className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={person.githubUrl}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">GitHub</span>
                      <FaGithub className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
