import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { basicAuth } from 'hono/basic-auth';
import { logger } from 'hono/logger';
import search from './routes/search.js';
const app = new Hono();

app.use('/*', cors());
app.use('/*', logger());

app.get('/', (c) => c.text('Star Wars API'));

app.use(
  '/search',
  // basicAuth({
  //   username: 'Luke',
  //   password: 'DadSucks',
  // }),
);

app.route('/search', search);

serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
