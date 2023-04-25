import { createClient, RedisClientType } from 'redis';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error('REDIS_URL env variable is needed');
}

class RedisPool {
  redis: RedisClientType;

  constructor(redisUrl: string) {
    console.log('CREATING REDISPOOL');

    this.redis = createClient({
      url: redisUrl,
      // isolationPoolOptions: {
      //   idleTimeoutMillis: 5000,
      //   min: 5,
      //   max: 40,
      // },
    });
    this.redis.on('error', (error) => {
      // eslint-disable-next-line no-console
      console.log('ERROR');
      // eslint-disable-next-line no-console
      console.log({ error });
    });
    process.on('exit', () => {
      this.redis.disconnect();
    });
  }
  async connect(): Promise<RedisClientType> {
    if (!this.redis.isOpen) {
      console.log('CONNECTING TO REDIS');
      await this.redis.connect();
    }
    return this.redis;
  }
}
const redisPool = new RedisPool(redisUrl);
export default redisPool;
