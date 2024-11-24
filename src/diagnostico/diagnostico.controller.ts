import { Controller, Get, Post, Delete, Param, Body, HttpCode, UseInterceptors } from '@nestjs/common';
import { DiagnosticoService } from './diagnostico.service';
import { Diagnostico } from './diagnostico.entity';
import { DiagnosticoDto } from './diagnostico.dto';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('diagnosticos')
@UseInterceptors(BusinessErrorsInterceptor)
export class DiagnosticoController {
  constructor(private readonly diagnosticoService: DiagnosticoService) {}

  @Get()
  async findAll() {
    return await this.diagnosticoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.diagnosticoService.findOne(id);
  }

  @Post()
  async create(@Body() diagnosticoDto: DiagnosticoDto) {
    const diagnostico: Diagnostico = plainToInstance(Diagnostico, diagnosticoDto);
    return await this.diagnosticoService.create(diagnostico);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.diagnosticoService.delete(id);
  }
}
