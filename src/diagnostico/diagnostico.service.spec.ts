import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoService } from './diagnostico.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Diagnostico } from './diagnostico.entity';
import { Repository } from 'typeorm';

describe('DiagnosticoService', () => {
  let service: DiagnosticoService;
  let repository: Repository<Diagnostico>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiagnosticoService,
        {
          provide: getRepositoryToken(Diagnostico),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DiagnosticoService>(DiagnosticoService);
    repository = module.get<Repository<Diagnostico>>(getRepositoryToken(Diagnostico));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
