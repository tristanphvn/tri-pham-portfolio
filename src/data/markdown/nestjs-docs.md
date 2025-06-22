# 🚀 Tài Liệu NestJS (Framework Node.js)

## ✅ 1. Giới Thiệu
**NestJS** là một framework Node.js được xây dựng với TypeScript, sử dụng kiến trúc **decorators** và **dependency injection** để tạo ra các ứng dụng server-side có thể mở rộng và dễ bảo trì.

### 🎯 Đặc điểm chính:
- **TypeScript-first**: Hỗ trợ TypeScript toàn diện
- **Decorators**: Sử dụng decorators để định nghĩa metadata
- **Dependency Injection**: Hệ thống DI mạnh mẽ
- **Modular Architecture**: Kiến trúc module linh hoạt
- **OpenAPI/Swagger**: Tích hợp sẵn documentation
- **Testing**: Hỗ trợ testing đầy đủ

## 📦 2. Cài Đặt Dự Án NestJS

### Sử dụng CLI (Khuyến nghị)
```bash
# Cài đặt NestJS CLI globally
npm i -g @nestjs/cli

# Tạo dự án mới
nest new my-nest-app

# Hoặc sử dụng npx
npx @nestjs/cli new my-nest-app
```

### Cài đặt thủ công
```bash
npm init -y
npm install @nestjs/core @nestjs/common @nestjs/platform-express reflect-metadata rxjs
npm install -D @nestjs/cli @nestjs/testing @types/node typescript
```

## 🗂️ 3. Cấu Trúc Thư Mục Mặc Định

```
src/
├── app.controller.ts          # Controller chính
├── app.service.ts             # Service chính
├── app.module.ts              # Root module
└── main.ts                    # Entry point

test/                          # Test files
├── app.e2e-spec.ts
└── jest-e2e.json

nest-cli.json                  # NestJS CLI config
package.json                   # Dependencies
tsconfig.json                  # TypeScript config
```

## ⚙️ 4. Các Khái Niệm Cơ Bản

### 🏗️ a. Modules
```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 🎮 b. Controllers
```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class UsersController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(): string[] {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.appService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: any): string {
    return this.appService.create(createUserDto);
  }
}
```

### 🔧 c. Services
```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private users: string[] = [];

  findAll(): string[] {
    return this.users;
  }

  findOne(id: string): string {
    return this.users.find(user => user === id) || 'User not found';
  }

  create(createUserDto: any): string {
    this.users.push(createUserDto.name);
    return 'User created successfully';
  }
}
```

## 🗄️ 5. Database Integration

### TypeORM Integration
```bash
npm install @nestjs/typeorm typeorm pg
```

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'nest_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Chỉ dùng cho development
    }),
  ],
})
export class AppModule {}
```

### Entity Example
```typescript
// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;
}
```

## 🔐 6. Authentication & Authorization

### JWT Authentication
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install -D @types/passport-jwt
```

```typescript
// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

### Guards
```typescript
// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: any): boolean {
    // Implement your validation logic
    return true;
  }
}
```

## 🧪 7. Testing

### Unit Testing
```typescript
// app.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return "Hello World!"', () => {
    expect(service.getHello()).toBe('Hello World!');
  });
});
```

### E2E Testing
```typescript
// app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
```

## 📊 8. Validation & Transformation

### DTOs với Validation
```bash
npm install class-validator class-transformer
```

```typescript
// create-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
```

### Global Validation Pipe
```typescript
// main.ts
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
```

## 🔄 9. Interceptors & Middleware

### Interceptor Example
```typescript
// logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Execution time: ${Date.now() - now}ms`)),
      );
  }
}
```

## 🚀 10. Deployment

### Production Build
```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
```

## 📚 Tài Nguyên Học Tập
- https://nestjs.com/
- https://docs.nestjs.com/
- YouTube: "NestJS Crash Course"
- GitHub: https://github.com/nestjs/nest

## 🎯 Best Practices
1. **Sử dụng DTOs** cho tất cả input/output
2. **Implement Guards** cho authentication
3. **Sử dụng Interceptors** cho logging và transformation
4. **Write Tests** cho tất cả business logic
5. **Use Environment Variables** cho configuration
6. **Implement Error Handling** với exception filters
7. **Use Dependency Injection** thay vì singleton patterns 