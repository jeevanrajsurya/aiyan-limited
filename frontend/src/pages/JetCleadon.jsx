export default function JetCleadon() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-ink mb-4">Jet Cleadon</h1>
      <p className="text-ink/70 mb-8 max-w-xl">
        Fuel up and grab everything you need in one stop. Jet Cleadon is our forecourt store,
        open daily.
      </p>
      <div className="rounded-2xl overflow-hidden border border-brand-100">
        <iframe
          title="Jet Cleadon location"
          width="100%"
          height="360"
          style={{ border: 0 }}
          loading="lazy"
          src="https://www.google.com/maps?q=Jet+Cleadon&output=embed"
        />
      </div>
      <a
        href="https://www.just-eat.co.uk/restaurants-londis---cleadon-cleadon/menu"
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-8 px-6 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors"
      >
        Order online via Just Eat
      </a>
    </div>
  );
}
