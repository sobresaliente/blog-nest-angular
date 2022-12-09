import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;
}
