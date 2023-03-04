import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { env } from "process";
import { z } from "zod";
// Require the framework and instantiate it
const app = fastify();

const prisma = new PrismaClient;

// Declare a route
app.get('/users', async () => {
    const users = await prisma.user.findMany();
    console.log(users)
    return users;
});

app.post('/users', async (resquest, reply) => {
    const createUserSchema = z.object({
        nome: z.string(),
        email: z.string()
    });

    const {nome, email} = createUserSchema.parse(resquest.body);

    await prisma.user.create({
        data: {
            nome,
            email,
        }
    });

    return reply.status(201).send()
});

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
    }, then => {
        console.log("HTTP SERVER RUMING")
    },
)