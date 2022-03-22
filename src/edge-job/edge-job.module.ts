import { Module } from '@nestjs/common';
import { EdgeJobController } from './edge-job.controller';
import { EdgeJobService } from './edge-job.service';

@Module({
  controllers: [EdgeJobController],
  providers: [EdgeJobService],
})
export class EdgeJobModule {}
