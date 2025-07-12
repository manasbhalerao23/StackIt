import { useState } from "react";
import { Link } from "react-router-dom";
import { Tag } from "../Shared/Tag";
import { Badge } from "../Shared/Badge";
import { VotePanel } from "../Shared/VotePanel";

interface QuestionCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  votes: number;
  answers: number;
  askedBy: string;
  time: string;
  images: string[];
}

export const QuestionCard = ({
  id,
  title,
  description,
  tags,
  votes,
  answers,
  askedBy,
  time,
  images = []
}: QuestionCardProps) => {
  const [voteCount, setVoteCount] = useState(votes);

  const handleUpvote = () => {
    setVoteCount((prev) => prev + 1);
    // await axios.post(`/api/vote/upvote`, { questionId: id })
  };

  const handleDownvote = () => {
    setVoteCount((prev) => prev - 1);
    // await axios.post(`/api/vote/downvote`, { questionId: id })
  };

  return (
    <div className="flex border-b py-4 gap-4">
      <VotePanel
        votes={voteCount}
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
      />
      <div className="flex-1">
        <Link to={`/question/${id}`} className="text-lg font-semibold text-blue-700 hover:underline">
          {title}
        </Link>
        <p className="text-sm text-gray-600 mt-1">{description.slice(0, 120)}...</p>

         {/* Image preview */}
        {images.length > 0 && (
          <div className="flex gap-2 mt-2">
            {images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`question-${id}-img-${index}`}
                className="w-24 h-16 object-cover rounded"
              />
            ))}
          </div>
        )}

        <div className="flex gap-2 flex-wrap mt-2">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <div>
            <Badge label={`${answers} answers`} variant={answers > 0 ? "success" : "default"} />
          </div>
          <div>
            asked by <span className="font-medium">{askedBy}</span> • {time}
          </div>
        </div>
      </div>
    </div>
  );
};
