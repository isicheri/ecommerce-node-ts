import express from 'express'
import { PORT } from './secret';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middleware/errors';

const app = express();
app.use(express.json());
app.use('/api',rootRouter)
export const prismaClient = new PrismaClient({
    log: ['query']
}).$extends({
    result: {
        address: {
            formattedAddress: {
                needs: {
                    lineOne: true,
                    lineTwo: true,
                    pincode: true,
                    country: true,
                    city: true
                },
                compute: (addr) => {
                    return `${addr.lineOne},${addr.lineTwo}, ${addr.city},${addr.country}, ${addr.pincode}`
                }
            },
        }
    }
})
app.use(errorMiddleware)
app.listen(PORT,() => {
   console.log('server is live')
});