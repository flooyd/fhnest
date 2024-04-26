import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  authorId: number;

  @Column({ nullable: true })
  createdAt: Date;

  //updatedAt default value is Date.now
  @Column({ nullable: true })
  updatedAt: Date;
}
