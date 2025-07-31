import {
  Outlet,
  createFileRoute,
  redirect,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router';
import { searchQueryOptions } from '~/utils/swapi';
import { SearchBar } from '~/components/SearchBar';
import { ResultCard } from '~/components/ResultCard';
import { CategoryTabs } from '~/components/CategoryTabs';
import { CategoryFilter, RouteSearchSchema, SearchResult } from '~/utils/schemas';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export const Route = createFileRoute('/search')({
  validateSearch: RouteSearchSchema,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' });
    }

    // `context.queryClient` is also available in our loaders
    // https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query
    // https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
  },
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ context, deps: { q } }) => {
    if (!q) {
      return { query: null };
    }

    return {
      query: await context.queryClient.ensureQueryData(searchQueryOptions(q)),
    };
  },
  component: SearchComponent,
});

function LoadingState() {
  return (
    <div className="flex justify-center items-center h-32">
      <span className="loading loading-spinner loading-lg" />
      <span className="ml-4">Loading results...</span>
    </div>
  );
}

function NoResults({ type }: { type: CategoryFilter }) {
  return (
    <div className="alert alert-info">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{type === 'all' ? 'No results found' : `No ${type} found`}</span>
    </div>
  );
}

function SearchResults({
  count,
  q,
  type,
  filteredResults,
  onTypeChange,
}: {
  count: number;
  q: string;
  type: CategoryFilter;
  filteredResults: SearchResult[];
  onTypeChange: (t: CategoryFilter) => void;
}) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredResults.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 140,
    overscan: 10,
  });

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <h2 className="card-title">
            Found {count} results for "{q}"
          </h2>
          <CategoryTabs selectedType={type} onChange={onTypeChange} />
        </div>

        {filteredResults.length > 0 ? (
          <div ref={parentRef} className="relative h-[600px] overflow-auto">
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const item = filteredResults[virtualRow.index];
                return (
                  <div
                    key={item.details.url}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <ResultCard item={item} searchQuery={q} />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <NoResults type={type} />
        )}
      </div>
    </div>
  );
}

function SearchComponent() {
  const { query } = Route.useLoaderData();
  const { q, type } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { isLoading } = useRouterState();

  const filteredResults =
    query?.results.filter((item) => (type === 'all' ? true : item.type === type)) ?? [];

  const handleTypeChange = (newType: CategoryFilter) => {
    navigate({ search: (prev) => ({ ...prev, type: newType }) });
  };

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <SearchBar initialQuery={q} />
      </div>

      {isLoading ? (
        <LoadingState />
      ) : q && query ? (
        <SearchResults
          count={query.count}
          q={q}
          type={type}
          filteredResults={filteredResults}
          onTypeChange={handleTypeChange}
        />
      ) : null}

      <Outlet />
    </div>
  );
}

