//create entity with postId, commentId, downvote (boolean), upvote (boolean), userId

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'votes' })
export class VoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  postId: number;

  @Column({ nullable: true })
  commentId: number;

  @Column()
  voteType: string;

  @Column()
  userId: number;

  //before insert, if postId && commentId are null, throw error
  beforeInsert() {
    if (this.postId === null && this.commentId === null) {
      throw new Error('Both postId and commentId cannot be null');
    }
  }
}
