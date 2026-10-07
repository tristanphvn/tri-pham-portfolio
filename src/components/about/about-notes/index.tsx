import NoteList from '@/components/documents/note-list';

import SectionTitle from '../section-title';

const AboutNotes = () => {
  return (
    <section id="notes" aria-label="Notes" className="scroll-mt-24 pt-24">
      <SectionTitle>Notes</SectionTitle>
      <p className="mb-6 leading-relaxed text-muted">
        Working notes on the frameworks I use every day. My own cheat sheet,
        kept in public.
      </p>
      <NoteList />
    </section>
  );
};

export default AboutNotes;
