import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Counselee } from 'src/Entities/Counselee.entity';
import { CounselorProviderEntity } from 'src/Entities/CounselorProvider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CounselorproviderService {
  constructor(
    @InjectRepository(CounselorProviderEntity)
    private counselorProvider: Repository<CounselorProviderEntity>,
    @InjectRepository(Counselee)
    private counseleeService: Repository<Counselee>,
  ) {}

  async getAll() {
    try {
      const Submissions = await this.counselorProvider.find({
        relations: [
          'counselee',
          'preferedCounselor1',
          'preferedCounselor2',
          'preferedCounselor3',
        ],
      });
      if (Submissions.length === 0) {
        throw new HttpException('no submissions to show', HttpStatus.NOT_FOUND);
      }
      return { Success: true, content: Submissions };
    } catch (error) {
      throw error;
    }
  }
  async create(CounselorProviderSchema: Partial<CounselorProviderEntity>) {
    try {
      const counselee = await this.counseleeService.findOne({
        where: { id: CounselorProviderSchema.counselee.toString() },
      });
      const existingEntry = await this.counselorProvider.findOne({
        where: { counselee: { id: counselee.id } },
      });
      if (existingEntry) {
        throw new HttpException('already exists', HttpStatus.CONFLICT);
      }
      const newEntry = this.counselorProvider.create(CounselorProviderSchema);
      console.log(newEntry);
      await this.counselorProvider.save(newEntry);
      return { Success: true, message: 'Submitted the form' };
    } catch (error) {
      throw error;
    }
  }

  async approve(id: string) {
    try {
      const existingEntry = await this.counselorProvider.findOne({
        where: { id },
      });
      if (!existingEntry) {
        throw new NotFoundException(`there is not entry related to this id`);
      }
      existingEntry.statusOfChange = 'APPROVED';
      await this.counselorProvider.save(existingEntry);
      return { Success: true, content: { message: 'apporved the request' } };
    } catch (error) {
      throw error;
    }
  }
}
