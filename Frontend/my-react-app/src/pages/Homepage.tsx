import { QuestionCard } from "../components/question/QuestionCard";

const dummyQuestions = [
  {
    id: "1",
    title: "How does useEffect work in React?",
    description: "I'm confused about the dependency array. Can someone explain how it works?",
    tags: ["react", "hooks"],
    votes: 12,
    answers: 3,
    askedBy: "Jane Doe",
    time: "2 hours ago",
  },
  {
    id: "2",
    title: "What is MongoDB's aggregation pipeline?",
    description: "I’ve seen terms like $group, $match. How does aggregation work in practice?",
    tags: ["mongodb", "database"],
    votes: 5,
    answers: 1,
    askedBy: "Tom",
    time: "4 hours ago",
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
  },
];

export const HomePage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Top Questions</h1>
      <div className="space-y-6">
        {dummyQuestions.map((q) => (
          <QuestionCard key={q.id} {...q} />
        ))}
      </div>
    </div>
  );
};
