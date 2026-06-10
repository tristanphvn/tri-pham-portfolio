# NestJS v10 — Overview

## 1. Introduction

- **NestJS** is a backend framework written in **TypeScript**, built on top of **Express.js** or **Fastify**.
- It follows an **OOP + FP + FRP** design philosophy, with a strong emphasis on **modular architecture** — a great fit for large enterprise applications.
- **NestJS v10** brings improvements to performance, project structure, dependency injection, and overall extensibility.

---

## 2. Installing NestJS v10

```bash
npm i -g @nestjs/cli
nest new my-app
```

Pick your preferred package manager: `npm`, `yarn`, or `pnpm`.

---

## 3. Project Structure

```
src/
├— app.controller.ts      // Handles incoming requests
├— app.service.ts         // Business logic
├— app.module.ts          // Root module
└— main.ts                // Application entry point
```

---

## 4. Modules

```ts
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

- Everything in NestJS lives inside a **Module**.
- Larger apps are split into feature modules such as `UsersModule`, `AuthModule`, etc.

---

## 5. Dependency Injection

- NestJS v10 ships with a powerful Dependency Injection system:

```ts
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

Consumed from a controller:

```ts
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
```

---

## 6. Controllers & Routes

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

## 7. Pipes, Guards, Interceptors, Filters

NestJS provides first-class building blocks for request handling:

- **Guards** → authorization checks
- **Pipes** → validation and data transformation
- **Interceptors** → run logic before/after a request
- **Filters** → centralized exception handling

Pipe example:

```ts
@UsePipes(new ValidationPipe())
@Post()
create(@Body() createUserDto: CreateUserDto) {}
```

---

## 8. Authentication & Authorization

NestJS integrates well with:

- **Passport.js** for auth strategies (JWT, Google, etc.)
- Guards for access control:

```ts
@UseGuards(AuthGuard('jwt'))
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}
```

---

## 9. Performance with Fastify (instead of Express)

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

Fastify delivers a significant performance boost for high-throughput APIs.

---

## 10. CQRS (Command Query Responsibility Segregation)

NestJS supports the **CQRS pattern** via the `@nestjs/cqrs` package — useful for separating read and write logic.

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

## 11. GraphQL

NestJS supports both:

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

## 12. Testing

NestJS uses Jest out of the box:

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

## 13. What's New in v10

- Better runtime performance
- Improved Fastify support
- Refined `Standalone App` bootstrapping
- Automatic detection and threading when building GraphQL schemas
- Improved `Injection Scopes` API
- More efficient Dependency Injection
- Tighter integration with microservices

---

## 14. Official Resources

- [Homepage](https://nestjs.com/)
- [Official NestJS v10 Docs](https://docs.nestjs.com/)
- [GitHub](https://github.com/nestjs/nest)

---
