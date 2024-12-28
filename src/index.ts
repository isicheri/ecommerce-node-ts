import express from 'express'
import { PORT } from './secret';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middleware/errors';
import { SignUpSchema } from './schema/user';

const app = express();
app.use(express.json());
app.use('/api',rootRouter)
export const prismaClient = new PrismaClient({
    log: ['query']
})
app.use(errorMiddleware)
app.listen(PORT,() => {
   console.log('server is live')
});