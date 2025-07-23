import { z } from 'zod'

const commonFields = {
  name: z.string(),
  created: z.iso.datetime(),
  edited: z.iso.datetime(),
  url: z.url(),
}

export const peopleSchema = z.object({
  ...commonFields,
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
  homeworld: z.url(),
  films: z.array(z.url()),
  species: z.array(z.url()),
  vehicles: z.array(z.url()),
  starships: z.array(z.url()),
})

export const planetsSchema = z.object({
  ...commonFields,
  rotation_period: z.string(),
  orbital_period: z.string(),
  diameter: z.string(),
  climate: z.string(),
  gravity: z.string(),
  terrain: z.string(),
  surface_water: z.string(),
  population: z.string(),
  residents: z.array(z.url()),
  films: z.array(z.url()),
})

export const starshipsSchema = z.object({
  ...commonFields,
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: z.string(),
  length: z.string(),
  max_atmosphering_speed: z.string(),
  crew: z.string(),
  passengers: z.string(),
  cargo_capacity: z.string(),
  consumables: z.string(),
  hyperdrive_rating: z.string(),
  MGLT: z.string(),
  starship_class: z.string(),
  pilots: z.array(z.url()),
  films: z.array(z.url()),
})

export const vehiclesSchema = z.object({
  ...commonFields,
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: z.string(),
  length: z.string(),
  max_atmosphering_speed: z.string(),
  crew: z.string(),
  passengers: z.string(),
  cargo_capacity: z.string(),
  consumables: z.string(),
  vehicle_class: z.string(),
  pilots: z.array(z.url()),
  films: z.array(z.url()),
})

export const speciesSchema = z.object({
  ...commonFields,
  classification: z.string(),
  designation: z.string(),
  average_height: z.string(),
  skin_colors: z.string(),
  hair_colors: z.string(),
  eye_colors: z.string(),
  average_lifespan: z.string(),
  language: z.string(),
  homeworld: z.url().nullable(),
  people: z.array(z.url()),
  films: z.array(z.url()),
})

export const filmsSchema = z.object({
  title: z.string(),
  episode_id: z.number(),
  opening_crawl: z.string(),
  director: z.string(),
  producer: z.string(),
  release_date: z.coerce.date(),
  characters: z.array(z.url()),
  planets: z.array(z.url()),
  starships: z.array(z.url()),
  vehicles: z.array(z.url()),
  species: z.array(z.url()),
  created: z.iso.datetime(),
  edited: z.iso.datetime(),
  url: z.url(),
})

export type People = z.infer<typeof peopleSchema>
export type Planets = z.infer<typeof planetsSchema>
export type Starships = z.infer<typeof starshipsSchema>
export type Vehicles = z.infer<typeof vehiclesSchema>
export type Species = z.infer<typeof speciesSchema>
export type Films = z.infer<typeof filmsSchema>

export const CATEGORIES = ['people', 'planets', 'starships', 'vehicles', 'species', 'films'] as const
export type Category = (typeof CATEGORIES)[number]
