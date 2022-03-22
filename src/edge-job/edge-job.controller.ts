import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { EdgeJobService } from './edge-job.service';
import { CreateEdgeJobDto } from './dto/create-edge-job.dto';
import { EditEdgeJobDto } from './dto/edit-edge-job.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('EdgeJob')
@UseGuards(JwtGuard)
@Controller('v1/edgeJobs')
export class EdgeJobController {
  constructor(private edgeJobService: EdgeJobService) {}

  @Get()
  getEdgeJobs(@GetUser('id') userId: number) {
    return this.edgeJobService.getEdgeJobs(userId);
  }

  @Get(':id')
  getEdgeJobById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) edgeJobId: number,
  ) {
    return this.edgeJobService.getEdgeJobById(userId, edgeJobId);
  }

  @Post()
  createEdgeJob(@GetUser('id') userId: number, @Body() dto: CreateEdgeJobDto) {
    return this.edgeJobService.createEdgeJob(userId, dto);
  }

  @Patch(':id')
  editEdgeJobById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) edgeJobId: number,
    @Body() dto: EditEdgeJobDto,
  ) {
    return this.edgeJobService.editEdgeJobById(userId, edgeJobId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteEdgeJobById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) edgeJobId: number,
  ) {
    return this.edgeJobService.deleteEdgeJobById(userId, edgeJobId);
  }
}
