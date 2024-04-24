import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { VoteModule } from './votes/vote.module';
import { AuthMiddleware } from './user/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, PostModule, VoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
