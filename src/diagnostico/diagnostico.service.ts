import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diagnostico } from './diagnostico.entity';

@Injectable()
export class DiagnosticoService {
  constructor(
    @InjectRepository(Diagnostico)
    private readonly diagnosticoRepository: Repository<Diagnostico>,
  ) {}

  async findAll(): Promise<Diagnostico[]> {
    return await this.diagnosticoRepository.find({ relations: ['pacientes'] });
  }

  async findOne(id: string): Promise<Diagnostico> {
    const diagnostico = await this.diagnosticoRepository.findOne({ where: { id }, relations: ['pacientes'] });
    if (!diagnostico) {
      throw new NotFoundException('Diagnóstico no encontrado');
    }
    return diagnostico;
  }

  async create(diagnostico: Diagnostico): Promise<Diagnostico> {
    return await this.diagnosticoRepository.save(diagnostico);
  }

  async update(id: string, diagnostico: Diagnostico): Promise<Diagnostico> {
    const diagnosticoExistente = await this.findOne(id);
    return await this.diagnosticoRepository.save({ ...diagnosticoExistente, ...diagnostico });
  }

  async delete(id: string): Promise<void> {
    const diagnostico = await this.findOne(id);
    await this.diagnosticoRepository.remove(diagnostico);
  }
}
