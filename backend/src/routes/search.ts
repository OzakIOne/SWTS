import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { SwapiService } from '../services/swapi.service.js';
import { searchSchema } from '../utils/schemas.js';
import z from 'zod';

const app = new Hono();

app.get('/', zValidator('query', searchSchema), async (c) => {
  const { q } = c.req.valid('query');
  console.log('Received search request for:', q);

  const swapiService = new SwapiService();
  try {
    const results = await swapiService.searchAll(q);

    if (results.length === 0) {
      return c.json(
        {
          success: true,
          query: q,
          count: 0,
          results: [],
          message: 'No results found',
        },
        404,
      );
    }

    console.log(`Found ${results.length} results for query: ${q}`);

    return c.json({
      success: true,
      query: q,
      count: results.length,
      results,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          error: 'Invalid search query format',
          details: z.treeifyError(error),
        },
        400,
      );
    }

    return c.json(
      {
        success: false,
        error: `Internal server error`,
        details: error,
      },
      500,
    );
  }
});

export default app;
