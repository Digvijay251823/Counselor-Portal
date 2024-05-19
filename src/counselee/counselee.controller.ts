import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CounseleeService } from './counselee.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CounseleeSchema,
  updateCounselor,
} from 'src/Entities/DTOS/counselee.dto';
import { Counselee } from 'src/Entities/Counselee.entity';
import { ApiResponseMessage } from 'src/Entities/DTOS/Success.dto';
@ApiTags('Counselee')
@Controller('counselee')
export class CounseleeController {
  constructor(private readonly counseleeService: CounseleeService) {}
  @ApiOperation({ summary: 'get the list of counselees' })
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 201,
    description: 'List of all Counselee',
    type: CounseleeSchema,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Page size',
    example: 10,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Field to sort by',
    example: 'createdAt',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['ASC', 'DESC'],
    description: 'Sort order',
    example: 'ASC',
  })
  @Get('/')
  async getCounselee(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('sortBy') sortBy = 'createdAt',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    return this.counseleeService.getCounselee(
      pageNumber,
      pageSize,
      sortBy,
      sortOrder,
    );
  }

  @ApiOperation({ summary: 'create counselee' })
  @ApiResponseMessage('Counselor updated successfully')
  @ApiBody({ type: CounseleeSchema })
  @Post('/create')
  async createCounselee(@Body() CounseleeDto: Partial<Counselee>) {
    return this.counseleeService.createCounselee(CounseleeDto);
  }

  @ApiResponseMessage('counselor deleted successfully')
  @ApiOperation({ summary: 'deleting counselor' })
  @Delete('/delete/:id')
  async deleteCounselor(@Param('id') id: string) {
    return this.counseleeService.deleteCounselee(id);
  }

  @ApiOperation({ summary: 'Update counselor of Counselee' })
  @Put('/updatecounselor')
  async updateCounselor(@Body() updateCounselorDto: updateCounselor) {
    return this.counseleeService.updateCounselee(
      updateCounselorDto.counselorid,
      updateCounselorDto.counseleeid,
    );
  }

  @ApiOperation({ summary: 'get Counselor by phonenumber' })
  @ApiResponse({ type: CounseleeSchema })
  @Get('/phonenumber/:phonenumber')
  async getByPhoneNumber(@Param('phonenumber') phonenumber: string) {
    return this.counseleeService.getbyPhone(phonenumber);
  }

  @ApiOperation({ summary: 'get Counselor by id' })
  @ApiResponse({ type: CounseleeSchema })
  @Get('/id/:id')
  async getById(@Param('id') id: string) {
    return this.counseleeService.getById(id);
  }
}
