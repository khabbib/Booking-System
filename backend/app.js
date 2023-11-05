import express from 'express'
const app = express()
const users = [
	{
		name: "Adb",
		email: "hello@adb.com"
	},
	{
		name: "Adb",
		email: "hello@adb.com"
	}
];



app.get('/', (req, res) => {
	res.send("hello there")
});

app.get('/api/users', (req, res) => {
	res.send(users);
})

const port = 8080;
app.listen(port, console.log(`the server is running on port ${port}`))
