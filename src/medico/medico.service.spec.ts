import { Test, TestingModule } from '@nestjs/testing';
import { MedicoService } from './medico.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medico } from './medico.entity';
import { Repository } from 'typeorm';

describe('MedicoService', () => {
  let service: MedicoService;
  let repository: Repository<Medico>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicoService,
        {
          provide: getRepositoryToken(Medico),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MedicoService>(MedicoService);
    repository = module.get<Repository<Medico>>(getRepositoryToken(Medico));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
