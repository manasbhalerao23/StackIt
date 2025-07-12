import { useState } from "react";

interface CommentInputProps {
  onAddComment: (comment: string) => void;
}

export const CommentInput = ({ onAddComment }: CommentInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        type="text"
        className="w-full border rounded px-2 py-1 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
      />
    </form>
  );
};
