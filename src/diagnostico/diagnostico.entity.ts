import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DiagnosticoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ length: 500 })
  descripcion: string;
}
