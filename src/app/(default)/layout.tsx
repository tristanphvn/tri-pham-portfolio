import React from 'react';

export default function DefaultLayout(props: { children: React.ReactNode }) {
  return <div className="min-h-screen w-full">{props.children}</div>;
}
