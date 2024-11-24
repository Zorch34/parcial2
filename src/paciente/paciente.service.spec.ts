import { Test, TestingModule } from '@nestjs/testing';
import { PacienteService } from './paciente.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';
import { Repository } from 'typeorm';
import { Medico } from '../medico/medico.entity';

describe('PacienteService', () => {
  let service: PacienteService;
  let pacienteRepository: Repository<Paciente>;
  let medicoRepository: Repository<Medico>;

  const mockPacienteRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
  };

  const mockMedicoRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacienteService,
        {
          provide: getRepositoryToken(Paciente),
          useValue: mockPacienteRepository,
        },
        {
          provide: getRepositoryToken(Medico),
          useValue: mockMedicoRepository,
        },
      ],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
    pacienteRepository = module.get<Repository<Paciente>>(getRepositoryToken(Paciente));
    medicoRepository = module.get<Repository<Medico>>(getRepositoryToken(Medico));
  });

  it('debería crear un paciente correctamente', async () => {
    const paciente = { id: '1', nombre: 'Juan', genero: 'M' };
    mockPacienteRepository.save.mockResolvedValue(paciente);

    const result = await service.create(paciente as Paciente);
    expect(result).toEqual(paciente);
    expect(mockPacienteRepository.save).toHaveBeenCalledTimes(1);
  });

  it('debería lanzar excepción si el nombre tiene menos de 3 caracteres', async () => {
    const paciente = { id: '1', nombre: 'Ju', genero: 'M' };

    await expect(service.create(paciente as Paciente)).rejects.toThrow(
      'El nombre debe tener al menos 3 caracteres',
    );
  });
});
