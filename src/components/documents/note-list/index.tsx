import Link from 'next/link';

import { notes } from '@/data/profile';

const NoteList = () => {
  return (
    <ul className="group/list">
      {notes.map((note) => {
        const body = (
          <>
            <div className="flex items-baseline justify-between gap-x-4">
              <h3 className="font-medium">
                {note.title}
                {!note.soon && (
                  <span className="ml-1.5 inline-block text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                    ↗
                  </span>
                )}
              </h3>
              <span className="shrink-0 text-sm text-muted">
                {note.caption}
              </span>
            </div>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
              {note.description}
            </p>
          </>
        );

        const rowClass =
          '-mx-4 block rounded-2xl px-4 py-5 transition-[background-color,opacity] duration-300';

        return (
          <li key={note.title}>
            {note.soon ? (
              <div className={`${rowClass} opacity-50`}>{body}</div>
            ) : (
              <Link
                href={note.href}
                className={`group ${rowClass} hover:bg-fg/[0.035] lg:hover:!opacity-100 lg:group-hover/list:opacity-50`}
              >
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;
