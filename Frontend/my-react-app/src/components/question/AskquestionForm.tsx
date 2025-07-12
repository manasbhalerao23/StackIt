import { useState } from "react";
import { Input } from "../Shared/Input";
import { Button } from "../Shared/Button";
import { useNavigate } from "react-router-dom";
import {
  RichTextEditor,
  Link,
} from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import axios from "axios";

export const AskQuestionForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", editor?.getHTML() || "");
    formData.append("tags", JSON.stringify(tags.split(",").map(tag => tag.trim())));
    files.forEach((file) => formData.append("images", file));

    try {
      const res = await axios.post(
        "http://localhost:3000/api/qa/createQuestion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // required to send cookies
        }
      );

      console.log("Submitted:", res.data);
      navigate("/");
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit question. Please login.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-xl font-bold text-gray-800">Ask a Question</h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. How does useEffect work in React?"
        required
      />

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Body</label>
        <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar sticky>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.Underline />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Blockquote />
              <RichTextEditor.Link />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content className="min-h-[200px]" />
        </RichTextEditor>
      </div>

      <Input
        label="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="react, hooks, javascript"
      />

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Upload Images (optional)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const selectedFiles = Array.from(e.target.files || []);
            setFiles(selectedFiles);
          }}
          className="block w-full text-sm text-gray-700"
        />
      </div>

      <Button type="submit">Submit Question</Button>
    </form>
  );
};
