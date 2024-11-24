import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from './paciente/paciente.module';
import { MedicoModule } from './medico/medico.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';
import { Paciente } from './paciente/paciente.entity';
import { Medico } from './medico/medico.entity';
import { Diagnostico } from './diagnostico/diagnostico.entity';
import { PacienteMedicoModule } from './paciente-medico/paciente-medico.module';

@Module({
  imports: [
    PacienteModule,
    MedicoModule,
    DiagnosticoModule,
    PacienteMedicoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Lunala2024.',
      database: 'hospital',
      entities: [Paciente, Medico, Diagnostico],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
})
export class AppModule {}
