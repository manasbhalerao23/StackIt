import { useSelector } from "react-redux";
import { QuestionCard } from "../question/QuestionCard";
import type { RootState } from "../../store";

const mockQuestions = [
  {
    id: "1",
    title: "What is useEffect in React?",
    description: "Trying to understand how useEffect behaves...",
    tags: ["react", "hooks"],
    votes: 5,
    answers: 2,
    askedBy: "You",
    time: "2 days ago",
  },
];

const mockAnswers = [
  {
    questionId: "101",
    questionTitle: "What is event bubbling in JavaScript?",
    answerText: "Event bubbling is the concept where events propagate upward...",
    time: "1 day ago",
    votes: 3,
  },
];

export const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return (
      <div className="text-center mt-12 text-gray-500">
        You must be logged in to view this page.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Your Profile</h1>

      {/* User Info */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold">User Info</h2>
        <p className="mt-2">
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Role:</span> {user.role ?? "user"}
        </p>
      </div>

      {/* Questions Asked */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Your Questions</h2>
        <div className="space-y-4">
          {mockQuestions.map((q) => (
            <QuestionCard key={q.id} {...q} />
          ))}
        </div>
      </div>

      {/* Answers Given */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Your Answers</h2>
        <div className="space-y-4 text-sm bg-white p-4 rounded shadow">
          {mockAnswers.map((a) => (
            <div key={a.questionId}>
              <p className="text-blue-700 font-medium">{a.questionTitle}</p>
              <p className="text-gray-700 mt-1">{a.answerText}</p>
              <p className="text-gray-500 text-xs mt-1">
                Votes: {a.votes} • {a.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
