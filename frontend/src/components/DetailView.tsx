import { Link } from '@tanstack/react-router';
import { Route } from '../routes/search_.$type.$id';
import { Films } from '../../../shared/src/schemas';
import { DetailData } from '~/utils/schemas';

type DetailFieldProps = {
  label: string;
  value: unknown;
};

const isFilmDetailData = (detail: DetailData): detail is { type: 'films'; data: Films } => {
  return detail.type === 'films';
};

export function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div className="col-span-2 grid grid-cols-2 gap-2">
      <span className="capitalize font-medium">{label.replace(/_/g, ' ')}:</span>
      <span className="text-base-content/70">
        {Array.isArray(value) ? (
          value.length > 0 ? (
            <span className="badge badge-ghost">{value.length} items</span>
          ) : (
            <span className="badge badge-ghost">None</span>
          )
        ) : typeof value === 'object' && value !== null ? (
          JSON.stringify(value)
        ) : (
          String(value)
        )}
      </span>
    </div>
  );
}

export function DetailView({ detail }: { detail: DetailData }) {
  const displayTitle = isFilmDetailData(detail) ? detail.data.title : detail.data.name;
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {displayTitle}
          <div className="badge badge-secondary">{detail.type}</div>
        </h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {Object.entries(detail.data)
            .filter(([key]) => !['name', 'url', 'created', 'edited'].includes(key))
            .map(([key, value]) => (
              <DetailField key={key} label={key} value={value} />
            ))}
        </div>
        <div className="card-actions justify-end mt-4">
          <Link to="/search" search={Route.useSearch()} className="btn btn-outline btn-sm">
            Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
}

