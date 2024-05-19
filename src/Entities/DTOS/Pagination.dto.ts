import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty()
  page?: number;
  @ApiProperty()
  limit?: number;
  @ApiProperty()
  sortBy?: string;
  @ApiProperty()
  sortOrder?: 'ASC' | 'DESC';
}
