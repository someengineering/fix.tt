import ArchitectureDiagram from '@/assets/diagrams/architecture.svg';

export default function HowFixWorks() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            className="mb-3 text-lg font-semibold uppercase leading-7 text-marian-blue-800 sm:text-xl"
            id="why"
          >
            How Fix works
          </h2>
          <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="text-lg leading-8 text-gray-600">
            <p className="mt-6">
              Fix collects raw metadata from cloud APIs and transforms it into
              structured security data. The Fix Security Graph shows
              relationships between resources, providing the context to
              understand critical risks and attack paths.
            </p>
          </div>
        </div>
        <ArchitectureDiagram className="mx-auto mt-8 max-w-2xl sm:mt-12 lg:max-w-none" />
      </div>
    </section>
  );
}
