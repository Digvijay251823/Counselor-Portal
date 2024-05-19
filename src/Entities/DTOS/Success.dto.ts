import { ApiResponse } from '@nestjs/swagger';
//decorators
export const ApiResponseMessage = (message: string) =>
  ApiResponse({
    status: 201,
    description: message,
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        content: {
          type: 'Object',
          example: {
            message: 'Operation completed successfully',
          },
        },
      },
    },
  });
