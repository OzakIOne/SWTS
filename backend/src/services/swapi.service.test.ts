import { describe, it, expect } from 'vitest';
import { SwapiService } from './swapi.service.ts';

describe('SwapiService', () => {
  it('should search across all resources', async () => {
    const service = new SwapiService();
    const results = await service.searchAll('skywalker');

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty('details');
    expect(results[0]).toHaveProperty('type');
  });

  it('should handle invalid responses', async () => {
    const service = new SwapiService();
    const results = await service.searchAll('qqqqqqq');

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBe(0);
  });

  it('should correctly identify resource types', async () => {
    const service = new SwapiService();
    const results = await service.searchAll('death star');

    const starship = results.find((r) => r.type === 'starships');
    expect(starship).toBeDefined();
    expect(starship?.details?.name).toContain('Death Star');
  });
});
