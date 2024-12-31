import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Tree,
  TreeParent,
  TreeChildren,
  JoinColumn,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  location_name: string;

  @Column('decimal', { precision: 10, scale: 3 })
  area: number;

  @Column({ default: 'm2' })
  area_unit: string;

  @TreeParent({ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: Location;

  @TreeChildren()
  children?: Location[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
