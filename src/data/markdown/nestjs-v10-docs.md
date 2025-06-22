# 📘 Tài liệu NestJS v10 (Tổng Quan)

## 🔰 1. Giới thiệu NestJS

- **NestJS** là một framework phát triển backend dùng **TypeScript**, xây dựng dựa trên **Express.js** hoặc **Fastify**.
- Thiết kế theo **kiến trúc OOP + FP + FRP** và đặc biệt là **kiến trúc mô-đun**, rất phù hợp cho ứng dụng doanh nghiệp lớn.
- **NestJS v10** ra mắt với nhiều cải tiến về hiệu suất, cấu trúc dự án, dependency injection, và các khả năng mở rộng.

---

## 🧱 2. Cài đặt NestJS v10

```bash
npm i -g @nestjs/cli
nest new my-app
```

Chọn kiểu dự án `npm`, `yarn`, hoặc `pnpm` tùy bạn.

---

## ⚙️ 3. Cấu trúc dự án NestJS

```
src/
├— app.controller.ts      // Controller xử lý request
├— app.service.ts         // Business logic
├— app.module.ts          // Root module
└— main.ts                // File khởi động ứng dụng
```

---

## 📦 4. Module trong NestJS

```ts
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

- Mọi thành phần trong NestJS đều nằm trong **Module**.
- Có thể chia nhỏ ra thành các feature modules như `UsersModule`, `AuthModule` v.v.

---

## 🔄 5. Dependency Injection

- NestJS v10 sử dụng Dependency Injection mạnh mẽ:

```ts
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

Controller sử dụng:

```ts
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
```

---

## 📡 6. Controller và Routes

```ts
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'All users';
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return dto;
  }
}
```

---

## 🧪 7. Pipes, Guards, Interceptors, Filters

NestJS cung cấp các cơ chế mạnh mẽ để xử lý:

- **Guards** → kiểm tra quyền truy cập
- **Pipes** → validate và transform dữ liệu
- **Interceptors** → xử lý trước/sau request
- **Filters** → xử lý exception

Ví dụ Pipe:

```ts
@UsePipes(new ValidationPipe())
@Post()
create(@Body() createUserDto: CreateUserDto) {}
```

---

## 🔐 8. Authentication & Authorization

NestJS hỗ trợ:

- **Passport.js** để auth (JWT, Google, etc.)
- Guard để kiểm soát truy cập:

```ts
@UseGuards(AuthGuard('jwt'))
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}
```

---

## ⚡ 9. Performance với Fastify (thay Express)

```ts
// main.ts
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(3000);
}
```

Fastify giúp tăng hiệu suất đáng kể cho API lớn.

---

## 🔄 10. CQRS (Command Query Responsibility Segregation)

NestJS hỗ trợ **CQRS pattern** thông qua thư viện `@nestjs/cqrs` giúp tách logic đọc và ghi.

```bash
npm i @nestjs/cqrs
```

```ts
// Command
export class CreateUserCommand {
  constructor(public readonly name: string) {}
}

// Handler
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  async execute(command: CreateUserCommand) {
    // handle logic
  }
}
```

---

## 🌐 11. GraphQL

NestJS hỗ trợ cả:

- Schema-first
- Code-first

```bash
npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

```ts
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
})
```

---

## 🧪 12. Testing

NestJS dùng Jest:

```bash
npm run test
```

```ts
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });
});
```

---

## 🚀 13. Những cải tiến mới ở phiên bản v10

- Hiệu năng cao hơn
- Hỗ trợ tốt hơn cho Fastify
- Cải tiến `Standalone App` bootstrapping
- Tự động phát hiện và phân luồng khi build GraphQL schema
- Giao diện `Injection Scopes` tốt hơn
- Dependency Injection hoạt động hiệu quả hơn
- Tích hợp tốt hơn với hệ thống microservices

---

## 📚 14. Tài nguyên chính thức

- [Trang chủ](https://nestjs.com/)
- [Docs chính thức NestJS v10](https://docs.nestjs.com/)
- [GitHub](https://github.com/nestjs/nest)

---

