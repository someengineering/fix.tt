'use client';

import { Disclosure } from '@headlessui/react';
import { LuMinus, LuPlus } from 'react-icons/lu';

import PrimaryLink from '@/components/common/links/PrimaryLink';

const faqs: {
  question: string | JSX.Element;
  answer: string | JSX.Element;
}[] = [
  {
    question: 'What is Fix?',
    answer: (
      <>
        <p>
          <strong>
            Fix is a <abbr title="Cloud Security Posture Management">CSPM</abbr>{' '}
            tool.
          </strong>{' '}
          Fix performs routine compliance checks against snapshots of your
          infrastructure, identifies misconfigurations, and provides
          recommendations and workflows to correct detected issues.
        </p>
      </>
    ),
  },
  {
    question: (
      <>
        What is <abbr title="Cloud Security Posture Management">CSPM</abbr>, and
        why is it necessary?
      </>
    ),
    answer: (
      <>
        <p>
          Cloud Security Posture Management (CSPM) helps maintain the security,
          compliance, and operational efficiency of your cloud infrastructure.
          Security and compliance are a shared responsibility between cloud
          providers and their customers:
        </p>
        <ul className="ml-4 list-outside list-disc">
          <li>
            <strong>
              Security <em>of</em> the cloud:
            </strong>{' '}
            Cloud providers are responsible for the underlying network and
            infrastructure.
          </li>
          <li>
            <strong>
              Security <em>in</em> the cloud:
            </strong>{' '}
            Customers are responsible for the data they store, access policies
            and regulatory compliance.
          </li>
        </ul>
        <p>
          Adherence to security and compliance policies determines a
          company&rsquo;s security posture, and it is the customer&rsquo;s
          responsibility to perform the necessary checks.{' '}
          <abbr title="Cloud Security Posture Management">CSPM</abbr>{' '}
          standardizes and automates these checks.
        </p>
      </>
    ),
  },
  {
    question: 'How does Fix work?',
    answer: (
      <>
        <p>
          <strong>
            Fix creates snapshots of your infrastructure&rsquo;s resource
            inventory at regular intervals.
          </strong>{' '}
          The data collection process is comparable to an{' '}
          <abbr title="Extract, Load, Transform">ELT</abbr> pipeline, a widely
          recognized approach in cloud security referred to as &ldquo;agentless
          scanning.&rdquo;
        </p>
        <ul className="ml-4 list-outside list-disc">
          <li>
            <strong>Fix Collectors</strong> harvest configuration data for each
            individual resource via cloud provider APIs and send this data to
            Fix Core.
          </li>
          <li>
            <strong>Fix Core</strong> stores metadata in a graph-based inventory
            and provides APIs to query and update the graph.
          </li>
        </ul>
        <p>
          The graph contains a complete representation of all resources and
          their relationships. By combining security data with these
          connections, Fix identifies potential pathways to a security breach.
          This empowers security engineers to pinpoint critical risks in their
          infrastructure.
        </p>
      </>
    ),
  },
  {
    question: <>What is included in a &ldquo;snapshot&rdquo; of my cloud?</>,
    answer: (
      <>
        <p>
          <strong>
            A cloud snapshot is a complete representation of your cloud
            infrastructure that includes all components and
            configurations&mdash;compute instances, storage buckets, serverless
            functions, etc.
          </strong>{' '}
          Snapshots not only list resources, but also capture the relationships
          and connections between resources.
        </p>
        <p>
          The significance of snapshots lies in their non-invasive nature when
          it comes to conducting security assessments. With snapshots, you avoid
          direct interactions with your live production environment, minimizing
          any potential disruptions.
        </p>
      </>
    ),
  },
  {
    question: 'Which cloud providers are supported?',
    answer: (
      <p>
        Fix currently only supports <abbr title="Amazon Web Services">AWS</abbr>
        , but we&rsquo;re working on rolling out support for Kubernetes, Google
        Cloud, Azure, and DigitalOcean.
      </p>
    ),
  },
  {
    question: 'How does Fix connect to my cloud?',
    answer: (
      <>
        <p>
          <strong>
            Fix requires read-only API access to the cloud accounts you wish to
            monitor and secure.
          </strong>
        </p>
        <p>
          Manually maintaining these permissions is a tedious task, so we
          provide a CloudFormation template that automatically creates a role
          with the required permissions and a trust that allows a specified{' '}
          <abbr title="Amazon Web Services">AWS</abbr> account to assume this
          role.
        </p>
      </>
    ),
  },
  {
    question: 'How does Fix ensure the security and compliance of its systems?',
    answer: (
      <p>
        Fix is currently undergoing{' '}
        <PrimaryLink href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2">
          <abbr title="Service Organization Control Type 2">SOC 2</abbr>
        </PrimaryLink>{' '}
        and{' '}
        <PrimaryLink href="https://www.iso.org/standard/27001">
          <abbr title="International Organization for Standardization">
            ISO
          </abbr>
          /<abbr title="International Electrotechnical Commission">IEC</abbr>{' '}
          27001
        </PrimaryLink>{' '}
        certifications to demonstrate our commitment to security and compliance
        best practices.
      </p>
    ),
  },
  {
    question: 'How does Fix protect my data?',
    answer: (
      <ul className="ml-4 list-outside list-disc">
        <li>
          <strong>
            Fix does not access the actual data stored on your storage volumes
            or buckets.
          </strong>{' '}
          Fix operates without an agent, only reading the configuration data of
          your cloud resources via cloud provider APIs. This approach allows Fix
          to scan for and identify security vulnerabilities and
          misconfigurations.
        </li>
        <li>
          <strong>
            Fix also utilizes an isolation concept known as workspaces to
            organize and secure your data.
          </strong>{' '}
          When you create a Fix account, a workspace is created specifically for
          you. You have the option to invite others to join your workspace, but
          by default only the owner of a Fix workspace can view its data.
        </li>
        <li>
          <strong>
            Additionally, Fix allocates a dedicated database for every
            workspace.
          </strong>{' '}
          Data pertaining to your workspace is stored in a database exclusively
          for your use, rather than being commingled in a shared database with
          other Fix customer data. This architecture not only segregates
          customer data (enhancing privacy), but also mitigates a range of
          security vulnerabilities associated with shared databases, such as SQL
          injection attacks.
        </li>
      </ul>
    ),
  },
  {
    question: (
      <>
        Can Fix run in my <abbr title="virtual private cloud">VPC</abbr> or
        hybrid environment?
      </>
    ),
    answer: (
      <p>
        Yes! This is supported in our <a href="#pricing">Enterprise plan</a>.
        Please contact us via email at{' '}
        <PrimaryLink href="mailto:hi@fix.security">hi@fix.security</PrimaryLink>{' '}
        for details.
      </p>
    ),
  },
  {
    question: 'What compliance checks are supported?',
    answer: (
      <>
        <p>
          Fix currently supports the{' '}
          <PrimaryLink href="https://www.cisecurity.org/benchmark/amazon_web_services">
            <abbr title="Center for Internet Security">CIS</abbr>{' '}
            <abbr title="Amazon Web Services">AWS</abbr> Benchmark
          </PrimaryLink>{' '}
          (v1.5 &amp; v2.0) and{' '}
          <PrimaryLink href="https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html">
            <abbr title="Amazon Web Services">AWS</abbr> Well-Architected
            Framework Security Pillar
          </PrimaryLink>{' '}
          out-of-the-box. This benchmark provides a standardized set of controls
          to evaluate the security posture of{' '}
          <abbr title="Amazon Web Services">AWS</abbr> resources.
        </p>
        <p>
          In addition, you can define custom checks and benchmarks&mdash;Fix
          offers the flexibility to tailor compliance assessments to your
          organization&rsquo;s specific requirements.
        </p>
        <p>
          We&rsquo;re actively working on expanding our support for various
          frameworks and benchmarks. If there is a particular framework or
          benchmark you&rsquo;d like us to prioritize on our roadmap, please
          don&rsquo;t hesitate to reach out to us via email at{' '}
          <PrimaryLink href="mailto:hi@fix.security">
            hi@fix.security
          </PrimaryLink>
          .
        </p>
      </>
    ),
  },
  {
    question: 'What cloud resources are supported?',
    answer: (
      <p>
        Fix currently supports over 150{' '}
        <abbr title="Amazon Web Services">AWS</abbr> resources, including the
        most popular <abbr title="Amazon Web Services">AWS</abbr> compute,
        storage, database, and network products: EC2, S3, RDS, and API Gateway.
      </p>
    ),
  },
  {
    question: 'Is it possible to export the raw data collected by Fix?',
    answer: (
      <p>
        Yes! We designed Fix with support for data export to various
        destinations, including S3, Postgres, and Snowflake. For details, get in
        touch with us via email at{' '}
        <PrimaryLink href="mailto:hi@fix.security">hi@fix.security</PrimaryLink>
        .
      </p>
    ),
  },
  {
    question: 'What is the licensing for Fix?',
    answer: (
      <>
        <p>
          <strong>
            Fix is licensed under the{' '}
            <abbr title="GNU Affero General Public License version 3">
              GNU AGPL v3
            </abbr>
            .
          </strong>{' '}
          This open-source license ensures that the source code of Fix is freely
          available to the community.
        </p>
        <p>
          The ability to access and inspect the source code is of particular
          importance for security engineers, as it allows for the software to be
          vetted for potential vulnerabilities and security flaws.
        </p>
      </>
    ),
  },
  {
    question: <>My question isn&rsquo;t listed above.</>,
    answer: (
      <p>
        Email us at{' '}
        <PrimaryLink href="mailto:hi@fix.security">hi@fix.security</PrimaryLink>
        ! We'll be more than happy to assist you.
      </p>
    ),
  },
];

export default function Faq() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 className="text-4xl font-extrabold sm:text-5xl" id="faq">
          Frequently asked questions
        </h2>
        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={`faq-${index}`} className="pt-6">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    as="dt"
                    className="flex w-full cursor-pointer items-start justify-between text-left text-lg font-semibold leading-7 text-gray-900 hover:text-gray-950"
                  >
                    <span className="grow">{faq.question}</span>
                    <span className="ml-7 flex h-7 items-center">
                      {open ? (
                        <LuMinus className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <LuPlus className="h-6 w-6" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                  <Disclosure.Panel
                    as="dd"
                    className="mt-6 space-y-2 pr-12 text-base font-medium leading-7 text-gray-700"
                    unmount={false}
                  >
                    {faq.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </section>
  );
}
