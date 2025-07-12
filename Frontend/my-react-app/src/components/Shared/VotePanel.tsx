import { ThumbsUp, ThumbsDown } from "lucide-react";

interface VotePanelProps {
  votes: number;
  onUpvote: () => void;
  onDownvote: () => void;
}

export const VotePanel = ({ votes, onUpvote, onDownvote }: VotePanelProps) => {
  return (
    <div className="flex flex-col items-center text-gray-600">
      <button onClick={onUpvote} className="hover:text-blue-600">
        <ThumbsUp size={20} />
      </button>
      <span className="my-1 font-medium">{votes}</span>
      <button onClick={onDownvote} className="hover:text-red-600">
        <ThumbsDown size={20} />
      </button>
    </div>
  );
};
