import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from '../../paciente/paciente.entity';
import { Diagnostico } from '../../diagnostico/diagnostico.entity';
import { Medico } from '../../medico/medico.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Paciente, Diagnostico, Medico],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([Paciente, Diagnostico, Medico]),
];
