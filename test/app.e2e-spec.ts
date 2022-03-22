import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { EditUserDto } from 'src/user/dto/edit-user.dto';
import { AppModule } from '../src/app.module';
import { CreateEdgeJobDto } from '../src/edge-job/dto/create-edge-job.dto';
import { EditEdgeJobDto } from '../src/edge-job/dto/edit-edge-job.dto';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3000/v1');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'renato@gmail.com',
      password: '123',
    };
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Renato',
          email: 'renatojara@live.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('EdgeJobs', () => {
    describe('Get edgeJobs', () => {
      it('should get edgeJobs', () => {
        return pactum
          .spec()
          .get('/edgeJobs')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create edgeJob', () => {
      const dto: CreateEdgeJobDto = {
        title: 'First EdgeJob',
        link: 'https://edge.com.py',
      };
      it('should create edgeJob', () => {
        return pactum
          .spec()
          .post('/edgeJobs')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('edgeJobId', 'id');
      });
    });

    describe('Get edgeJobs', () => {
      it('should get edgeJobs', () => {
        return pactum
          .spec()
          .get('/edgeJobs')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get edgeJob by id', () => {
      it('should get edgeJob by id', () => {
        return pactum
          .spec()
          .get('/edgeJobs/{id}')
          .withPathParams('id', '$S{edgeJobId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{edgeJobId}');
      });
    });

    describe('Edit edgeJob by id', () => {
      const dto: EditEdgeJobDto = {
        title: 'API - Javascript',
        description: 'Backend API with apigee',
      };
      it('should edit edgeJob', () => {
        return pactum
          .spec()
          .patch('/edgeJobs/{id}')
          .withPathParams('id', '$S{edgeJobId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description);
      });
    });

    describe('Delete edgeJob by id', () => {
      it('should delete edgeJob', () => {
        return pactum
          .spec()
          .delete('/edgeJobs/{id}')
          .withPathParams('id', '$S{edgeJobId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(204);
      });

      it('should get empty edgeJobs', () => {
        return pactum
          .spec()
          .get('/edgeJobs')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
