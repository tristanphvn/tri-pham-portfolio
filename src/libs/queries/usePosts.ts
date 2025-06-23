import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { fetchWithZod } from '../kyClient';

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const PostsSchema = z.array(PostSchema);

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchWithZod('/posts', PostsSchema),
  });
}
