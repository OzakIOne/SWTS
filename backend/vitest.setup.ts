import { vi } from 'vitest'

// Mock de SwapiService
vi.mock('./src/services/swapi.service', () => ({
  SwapiService: class MockSwapiService {
    searchAll = vi.fn()
  },
}))
