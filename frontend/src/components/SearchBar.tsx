import { useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useDebouncer } from '@tanstack/react-pacer/debouncer';

type SearchBarProps = {
  initialQuery: string;
};

export function SearchBar({ initialQuery }: SearchBarProps) {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      query: initialQuery,
    },
    onSubmit: ({ value }) => {
      const val = value.query.trim();
      if (!val) return;
      navigate({
        to: '/search',
        search: { q: val },
      });
    },
  });

  const setDebouncedQuery = useDebouncer(
    (value: string) => {
      if (!value.trim()) return;
      navigate({
        to: '/search',
        search: { q: value },
      });
    },
    {
      wait: 1000,
      enabled: () => form.state.values.query.length > 2,
    },
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDebouncedQuery.flush();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="query"
        children={(field) => (
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </g>
            </svg>
            <input
              type="search"
              className="grow"
              value={field.state.value}
              onChange={(e) => {
                const val = e.target.value;
                field.handleChange(val);
                setDebouncedQuery.maybeExecute(val);
              }}
              placeholder="Search"
            />
          </label>
        )}
      />
    </form>
  );
}
