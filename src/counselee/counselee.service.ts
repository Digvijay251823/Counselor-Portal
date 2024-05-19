import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Counselee } from 'src/Entities/Counselee.entity';
import { Counselor } from 'src/Entities/Counselor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CounseleeService {
  constructor(
    @InjectRepository(Counselee)
    private CounseleeModel: Repository<Counselee>,
    @InjectRepository(Counselor)
    private CounselorModel: Repository<Counselor>,
  ) {}

  async getCounselee(
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC',
  ) {
    const skip = (page - 1) * limit;
    const order = { [sortBy]: sortOrder };
    try {
      const counselee = await this.CounseleeModel.find({
        relations: ['husband', 'currentCounselor'],
        skip,
        take: limit,
        order,
      });
      if (counselee?.length === 0) {
        throw new HttpException('No Counselee to show', HttpStatus.NOT_FOUND);
      }
      return { Success: true, content: counselee };
    } catch (error) {
      throw error;
    }
  }

  async createCounselee(inputData: Partial<Counselee>) {
    try {
      const counselee = await this.CounseleeModel.findOne({
        where: {
          phoneNumber: inputData.phoneNumber,
        },
      });
      if (counselee) {
        throw new HttpException(
          'User already exist please try another details',
          HttpStatus.CONFLICT,
        );
      }
      const newcounselee = this.CounseleeModel.create(inputData);
      await this.CounseleeModel.save(newcounselee);
      return {
        Success: 'false',
        content: { message: 'counselee created successfully' },
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteCounselee(id: string) {
    try {
      const existingCounselee = await this.CounseleeModel.findOne({
        where: { id },
      });
      if (!existingCounselee) {
        throw new HttpException('Counselee not found.', HttpStatus.NOT_FOUND);
      }

      await this.CounseleeModel.delete(id);
      return { Success: true, message: 'Counselee deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
  async updateCounselee(counselorid: string, counseleeid: string) {
    try {
      const counselee = await this.CounseleeModel.findOne({
        where: { id: counseleeid },
      });
      const counselor = await this.CounselorModel.findOne({
        where: { id: counselorid },
      });
      if (!counselee || !counselor) {
        throw new HttpException(
          'counselee does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      counselee.currentCounselor = counselor;
      await this.CounseleeModel.save(counselee);
      return { Success: true, message: 'updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  async getbyPhone(phoneNumber: string) {
    try {
      const Counselee = await this.CounseleeModel.findOne({
        where: { phoneNumber: phoneNumber },
      });
      if (!Counselee) {
        throw new NotFoundException('counselee doesnt exist');
      }
      return { Success: true, content: Counselee };
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string) {
    try {
      const counselee = await this.CounseleeModel.findOne({ where: { id } });
      if (!counselee) {
        throw new NotFoundException('counselee doesnt exist please register');
      }
      return { Success: true, Content: counselee };
    } catch (error) {
      throw error;
    }
  }
}
