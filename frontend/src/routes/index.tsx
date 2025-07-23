import { createFileRoute, Link } from '@tanstack/react-router';
export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 ">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Star Wars Rebels Alliance Search System</h1>
        <p className="text-xl  mb-8">
          Search across the galaxy for information about people, starships, and planets
        </p>
      </div>

      <Link to="/search" className="btn btn-primary mb-4">
        Search
      </Link>
    </div>
  );
}
