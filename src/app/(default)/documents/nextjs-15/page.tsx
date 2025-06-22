import { promises as fs } from 'fs';
import path from 'path';

import MarkdownReader from '@/components/markdown-reader';

async function getMarkdownContent() {
  try {
    const filePath = path.join(
      process.cwd(),
      'src/data/markdown/nextjs15-docs.md'
    );
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return '# Error\nCould not load the documentation.';
  }
}

export default async function NextJS15DocsPage() {
  const content = await getMarkdownContent();

  return <MarkdownReader content={content} title="Next.js 15 Documentation" />;
}
