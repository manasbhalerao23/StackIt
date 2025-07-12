import { VotePanel } from "../Shared/VotePanel";
import { Avatar } from "../Shared/Avatar";
import { CommentList } from "./CommentList";
import { CommentInput } from "./CommentInput";

interface AnswerCardProps {
  id: string;
  body: string;
  author: string;
  time: string;
  votes: number;
  comments: { id: string; author: string; text: string; time: string }[];
  onComment: (comment: string) => void;
}

export const AnswerCard = ({
  body,
  author,
  time,
  votes,
  comments,
  onComment,
}: AnswerCardProps) => {
  return (
    <div className="flex gap-4 border-t pt-4 mt-4">
      <VotePanel votes={votes} onUpvote={() => {}} onDownvote={() => {}} />
      <div className="flex-1">
        <p className="text-gray-800">{body}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-2">
            <Avatar name={author} size={28} />
            <span>Answered by {author}</span>
          </div>
          <span>{time}</span>
        </div>
        <CommentList comments={comments} />
        <CommentInput onAddComment={onComment} />
      </div>
    </div>
  );
};
