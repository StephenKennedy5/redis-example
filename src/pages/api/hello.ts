// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import redisPool from './redispool';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const redis = await redisPool.connect();
  const redisVal = await redis.get('hey');
  // eslint-disable-next-line no-console
  console.log({ redisVal });

  res.status(200).json({ name: 'Bambang' });
}
