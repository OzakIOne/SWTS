import { createFileRoute } from '@tanstack/react-router';
import { DetailView } from '../components/DetailView';
import { DetailData } from '../utils/schemas';
import { z } from 'zod';
import { searchDetailQueryOptions } from '~/utils/swapi';

const validTypes = ['people', 'planets', 'starships', 'vehicles', 'species', 'films'] as const;

const RouteParamsSchema = z.object({
  type: z.enum(validTypes),
  id: z.string().regex(/^\d+$/, 'ID must be a number'),
});

export type RouteParams = z.infer<typeof RouteParamsSchema>;

export const Route = createFileRoute('/search_/$type/$id')({
  params: {
    parse: (params) => RouteParamsSchema.parse(params),
  },
  loader: async ({ context, params }) => {
    return await context.queryClient.ensureQueryData(
      searchDetailQueryOptions({ category: params.type, id: params.id }),
    );
  },
  component: DetailComponent,
});

function DetailComponent() {
  const detailData: DetailData = Route.useLoaderData();

  return (
    <div className="p-4">
      <DetailView detail={detailData} />
    </div>
  );
}

