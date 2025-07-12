import { useParams } from "react-router-dom";
import { VotePanel } from "../Shared/VotePanel";
import { Tag } from "../Shared/Tag";
import { Avatar } from "../Shared/Avatar";

export const QuestionDetail = () => {
  useParams();

  // Mock data - replace with fetched data
  const question = {
    title: "How does useEffect work in React?",
    body: "I am confused about the dependency array...",
    tags: ["react", "hooks"],
    votes: 7,
    askedBy: "Alice",
    time: "2 hours ago",
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex gap-4">
        <VotePanel votes={question.votes} onUpvote={() => {}} onDownvote={() => {}} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{question.title}</h1>
          <p className="mt-2 text-gray-700">{question.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Avatar name={question.askedBy} />
              <span>Asked by {question.askedBy}</span>
            </div>
            <span>{question.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
