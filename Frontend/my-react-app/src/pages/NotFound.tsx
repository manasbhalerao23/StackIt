import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};
