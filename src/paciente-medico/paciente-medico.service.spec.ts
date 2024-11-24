import { Test, TestingModule } from '@nestjs/testing';
import { PacienteMedicoService } from './paciente-medico.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from '../paciente/paciente.entity';
import { Medico } from '../medico/medico.entity';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('PacienteMedicoService', () => {
  let service: PacienteMedicoService;
  let pacienteRepository: Repository<Paciente>;
  let medicoRepository: Repository<Medico>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacienteMedicoService,
        {
          provide: getRepositoryToken(Paciente),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Medico),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PacienteMedicoService>(PacienteMedicoService);
    pacienteRepository = module.get<Repository<Paciente>>(getRepositoryToken(Paciente));
    medicoRepository = module.get<Repository<Medico>>(getRepositoryToken(Medico));
  });

  describe('addMedicoToPaciente', () => {
    it('debe agregar un médico a un paciente correctamente', async () => {
      const paciente = new Paciente();
      paciente.id = '123';
      paciente.nombre = 'Paciente 1';
      paciente.medicos = [];

      const medico = new Medico();
      medico.id = '456';
      medico.nombre = 'Dr. Médico';
      medico.especialidad = 'Cardiología';

      jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(paciente);
      jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(medico);
      jest.spyOn(pacienteRepository, 'save').mockResolvedValue(paciente);

      await service.addMedicoToPaciente('123', '456');

      expect(paciente.medicos).toContain(medico);
    });

    it('debe lanzar NotFoundException si el paciente no existe', async () => {
      jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(null);

      await expect(service.addMedicoToPaciente('123', '456')).rejects.toThrowError(NotFoundException);
    });

    it('debe lanzar NotFoundException si el médico no existe', async () => {
      const paciente = new Paciente();
      paciente.id = '123';
      paciente.nombre = 'Paciente 1';
      paciente.medicos = [];

      jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(paciente);
      jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.addMedicoToPaciente('123', '456')).rejects.toThrowError(NotFoundException);
    });

    it('debe lanzar ForbiddenException si el paciente ya tiene 5 médicos asignados', async () => {
      const paciente = new Paciente();
      paciente.id = '123';
      paciente.nombre = 'Paciente 1';
      paciente.medicos = Array(5).fill(new Medico());

      const medico = new Medico();
      medico.id = '456';
      medico.nombre = 'Dr. Médico';
      medico.especialidad = 'Cardiología';

      jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(paciente);
      jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(medico);

      await expect(service.addMedicoToPaciente('123', '456')).rejects.toThrowError(ForbiddenException);
    });
  });
});
