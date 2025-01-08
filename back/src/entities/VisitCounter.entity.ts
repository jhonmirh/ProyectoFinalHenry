import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class VisitCounter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  ip: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;
  
  @Column({ type: 'int', default:1})
  count: number;
}
