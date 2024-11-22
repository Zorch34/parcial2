import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosticoEntity } from './diagnostico.entity';
import { DiagnosticoService } from './diagnostico.service';

describe('DiagnosticoService', () => {
  let service: DiagnosticoService;
  let repository: Repository<DiagnosticoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiagnosticoService,
        {
          provide: getRepositoryToken(DiagnosticoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DiagnosticoService>(DiagnosticoService);
    repository = module.get<Repository<DiagnosticoEntity>>(getRepositoryToken(DiagnosticoEntity));
  });

  it('findAll should return all diagnósticos', async () => {
    const diagnosticos = [{ id: '1', nombre: 'Fiebre', descripcion: 'Descripción de fiebre' }];
    jest.spyOn(repository, 'find').mockResolvedValue(diagnosticos as DiagnosticoEntity[]);
    const result = await service.findAll();
    expect(result).toEqual(diagnosticos);
  });

  it('findOne should throw exception if diagnostico not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await expect(service.findOne('0')).rejects.toThrow('El diagnóstico no existe');
  });
});
