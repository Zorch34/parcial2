import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, UseInterceptors } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { Medico } from './medico.entity';
import { MedicoDto } from './medico.dto';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('medicos')
@UseInterceptors(BusinessErrorsInterceptor)
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Get()
  async findAll() {
    return await this.medicoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.medicoService.findOne(id);
  }

  @Post()
  async create(@Body() medicoDto: MedicoDto) {
    const medico: Medico = plainToInstance(Medico, medicoDto);
    return await this.medicoService.create(medico);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() medicoDto: MedicoDto) {
    const medico: Medico = plainToInstance(Medico, medicoDto);
    return await this.medicoService.create(medico); // Simula un update
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.medicoService.delete(id);
  }
}
