'use client';

export default function DefaultLayout(props: { children: React.ReactNode }) {
  return <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>;
}
