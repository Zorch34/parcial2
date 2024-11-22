import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from './paciente/paciente.module';
import { MedicoModule } from './medico/medico.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';
import { PacienteEntity } from './paciente/paciente.entity';
import { MedicoEntity } from './medico/medico.entity';
import { DiagnosticoEntity } from './diagnostico/diagnostico.entity';

@Module({
  imports: [
    PacienteModule,
    MedicoModule,
    DiagnosticoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Lunala2024.',
      database: 'hospital',
      entities: [PacienteEntity, MedicoEntity, DiagnosticoEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
})
export class AppModule {}
