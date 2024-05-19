import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CounselorproviderService } from './counselorprovider.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CounselorProviderSchema } from 'src/Entities/DTOS/counselorProvider.dto';
import { ApiResponseMessage } from 'src/Entities/DTOS/Success.dto';
import { CounselorProviderEntity } from 'src/Entities/CounselorProvider.entity';

@Controller('counselorprovider')
export class CounselorproviderController {
  constructor(
    private readonly counselorProviderService: CounselorproviderService,
  ) {}
  @ApiOperation({ summary: 'get the ilst of all submissions' })
  @ApiResponse({
    status: 201,
    description: 'List of all Submissions',
    type: CounselorProviderSchema,
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
  async getAll() {
    return await this.counselorProviderService.getAll();
  }

  @ApiOperation({ summary: 'submit the form for change counselor' })
  @ApiResponseMessage('Submitted the form to change counselor')
  @ApiBody({
    type: CounselorProviderSchema,
  })
  @Post('/create')
  async create(
    @Body() CounselorProviderSchema: Partial<CounselorProviderEntity>,
  ) {
    return this.counselorProviderService.create(CounselorProviderSchema);
  }

  @ApiOperation({ summary: 'submit the form for change counselor' })
  @ApiResponseMessage('Submitted the form to change counselor')
  @Get('approve/:id')
  async approve(@Param('id') id: string) {
    return this.counselorProviderService.approve(id);
  }
}
