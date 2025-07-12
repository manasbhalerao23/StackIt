import { useParams } from "react-router-dom";
import { QuestionDetail } from "../components/question/QuestionDetail";
import { AnswerForm } from "../components/question/AnswerForm";
import { AnswerList } from "../components/question/AnswerList";
import { useState } from "react";

// 🔶 This would be fetched from your API
const dummyQuestion = {
  id: "1",
  title: "How does useEffect work in React?",
  body: "I’m confused about the dependency array. Can someone explain how it works in detail?",
  tags: ["react", "hooks", "lifecycle"],
  votes: 10,
  askedBy: "Jane Doe",
  time: "3 hours ago",
};

const dummyAnswers = [
  {
    id: "a1",
    body: "useEffect runs after render. You can control when it runs using the dependency array.",
    author: "John Smith",
    time: "2 hours ago",
    votes: 5,
    comments: [
      { id: "c1", author: "Alice", text: "That helped a lot!", time: "1h ago" },
    ],
  },
  {
    id: "a2",
    body: "Think of useEffect as replacing lifecycle methods like componentDidMount.",
    author: "Bob",
    time: "1 hour ago",
    votes: 2,
    comments: [],
  },
];

export const QuestionPage = () => {
  const { id } = useParams();
  const [answers, setAnswers] = useState(dummyAnswers);

  const handlePostAnswer = (text: string) => {
    const newAnswer = {
      id: Math.random().toString(),
      body: text,
      author: "You",
      time: "just now",
      votes: 0,
      comments: [],
    };
    setAnswers([newAnswer, ...answers]);
  };

  const handleComment = (answerId: string, commentText: string) => {
    setAnswers((prev) =>
      prev.map((a) =>
        a.id === answerId
          ? {
              ...a,
              comments: [
                ...a.comments,
                {
                  id: Math.random().toString(),
                  author: "You",
                  text: commentText,
                  time: "just now",
                },
              ],
            }
          : a
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <QuestionDetail />
      <AnswerList answers={answers} onComment={handleComment} />
      <AnswerForm onSubmit={handlePostAnswer} />
    </div>
  );
};
