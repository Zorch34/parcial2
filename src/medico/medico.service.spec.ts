import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicoEntity } from './medico.entity';
import { MedicoService } from './medico.service';

describe('MedicoService', () => {
  let service: MedicoService;
  let repository: Repository<MedicoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicoService,
        {
          provide: getRepositoryToken(MedicoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MedicoService>(MedicoService);
    repository = module.get<Repository<MedicoEntity>>(getRepositoryToken(MedicoEntity));
  });

  it('findAll should return all medicos', async () => {
    const medicos = [{ id: '1', nombre: 'Dr. Juan', especialidad: 'Cardiología', telefono: '123456', pacientes: [] }];
    jest.spyOn(repository, 'find').mockResolvedValue(medicos as MedicoEntity[]);
    const result = await service.findAll();
    expect(result).toEqual(medicos);
  });

  it('findOne should throw exception if medico not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await expect(service.findOne('0')).rejects.toThrow('El médico no existe');
  });
});
