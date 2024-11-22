import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacienteEntity } from './paciente.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(PacienteEntity)
    private readonly pacienteRepository: Repository<PacienteEntity>,
  ) {}

  async findAll(): Promise<PacienteEntity[]> {
    return await this.pacienteRepository.find({ relations: ['medico'] });
  }

  async findOne(id: string): Promise<PacienteEntity> {
    const paciente = await this.pacienteRepository.findOne({ where: { id }, relations: ['medico'] });
    if (!paciente) throw new NotFoundException('El paciente no existe');
    return paciente;
  }

  async create(paciente: PacienteEntity): Promise<PacienteEntity> {
    return await this.pacienteRepository.save(paciente);
  }

  async update(id: string, paciente: PacienteEntity): Promise<PacienteEntity> {
    const persistedPaciente = await this.pacienteRepository.findOne({ where: { id } });
    if (!persistedPaciente) throw new NotFoundException('El paciente no existe');
    return await this.pacienteRepository.save({ ...persistedPaciente, ...paciente });
  }

  async delete(id: string): Promise<void> {
    const paciente = await this.pacienteRepository.findOne({ where: { id } });
    if (!paciente) throw new NotFoundException('El paciente no existe');
    await this.pacienteRepository.remove(paciente);
  }
}
