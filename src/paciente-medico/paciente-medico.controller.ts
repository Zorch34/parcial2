import { Controller, Post, Get, Delete, Param, HttpCode, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PacienteMedicoService } from './paciente-medico.service';

@Controller('pacientes')
@UseInterceptors(BusinessErrorsInterceptor)
export class PacienteMedicoController {
  constructor(private readonly pacienteMedicoService: PacienteMedicoService) {}

  // Asociar un médico a un paciente
  @Post(':pacienteId/medicos/:medicoId')
  async addMedicoToPaciente(@Param('pacienteId') pacienteId: string, @Param('medicoId') medicoId: string) {
    return await this.pacienteMedicoService.addMedicoToPaciente(pacienteId, medicoId);
  }

  // Obtener los médicos asociados a un paciente
  @Get(':pacienteId/medicos')
  async findMedicosByPacienteId(@Param('pacienteId') pacienteId: string) {
    return await this.pacienteMedicoService.getMedicosByPacienteId(pacienteId);
  }

  // Eliminar un médico de un paciente
  @Delete(':pacienteId/medicos/:medicoId')
  @HttpCode(204)
  async deleteMedicoFromPaciente(
    @Param('pacienteId') pacienteId: string,
    @Param('medicoId') medicoId: string,
  ) {
    return await this.pacienteMedicoService.removeMedicoFromPaciente(pacienteId, medicoId);
  }
}
