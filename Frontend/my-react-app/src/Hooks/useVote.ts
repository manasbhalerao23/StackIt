import { useState } from "react";

export const useVote = (initialVotes: number = 0) => {
  const [votes, setVotes] = useState(initialVotes);

  const upvote = () => setVotes((v) => v + 1);
  const downvote = () => setVotes((v) => v - 1);

  return { votes, upvote, downvote };
};
