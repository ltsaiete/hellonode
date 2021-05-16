import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.use(express.json());

interface UserData {
	name: string;
	email: string;
}

const users: UserData[] = [
	{
		name: 'Luis',
		email: 'luistsaiete@gmail.com'
	},
	{
		name: 'Wesley',
		email: 'wesleySaiete@gmail.com'
	},
];

function findUser(request: Request, response: Response, next: NextFunction) {
	const { email } = request.params;
	const index = users.findIndex(user => user.email === email);

	if(index < 0) {
		return response.json({ error: "User not found" });
	}
	request.userIndex = index;

	return next();
}

app.get('/',(request, response) => {
	return response.json("Hello universe");
});

app.get('/users', (request, response) => {
	return response.json(users);
});

app.post('/users', (request, response) => {
	const { name, email } = request.body;
	users.push({ name, email });
	return response.json(users);
});

app.get('/users/:email', findUser, (request: Request, response) => {
	const index = request.userIndex;

	return response.json(users[index]);
});

app.put('/users/:email', findUser,(request, response) => {
	const index = request.userIndex;
	const { name: userName, email: userEmail } = request.body;
	users[index] = {
		name: userName ? userName : users[index].name,
		email: userEmail ? userEmail : users[index].email
	}
	return response.json(users[index]);
});

app.delete('/users/:email', findUser, (request, response) => {
	const index = request.userIndex;
	users.splice(index, 1);
	return response.status(204).send();
})

app.listen(3333, () => console.log('Server listening to port 3333'));
