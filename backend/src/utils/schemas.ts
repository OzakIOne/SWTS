import { z } from 'zod';
import {
  type People,
  type Starships,
  type Vehicles,
  type Species,
  type Films,
  type Planets,
  type Category,
  filmsSchema,
  peopleSchema,
  planetsSchema,
  speciesSchema,
  starshipsSchema,
  vehiclesSchema,
} from '../../../shared/src/schemas.js';

export type SwapiResource = People | Planets | Starships | Vehicles | Species | Films;

export type SwapiResponse<T> = {
  results: T[];
};

export type UnifiedSearchResult = {
  type: Category;
  details: SwapiResource;
};

export const swapiResourceSchemas = {
  people: peopleSchema,
  planets: planetsSchema,
  starships: starshipsSchema,
  vehicles: vehiclesSchema,
  species: speciesSchema,
  films: filmsSchema,
} as const;

export const swapiApiResponseSchema = <T extends z.ZodType>(itemSchema: T) => z.array(itemSchema);

export const searchSchema = z.object({
  q: z.string().min(1).max(100),
});
