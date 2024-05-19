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
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CounselorService } from './counselor.service';
import { CounselorSchema } from 'src/Entities/DTOS/counselor.dto';
import { Counselor } from 'src/Entities/Counselor.entity';
import { ApiResponseMessage } from 'src/Entities/DTOS/Success.dto';
@ApiTags('Counselor')
@Controller('Counselor')
export class CounselorController {
  constructor(private readonly counselorService: CounselorService) {}
  @ApiOperation({ summary: 'get the ilst of all counselors' })
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 201,
    description: 'List of all counselors',
    type: CounselorSchema,
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
  async getCounselee() {
    return this.counselorService.getCounselor();
  }

  @ApiResponseMessage('Counselor created successfully')
  @ApiBody({ type: CounselorSchema })
  @Post('/create')
  async createCounselee(@Body() CounselorDto: Partial<Counselor>) {
    return this.counselorService.createCounselor(CounselorDto);
  }

  @ApiResponseMessage('counselor deleted successfully')
  @ApiOperation({ summary: 'deleting counselor' })
  @Delete('/delete/:id')
  async deleteCounselor(@Param('id') id: string) {
    return this.counselorService.deleteCounselor(id);
  }

  @ApiResponseMessage('password updated successfully')
  @ApiOperation({ summary: 'update counselor password' })
  @Put('/updatepassword/:id')
  async updatePassword(
    @Param('id') id: string,
    @Query('password') password: string,
  ) {
    return this.counselorService.updatePassword(id, password);
  }

  @ApiOperation({ summary: 'getCounselor by phone' })
  @ApiResponse({ type: CounselorSchema })
  @Get('/phonenumber/:phonenumber')
  async getCounselorByPhone(@Param('phonenumber') phone: string) {
    return this.counselorService.getCounselorByPhone(phone);
  }

  @ApiOperation({ summary: 'getCounselor by email' })
  @ApiResponse({ type: CounselorSchema })
  @Get('/email/:email')
  async getCounselorByEmail(@Param('email') email: string) {
    return this.counselorService.getCounselorByEmail(email);
  }

  @ApiOperation({ summary: 'getCounselor by id' })
  @ApiResponse({ type: CounselorSchema })
  @Get('/id/:id')
  async getCounselorById(@Param('id') id: string) {
    return this.counselorService.getCounselorById(id);
  }
}
