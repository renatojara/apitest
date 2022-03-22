import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEdgeJobDto } from './dto/create-edge-job.dto';
import { EditEdgeJobDto } from './dto/edit-edge-job.dto';

@Injectable()
export class EdgeJobService {
  constructor(private prisma: PrismaService) {}

  getEdgeJobs(userId: number) {
    return this.prisma.edgeJob.findMany({
      where: {
        userId,
      },
    });
  }

  getEdgeJobById(userId: number, edgeJobId: number) {
    return this.prisma.edgeJob.findFirst({
      where: {
        id: edgeJobId,
        userId,
      },
    });
  }

  async createEdgeJob(userId: number, dto: CreateEdgeJobDto) {
    const edgeJob = await this.prisma.edgeJob.create({
      data: {
        userId,
        ...dto,
      },
    });

    return edgeJob;
  }

  async editEdgeJobById(
    userId: number,
    edgeJobId: number,
    dto: EditEdgeJobDto,
  ) {
    // get the edgeJob by id
    const edgeJob = await this.prisma.edgeJob.findUnique({
      where: {
        id: edgeJobId,
      },
    });

    // check if user has the edgeJob
    if (!edgeJob || edgeJob.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.edgeJob.update({
      where: {
        id: edgeJobId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteEdgeJobById(userId: number, edgeJobId: number) {
    const edgeJob = await this.prisma.edgeJob.findUnique({
      where: {
        id: edgeJobId,
      },
    });

    // check if user has the edgeJob
    if (!edgeJob || edgeJob.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.edgeJob.delete({
      where: {
        id: edgeJobId,
      },
    });
  }
}
