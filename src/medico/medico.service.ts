import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicoEntity } from './medico.entity';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(MedicoEntity)
    private readonly medicoRepository: Repository<MedicoEntity>,
  ) {}

  async findAll(): Promise<MedicoEntity[]> {
    return await this.medicoRepository.find();
  }

  async findOne(id: string): Promise<MedicoEntity> {
    const medico = await this.medicoRepository.findOne({ where: { id } });
    if (!medico) {
      throw new NotFoundException(`Medico with ID ${id} not found`);
    }
    return medico;
  }

  async create(medicoData: Partial<MedicoEntity>): Promise<MedicoEntity> {
    const medico = this.medicoRepository.create(medicoData);
    return await this.medicoRepository.save(medico);
  }

  async update(id: string, medicoData: Partial<MedicoEntity>): Promise<MedicoEntity> {
    const medico = await this.findOne(id);
    Object.assign(medico, medicoData);
    return await this.medicoRepository.save(medico);
  }

  async delete(id: string): Promise<void> {
    const medico = await this.findOne(id);
    await this.medicoRepository.remove(medico);
  }
}
