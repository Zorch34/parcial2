import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacienteEntity } from './paciente.entity';
import { PacienteService } from './paciente.service';

describe('PacienteService', () => {
  let service: PacienteService;
  let repository: Repository<PacienteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacienteService,
        {
          provide: getRepositoryToken(PacienteEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
    repository = module.get<Repository<PacienteEntity>>(getRepositoryToken(PacienteEntity));
  });

  it('findAll should return all pacientes', async () => {
    const pacientes = [{ id: '1', nombre: 'Carlos', genero: 'Masculino', medico: null }];
    jest.spyOn(repository, 'find').mockResolvedValue(pacientes as PacienteEntity[]);
    const result = await service.findAll();
    expect(result).toEqual(pacientes);
  });

  it('findOne should throw exception if paciente not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await expect(service.findOne('0')).rejects.toThrow('El paciente no existe');
  });
});
