import ArchitectureDiagram from '@/assets/diagrams/architecture.svg';

export default function HowFixWorks() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-3 text-lg font-semibold uppercase leading-7 text-marian-blue-800 sm:text-xl"
            id="how"
          >
            How Fix works
          </h2>
          <p className="mx-auto mt-2 max-w-prose font-display text-4xl font-medium uppercase text-marian-blue-900 sm:text-5xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="relative mx-auto max-w-prose text-lg leading-8 text-gray-600">
          <p className="mt-6">
            <strong>
              Fix collects raw metadata from cloud APIs and transforms it into
              structured security data.
            </strong>{' '}
            The Fix Security Graph shows relationships between resources,
            providing the context to understand critical risks and attack paths.
          </p>
        </div>
        <ArchitectureDiagram className="mx-auto mt-8 max-w-2xl sm:mt-12 lg:max-w-none" />
      </div>
    </section>
  );
}
