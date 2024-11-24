import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';
import { Medico } from '../medico/medico.entity';
import { PacienteDto } from './paciente.dto';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors'; 

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,

    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>, // Inyectar el repositorio de Medico
  ) {}

  // Crear un paciente
  async create(pacienteDto: PacienteDto): Promise<Paciente> {
    const paciente = new Paciente();
    paciente.nombre = pacienteDto.nombre;
    paciente.genero = pacienteDto.genero;

    if (paciente.nombre.length < 3) {
      throw new BusinessLogicException('El nombre del paciente debe tener al menos 3 caracteres.', BusinessError.BAD_REQUEST);
    }

    return this.pacienteRepository.save(paciente);
  }

  // Obtener todos los pacientes
  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.find();
  }

  // Obtener un paciente por ID
  async findOne(id: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id },  // Usamos `where` para indicar que estamos buscando por `id`
    });
    
    if (!paciente) {
      throw new BusinessLogicException('Paciente no encontrado', BusinessError.NOT_FOUND);
    }
    return paciente;
  }

  // Actualizar un paciente
  async update(id: string, pacienteDto: PacienteDto): Promise<Paciente> {
    const paciente = await this.findOne(id);
    paciente.nombre = pacienteDto.nombre;
    paciente.genero = pacienteDto.genero;

    if (paciente.nombre.length < 3) {
      throw new BusinessLogicException('El nombre del paciente debe tener al menos 3 caracteres.', BusinessError.BAD_REQUEST);
    }

    return this.pacienteRepository.save(paciente);
  }

  // Eliminar un paciente
  async delete(id: string): Promise<void> {
    const paciente = await this.findOne(id);
    if (paciente.diagnosticos.length > 0) {
      throw new BusinessLogicException('No se puede eliminar un paciente con diagnóstico asociado.', BusinessError.PRECONDITION_FAILED);
    }
    await this.pacienteRepository.remove(paciente);
  }

  // Añadir un médico a un paciente
  async addMedicoToPaciente(pacienteId: string, medicoId: string): Promise<Paciente> {
    const paciente = await this.findOne(pacienteId);

    // Usar `findOne` con `where` para buscar un médico por su ID
    const medico = await this.medicoRepository.findOne({
      where: { id: medicoId },  // Usamos `where` para buscar un médico por su `id`
    });

    if (!medico) {
      throw new BusinessLogicException('Médico no encontrado.', BusinessError.NOT_FOUND);
    }

    if (paciente.medicos.length >= 5) {
      throw new BusinessLogicException('El paciente no puede tener más de 5 médicos.', BusinessError.PRECONDITION_FAILED);
    }

    paciente.medicos.push(medico);
    return this.pacienteRepository.save(paciente);
  }
}
