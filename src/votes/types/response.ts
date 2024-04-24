export interface VoteResponseInterface {
  id: number;
  postId: number;
  commentId: number;
  userId: number;
  voteType: string;
}

export interface VotesResponseInterface {
  votes: VoteResponseInterface[];
}
