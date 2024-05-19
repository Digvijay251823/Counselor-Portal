import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Counselor } from 'src/Entities/Counselor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CounselorService {
  constructor(
    @InjectRepository(Counselor)
    private CounselorRepository: Repository<Counselor>,
  ) {}
  async getCounselor() {
    try {
      const counselor = await this.CounselorRepository.find({
        relations: ['husband'],
      });
      if (counselor?.length === 0) {
        throw new HttpException('no counselor to show', HttpStatus.NOT_FOUND);
      }
      return { Success: true, content: counselor };
    } catch (error) {
      throw error;
    }
  }

  async createCounselor(counselorDto: Partial<Counselor>) {
    try {
      const counselor = await this.CounselorRepository.findOne({
        where: {
          phoneNumber: counselorDto.phoneNumber,
        },
      });
      if (counselor) {
        throw new HttpException(
          `counselor already exist with ${counselorDto.phoneNumber}`,
          HttpStatus.CONFLICT,
        );
      }
      const counselornew = this.CounselorRepository.create(counselorDto);
      await this.CounselorRepository.save(counselornew);
      return {
        Success: true,
        content: { message: 'counselor created Successfully' },
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteCounselor(id: string) {
    try {
      const existingCounselor = await this.CounselorRepository.findOne({
        where: { id },
      });
      if (!existingCounselor) {
        throw new HttpException('Counselor not found.', HttpStatus.NOT_FOUND);
      }

      await this.CounselorRepository.delete(id);
      return { Success: true, message: 'Counselor deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(id: string, password: string) {
    try {
      const counselor = await this.CounselorRepository.findOne({
        where: { id: id },
      });
      if (!counselor) {
        throw new HttpException(
          'counselor does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      counselor.password = password;
      await this.CounselorRepository.save(counselor);
      return { Success: true, content: { message: 'updated successfully' } };
    } catch (error) {
      throw error;
    }
  }

  async getCounselorByPhone(phone: string) {
    try {
      const counselor = await this.CounselorRepository.findOne({
        where: { phoneNumber: phone },
      });
      if (!counselor) {
        throw new NotFoundException('counselor doesnt exist');
      }
      return { Success: true, content: counselor };
    } catch (error) {
      throw error;
    }
  }

  async getCounselorByEmail(email: string) {
    try {
      const counselor = await this.CounselorRepository.findOne({
        where: { email: email },
      });
      if (!counselor) {
        throw new NotFoundException('counselor doesnt exist');
      }
      return { Success: true, content: counselor };
    } catch (error) {
      throw error;
    }
  }
  async getCounselorById(id: string) {
    try {
      const counselor = await this.CounselorRepository.findOne({
        where: { id: id },
      });
      if (!counselor) {
        throw new NotFoundException('counselor doesnt exist');
      }
      return { Success: true, content: counselor };
    } catch (error) {
      throw error;
    }
  }
}
