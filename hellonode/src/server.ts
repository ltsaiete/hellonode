import fastify from 'fastify';

const app = fastify({ logger: true });

app.get('/', (request, reply) => {
	reply.send({ message: 'Hello world' });
});

app
	.listen({ port: 3333 })
	.then(() => console.log('Server running in port 3333'))
	.catch((error) => console.log(error));
