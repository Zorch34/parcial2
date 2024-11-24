import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente/paciente.entity';
import { Medico } from '../medico/medico.entity';

@Injectable()
export class PacienteMedicoService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,

    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  // Método para asignar un médico a un paciente
  async addMedicoToPaciente(pacienteId: string, medicoId: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id: pacienteId },
      relations: ['medicos'], // Aseguramos que se carguen los médicos asociados
    });
    if (!paciente) {
      throw new NotFoundException(`Paciente con ID ${pacienteId} no encontrado`);
    }

    const medico = await this.medicoRepository.findOne({ where: { id: medicoId } });
    if (!medico) {
      throw new NotFoundException(`Médico con ID ${medicoId} no encontrado`);
    }

    // Verificar si el paciente ya tiene 5 médicos asignados
    if (paciente.medicos.length >= 5) {
      throw new ForbiddenException('El paciente no puede tener más de 5 médicos asignados');
    }

    // Asignar el médico al paciente
    paciente.medicos.push(medico);
    return this.pacienteRepository.save(paciente); // Guardamos el paciente actualizado
  }

  // Método para obtener los médicos de un paciente
  async getMedicosByPacienteId(pacienteId: string): Promise<Medico[]> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id: pacienteId },
      relations: ['medicos'],
    });
    if (!paciente) {
      throw new NotFoundException(`Paciente con ID ${pacienteId} no encontrado`);
    }

    return paciente.medicos;
  }

  // Método para eliminar un médico de un paciente
  async removeMedicoFromPaciente(pacienteId: string, medicoId: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id: pacienteId },
      relations: ['medicos'],
    });
    if (!paciente) {
      throw new NotFoundException(`Paciente con ID ${pacienteId} no encontrado`);
    }

    const medicoIndex = paciente.medicos.findIndex((medico) => medico.id === medicoId);
    if (medicoIndex === -1) {
      throw new NotFoundException(`Médico con ID ${medicoId} no está asignado a este paciente`);
    }

    // Eliminar el médico de la lista de médicos del paciente
    paciente.medicos.splice(medicoIndex, 1);
    return this.pacienteRepository.save(paciente);
  }
}