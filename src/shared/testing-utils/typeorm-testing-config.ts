import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteEntity } from '../../paciente/paciente.entity';
import { DiagnosticoEntity } from '../../diagnostico/diagnostico.entity';
import { MedicoEntity } from '../../medico/medico.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [PacienteEntity, DiagnosticoEntity, MedicoEntity],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([PacienteEntity, DiagnosticoEntity, MedicoEntity]),
];
