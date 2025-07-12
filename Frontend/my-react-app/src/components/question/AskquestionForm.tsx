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

export const AskQuestionForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

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

    const newQuestion = {
      title,
      body: editor?.getHTML() || "",
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    console.log("Submitted:", newQuestion);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-xl font-bold text-gray-800">Ask a Question</h2>

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

      <Button type="submit">Submit Question</Button>
    </form>
  );
};
