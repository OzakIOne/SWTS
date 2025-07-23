import { Link } from '@tanstack/react-router';
import {
  Films,
  People,
  Planets,
  Species,
  Starships,
  Vehicles,
  Category,
} from '../../../shared/src/schemas';

type ResultCardProps = {
  item: {
    type: Category;
    details: People | Planets | Starships | Vehicles | Species | Films;
  };
  searchQuery?: string;
};

export function ResultCard({ item, searchQuery }: ResultCardProps) {
  const id = item.details.url.match(/\/(\d+)\/?$/)?.[1]!;
  const title = 'name' in item.details ? item.details.name : item.details.title;
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h3 className="card-title">
          {title}
          <div className="badge badge-secondary">{item.type}</div>
        </h3>
        <div className="card-actions justify-end">
          <Link
            to="/search/$type/$id"
            params={{ type: item.type, id }}
            search={{ q: searchQuery }}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
