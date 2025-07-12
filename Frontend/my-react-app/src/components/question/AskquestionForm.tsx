import { useState } from "react";
import { Input } from "../Shared/Input";
import { TextArea } from "../Shared/TextArea";
import { Button } from "../Shared/Button";
import { useNavigate } from "react-router-dom";

export const AskQuestionForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newQuestion = {
      title,
      body,
      tags: tags.split(",").map(tag => tag.trim()),
    };

    // You'd post to the backend here
    console.log("Submitted:", newQuestion);
    navigate("/"); // Redirect to homepage after submit
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800">Ask a Question</h2>
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. How does useEffect work in React?"
        required
      />
      <TextArea
        label="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Explain the problem in detail..."
        required
      />
      <Input
        label="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="react, hooks, javascript"
      />
      <Button type="submit">Submit Question</Button>
    </form>
  );
};
