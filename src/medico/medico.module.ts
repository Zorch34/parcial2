import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './medico.entity';
import { MedicoService } from './medico.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medico])],  
  providers: [MedicoService],
  exports: [MedicoService, TypeOrmModule],
})
export class MedicoModule {}
