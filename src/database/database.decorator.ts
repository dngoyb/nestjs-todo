import { Inject } from '@nestjs/common';

export const InjectDatabase = () => Inject('DRIZZLE_DB');
