import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, UseInterceptors } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { Paciente } from './paciente.entity';
import { PacienteDto } from './paciente.dto';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('pacientes')
@UseInterceptors(BusinessErrorsInterceptor)
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Get()
  async findAll() {
    return await this.pacienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pacienteService.findOne(id);
  }

  @Post()
  async create(@Body() pacienteDto: PacienteDto) {
    const paciente: Paciente = plainToInstance(Paciente, pacienteDto);
    return await this.pacienteService.create(paciente);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() pacienteDto: PacienteDto) {
    const paciente: Paciente = plainToInstance(Paciente, pacienteDto);
    return await this.pacienteService.create(paciente); // Simula un update
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.pacienteService.delete(id);
  }

  @Post(':pacienteId/medicos/:medicoId')
  async addMedicoToPaciente(@Param('pacienteId') pacienteId: string, @Param('medicoId') medicoId: string) {
    return await this.pacienteService.addMedicoToPaciente(pacienteId, medicoId);
  }
}
