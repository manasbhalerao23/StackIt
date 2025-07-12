import { AnswerCard } from "./AnswerCard";

interface Answer {
  id: string;
  body: string;
  author: string;
  time: string;
  votes: number;
  comments: { id: string; author: string; text: string; time: string }[];
}

interface AnswerListProps {
  answers: Answer[];
  onComment: (answerId: string, comment: string) => void;
}

export const AnswerList = ({ answers, onComment }: AnswerListProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">{answers.length} Answers</h2>
      {answers.map((answer) => (
        <AnswerCard
          key={answer.id}
          {...answer}
          onComment={(comment) => onComment(answer.id, comment)}
        />
      ))}
    </div>
  );
};
