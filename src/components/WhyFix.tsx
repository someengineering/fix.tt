import { LuBug, LuListChecks, LuShuffle } from 'react-icons/lu';

const features: {
  name: string | JSX.Element;
  description: JSX.Element;
  icon: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
}[] = [
  {
    name: <abbr title="Cloud Security and Posture Management">CSPM</abbr>,
    description: (
      <>
        Monitor <abbr title="Center for Internet Security">CIS</abbr>{' '}
        benchmarks, run compliance scans, and enforce policies. Build security
        intelligence on top of your inventory to stay in control and escalate
        critical risks.
      </>
    ),
    icon: (props) => <LuListChecks {...props} />,
  },
  {
    name: 'Inventory',
    description: (
      <>
        Get a complete picture of your cloud and see what is running with visual
        maps. Fix discovers assets and collects rich configuration data for
        resources, no matter where, when, or how they were provisioned.
      </>
    ),
    icon: (props) => <LuBug {...props} />,
  },
  {
    name: 'Remediation',
    description: (
      <>
        Fix integrates with your workflow, ticketing, and messaging tools. Set
        up alerts and automations for policy violations to make it easy for your
        engineers to keep infrastructure updated and tidy.
      </>
    ),
    icon: (props) => <LuShuffle {...props} />,
  },
];

export default function WhyFix() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            className="mb-3 text-lg font-bold uppercase leading-7 text-gray-600 sm:text-xl"
            id="why"
          >
            Why Fix?
          </h2>
          <p className="max-w-prose text-pretty text-4xl font-extrabold sm:text-5xl">
            <span className="text-cornflower-blue-600">
              Detect, prioritize, and remediate
            </span>{' '}
            critical cloud risks.
          </p>
          <div className="max-w-prose text-lg leading-8 text-gray-600">
            <p className="mt-6">
              <strong className="text-gray-900">
                Fix connects to cloud APIs to take full snapshots of your cloud
                infrastructure and technology stack.
              </strong>{' '}
              You get a baseline inventory with a complete view of accounts,
              instances, functions, Kubernetes pods, databases, storage buckets,
              and all other resources and their configurations in a single
              place.
            </p>
            <p className="mt-6">
              The Fix Security Graph also shows relationships between resources,
              providing the context to understand critical risks and attack
              paths&mdash;so you can prioritize and fix the misconfigurations
              and vulnerabilities that matter.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-2xl sm:mt-12 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={`feature-${index}`} className="flex flex-col">
                <dt className="text-lg font-bold leading-7 text-gray-900">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-marian-blue-50">
                    <feature.icon
                      className="h-6 w-6 text-cornflower-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
