import xior from 'xior';
import {
  swapiResourceSchemas,
  type SwapiResponse,
  type UnifiedSearchResult,
  type SwapiResource,
  swapiApiResponseSchema,
} from '../utils/schemas.js';
import { type Category, CATEGORIES } from '../../../shared/src/schemas.js';

const SWAPI_BASE_URL = 'https://swapi.info/api';

export class SwapiService {
  private filterByQuery(resource: SwapiResource, query: string) {
    const lowerQuery = query.toLowerCase();
    const label = 'title' in resource ? resource.title : resource.name;
    return label.toLowerCase().includes(lowerQuery);
  }

  private async searchCategory(category: Category, query: string) {
    const url = `${SWAPI_BASE_URL}/${category}`;
    const categorySchema = swapiResourceSchemas[category];

    try {
      const swapiApiResponse = await xior.get<SwapiResponse<SwapiResource>>(url);
      const validatedData = swapiApiResponseSchema(categorySchema).safeParse(swapiApiResponse.data);
      if (!validatedData.success) {
        console.warn(`Failed to parse response for category ${category}:`, validatedData.error);
        throw new Error(`Invalid response for category ${category}`);
      }

      const filtered = validatedData.data.filter((resource) => this.filterByQuery(resource, query));

      return {
        count: filtered.length,
        results: filtered,
      };
    } catch (error) {
      console.error(`Unknown error searching ${category}:`, error);
      throw error;
    }
  }

  private mapResourceToUnified(resource: SwapiResource, category: Category): UnifiedSearchResult {
    return {
      type: category,
      details: resource,
    };
  }

  async searchAll(query: string) {
    const searchPromises = CATEGORIES.map((category) => this.searchCategory(category, query));
    const results = await Promise.allSettled(searchPromises);

    return results.flatMap((result, index) => {
      if (result.status !== 'fulfilled') {
        console.error(`Search failed for ${CATEGORIES[index]}:`, result);
        return [];
      }

      return result.value.results.map((resource) =>
        this.mapResourceToUnified(resource, CATEGORIES[index]),
      );
    });
  }
}
