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

export default function Why() {
  return (
    <div className="bg-primary-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            className="mb-3 text-xl font-semibold uppercase leading-7 text-primary-900"
            id="why"
          >
            Why Fix?
          </h2>
          <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Detect, prioritize, and remediate critical cloud risks.
          </p>
          <div className="text-lg leading-8 text-gray-600">
            <p className="mt-6">
              <strong>
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
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={`feature-${index}`} className="flex flex-col">
                <dt className="text-lg font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-md bg-jade-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
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
    </div>
  );
}
