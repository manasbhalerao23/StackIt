import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor } from "@mantine/tiptap";
import { Button } from "../Shared/Button";

interface AnswerFormProps {
  onSubmit: (htmlAnswer: string) => void;
}

export const AnswerForm = ({ onSubmit }: AnswerFormProps) => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const plainText = content.replace(/<[^>]+>/g, "").trim();
    if (!plainText) return;

    onSubmit(content);
    editor?.commands.clearContent();
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
      <h2 className="text-lg font-semibold text-gray-800">Your Answer</h2>

      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Strikethrough />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>

      <Button type="submit">Post Answer</Button>
    </form>
  );
};
