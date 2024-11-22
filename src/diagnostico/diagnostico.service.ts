import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosticoEntity } from './diagnostico.entity';

@Injectable()
export class DiagnosticoService {
  constructor(
    @InjectRepository(DiagnosticoEntity)
    private readonly diagnosticoRepository: Repository<DiagnosticoEntity>,
  ) {}

  async findAll(): Promise<DiagnosticoEntity[]> {
    return await this.diagnosticoRepository.find();
  }

  async findOne(id: string): Promise<DiagnosticoEntity> {
    const diagnostico = await this.diagnosticoRepository.findOne({ where: { id } });
    if (!diagnostico) {
      throw new NotFoundException(`Diagnostico with ID ${id} not found`);
    }
    return diagnostico;
  }

  async create(diagnosticoData: Partial<DiagnosticoEntity>): Promise<DiagnosticoEntity> {
    const diagnostico = this.diagnosticoRepository.create(diagnosticoData);
    return await this.diagnosticoRepository.save(diagnostico);
  }

  async update(id: string, diagnosticoData: Partial<DiagnosticoEntity>): Promise<DiagnosticoEntity> {
    const diagnostico = await this.findOne(id);
    Object.assign(diagnostico, diagnosticoData);
    return await this.diagnosticoRepository.save(diagnostico);
  }

  async delete(id: string): Promise<void> {
    const diagnostico = await this.findOne(id);
    await this.diagnosticoRepository.remove(diagnostico);
  }
}
