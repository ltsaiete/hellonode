import fastify from 'fastify';

const app = fastify({ logger: true });

const users = [
	{
		id: 1,
		name: 'Lewis',
		email: 'ltsaiete@gmail.com'
	}
];

function listUsers() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Fetching users');
			resolve(users);
		}, 2000);
	});
}

function addUser(user) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Adding user');
			user.id = users.length + 1;
			users.push(user);
			resolve(users[users.length - 1]);
		}, 2000);
	});
}

app.get('/', (request, reply) => {
	reply.send({ message: 'Hello world' });
});

app.get('/users', async (request, reply) => {
	console.log('Before fetch');
	const users = await listUsers();
	console.log('After fetch');
	reply.send(users);
});

app.post('/users', async (request, reply) => {
	const { name, email } = request.body;
	console.log('Before add');
	const user = await addUser({ name, email });
	console.log('after add');

	reply.status(201).send(user);
});

app
	.listen({ port: 3333 })
	.then(() => console.log('Server running in port 3333'))
	.catch((error) => console.log(error));
