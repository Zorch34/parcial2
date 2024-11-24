import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { Paciente } from './paciente.entity';
import { Medico } from '../medico/medico.entity';  
import { MedicoModule } from '../medico/medico.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Paciente, Medico]),
    MedicoModule,  
  ],
  providers: [PacienteService],
  controllers: [PacienteController],
})
export class PacienteModule {}
