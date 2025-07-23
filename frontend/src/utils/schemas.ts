import { z } from 'zod';
import {
  CATEGORIES,
  filmsSchema,
  peopleSchema,
  planetsSchema,
  speciesSchema,
  starshipsSchema,
  vehiclesSchema,
} from '../../../shared/src/schemas';

export const searchResultSchema = z.object({
  success: z.boolean(),
  query: z.string(),
  count: z.number(),
  results: z.array(
    z.discriminatedUnion('type', [
      z.object({
        type: z.literal('people'),
        data: peopleSchema,
      }),
      z.object({
        type: z.literal('planets'),
        data: planetsSchema,
      }),
      z.object({
        type: z.literal('starships'),
        data: starshipsSchema,
      }),
      z.object({
        type: z.literal('vehicles'),
        data: vehiclesSchema,
      }),
      z.object({
        type: z.literal('species'),
        data: speciesSchema,
      }),
      z.object({
        type: z.literal('films'),
        data: filmsSchema,
      }),
    ]),
  ),
});

export const DetailDataSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('people'), data: peopleSchema }),
  z.object({ type: z.literal('planets'), data: planetsSchema }),
  z.object({ type: z.literal('starships'), data: starshipsSchema }),
  z.object({ type: z.literal('vehicles'), data: vehiclesSchema }),
  z.object({ type: z.literal('species'), data: speciesSchema }),
  z.object({ type: z.literal('films'), data: filmsSchema }),
]);

export type DetailData = z.infer<typeof DetailDataSchema>;

const searchResultItemSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('people'),
    details: peopleSchema,
  }),
  z.object({
    type: z.literal('planets'),
    details: planetsSchema,
  }),
  z.object({
    type: z.literal('starships'),
    details: starshipsSchema,
  }),
  z.object({
    type: z.literal('vehicles'),
    details: vehiclesSchema,
  }),
  z.object({
    type: z.literal('species'),
    details: speciesSchema,
  }),
  z.object({
    type: z.literal('films'),
    details: filmsSchema,
  }),
]);
export type SearchResult = z.infer<typeof searchResultItemSchema>;

export const backendSearchResponseSchema = z.object({
  success: z.boolean(),
  query: z.string(),
  count: z.number(),
  results: z.array(searchResultItemSchema),
});

export const categoryFilterList = ['all', ...CATEGORIES] as const;
export type CategoryFilter = (typeof categoryFilterList)[number];

export const CategorySchema = z.enum(CATEGORIES);
export const CategoryFilterSchema = z.enum(categoryFilterList);
export const RouteSearchSchema = z.object({
  q: z.string().optional().default(''),
  type: CategoryFilterSchema.default('all'),
});
