import ky from 'ky';
import type { ZodSchema } from 'zod';

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchWithZod<T>(
  url: string,
  schema: ZodSchema<T>,
  options?: RequestInit
) {
  const response = await api.get(url, options).json();
  return schema.parse(response);
}

export default api;
