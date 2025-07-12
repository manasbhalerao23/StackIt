interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

interface CommentListProps {
  comments: Comment[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="mt-2 space-y-1 text-sm text-gray-600">
      {comments.map((comment) => (
        <div key={comment.id} className="border-l-2 pl-2">
          <span className="font-medium">{comment.author}</span>: {comment.text}
          <span className="ml-2 text-xs text-gray-400">• {comment.time}</span>
        </div>
      ))}
    </div>
  );
};
