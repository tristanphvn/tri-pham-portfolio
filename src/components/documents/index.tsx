import NoteList from './note-list';

const DocumentScreen = () => {
  return (
    <section className="animate-fade-up">
      <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">Notes</h1>
      <p className="mt-3 font-serif text-2xl italic text-muted">
        on the tools I use every day
      </p>
      <p className="mb-12 mt-6 max-w-lg leading-relaxed text-muted">
        These are my working notes. They stay short and opinionated and they
        change as I learn. Use them as a starting point; the official docs still
        have the last word.
      </p>
      <NoteList />
    </section>
  );
};

export default DocumentScreen;
