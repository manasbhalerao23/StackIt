import { useState } from "react";
import { QuestionCard } from "../components/question/QuestionCard";

const dummyQuestions = [
  {
    id: "1",
    title: "How does useEffect work in React?",
    description: "I'm confused about the dependency array. Can someone explain how it works?",
    tags: ["react", "hooks"],
    votes: 12,
    answers: 3,
    askedBy: "Rahul",
    time: "2 hours ago",
    images: ["https://reactjs.org/logo-og.png"],
  },
  {
    id: "2",
    title: "What is MongoDB's aggregation pipeline?",
    description: "I’ve seen terms like $group, $match. How does aggregation work in practice?",
    tags: ["mongodb", "database"],
    votes: 5,
    answers: 1,
    askedBy: "Elon",
    time: "4 hours ago",
    images: ["https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png"],
  },
  {
    id: "3",
    title: "How to deploy a MERN app on Vercel?",
    description: "Frontend works on Vercel, but how do I host the backend securely?",
    tags: ["deployment", "vercel", "mern"],
    votes: 3,
    answers: 0,
    askedBy: "Sara",
    time: "6 hours ago",
    images: ["https://assets.vercel.com/image/upload/v1607554385/repositories/next-js/next-js.png"],
  },
  {
    id: "4",
    title: "What is Redux Toolkit?",
    description: "Is Redux Toolkit a replacement for traditional Redux setup?",
    tags: ["redux", "state-management"],
    votes: 8,
    answers: 2,
    askedBy: "Anjali",
    time: "1 day ago",
    images: ["https://redux.js.org/img/redux-logo-landscape.png"],
  },
];


export const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const totalPages = Math.ceil(dummyQuestions.length / pageSize);
  const paginatedQuestions = dummyQuestions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Top Questions</h1>

      <div className="space-y-6">
        {paginatedQuestions.map((q) => (
          <QuestionCard key={q.id} {...q} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
