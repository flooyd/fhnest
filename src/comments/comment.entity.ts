import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  content: string;

  @Column()
  authorId: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

//I will record 5-10 minutes of me working on this so you can see how copilot works.

//This is the entity for the comment table. It has a primary key, content, authorId, createdAt, and updatedAt columns.

//Now I will work on the data transfer object for it.

//Both DTOs are done, now I will work on the controller.

//I will keep all of my notes in this file.

//I will work on service and controller at the same time.