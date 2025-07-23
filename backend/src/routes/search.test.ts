import { describe, it, expect } from 'vitest';
import app from './search';

describe('Search API', () => {
  it('should return 400 when query is missing', async () => {
    const res = await app.request('/');
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toMatchInlineSnapshot(`
      {
        "message": "[
        {
          "expected": "string",
          "code": "invalid_type",
          "path": [
            "q"
          ],
          "message": "Invalid input: expected string, received undefined"
        }
      ]",
        "name": "ZodError",
      }
    `);
  });

  it('should return 404 when no results found', async () => {
    const res = await app.request('/?q=nonexistentquery');
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.query).toBe('nonexistentquery');
    expect(json.count).toBe(0);
    expect(json.results).toEqual([]);
    expect(json.message).toBe('No results found');
  });

  it('should return results when found', async () => {
    const res = await app.request('/?q=luke');
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toMatchInlineSnapshot(`
      {
        "count": 1,
        "query": "luke",
        "results": [
          {
            "details": {
              "birth_year": "19BBY",
              "created": "2014-12-09T13:50:51.644000Z",
              "edited": "2014-12-20T21:17:56.891000Z",
              "eye_color": "blue",
              "films": [
                "https://swapi.info/api/films/1",
                "https://swapi.info/api/films/2",
                "https://swapi.info/api/films/3",
                "https://swapi.info/api/films/6",
              ],
              "gender": "male",
              "hair_color": "blond",
              "height": "172",
              "homeworld": "https://swapi.info/api/planets/1",
              "mass": "77",
              "name": "Luke Skywalker",
              "skin_color": "fair",
              "species": [],
              "starships": [
                "https://swapi.info/api/starships/12",
                "https://swapi.info/api/starships/22",
              ],
              "url": "https://swapi.info/api/people/1",
              "vehicles": [
                "https://swapi.info/api/vehicles/14",
                "https://swapi.info/api/vehicles/30",
              ],
            },
            "type": "people",
          },
        ],
        "success": true,
      }
    `);
  });

  it('should validate query length', async () => {
    const longQuery = 'a'.repeat(101);
    const res = await app.request(`/?q=${longQuery}`);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toMatchInlineSnapshot(`
      {
        "error": {
          "message": "[
        {
          "origin": "string",
          "code": "too_big",
          "maximum": 100,
          "inclusive": true,
          "path": [
            "q"
          ],
          "message": "Too big: expected string to have <=100 characters"
        }
      ]",
          "name": "ZodError",
        },
        "success": false,
      }
    `);
  });
});
