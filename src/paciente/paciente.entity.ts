import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MedicoEntity } from '../medico/medico.entity';

@Entity()
export class PacienteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  genero: string;

  @ManyToOne(() => MedicoEntity, (medico) => medico.pacientes)
  medico: MedicoEntity;
}
