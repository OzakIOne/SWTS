import { queryOptions } from '@tanstack/react-query';
import { backendSearchResponseSchema, DetailDataSchema } from './schemas';
import { Category } from '../../../shared/src/schemas';

const API_BASE_URL = 'http://localhost:3001';
const SWAPI_BASE_URL = 'https://swapi.info/api';

export const searchQueryOptions = (query: string | undefined) =>
  queryOptions({
    queryKey: ['search', query],
    enabled: !!query,
    queryFn: async () => {
      if (!query) return { count: 0, results: [] };

      console.info(`Searching Star Wars data for "${query}"...`);

      try {
        const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);

        if (!res.ok) {
          if (res.status === 404) {
            return { count: 0, results: [] };
          }
          const message = `Search failed: ${res.status} ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();
        const parsed = backendSearchResponseSchema.safeParse(data);

        if (!parsed.success) {
          throw new Error('There was an error processing the search results', {
            cause: parsed.error,
          });
        }

        return parsed.data;
      } catch (error) {
        throw error instanceof Error ? error : new Error('Search failed');
      }
    },
  });

export const searchDetailQueryOptions = ({ id, category }: { id: string; category: Category }) =>
  queryOptions({
    queryKey: ['search', id, category],
    enabled: !!id && !!category,
    queryFn: async () => {
      try {
        const res = await fetch(`${SWAPI_BASE_URL}/${category}/${id}`, {
          mode: 'cors',
        });
        if (!res.ok) {
          if (res.status === 404) {
            return { count: 0, results: [] };
          }
          const message = `Search failed: ${res.status} ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();
        const parsed = DetailDataSchema.safeParse({
          type: category,
          data,
        });

        if (!parsed.success) {
          throw new Error('There was an error processing the search results', {
            cause: parsed.error,
          });
        }

        return parsed.data;
      } catch (error) {
        throw error instanceof Error ? error : new Error('Search failed');
      }
    },
  });
