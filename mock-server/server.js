const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 8000; 

const sessionid = 'token_value';

// Middleware to enable CORS (Cross-Origin Resource Sharing) for development purposes
// Without this the CORS policy: No 'Access-Control-Allow-Origin' header will block requests from the client
app.use(cors());
// Middleware to parse JSON
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());

app.get('/favicon.ico', (req, res) => res.status(204).end());

// Handle requests for postgrest endpoint
app.get('/postgrest/:endpoint', (req, res) => {

	// log the request
	console.log(`GET request for ${req.params.endpoint}`);

	// Read cookie
	const sessionCookie = req.cookies.sessionid;

	// Check if the cookie is valid
	if (sessionCookie !== sessionid) {
		res.sendStatus(401);
		return;
	}

	// Extract the json file name from the request
	const { endpoint } = req.params;
	let fileEnding = '';

	// if request specifies a specific id, use correct json files
  if (req.query.id === 'eq.11') {
    fileEnding = '_11';
  } else if (req.query.id === 'eq.12') {
		fileEnding = '_12';
	}

	const filePath = path.join(__dirname, 'data', `${endpoint}${fileEnding}.json`);

	// Read the json file specified in the request, send it as a response if it exists
	fs.readFile(filePath, (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('Could not read json file');
			return;
		}
		res.json(JSON.parse(data));
	});
});

// Handle requests for log in endpoint
app.post('/api/auth/login/', (req, res) => {

	// log the request
	const { username, password } = req.body;
	console.log(`POST request for /auth with username: ${username}, password: ${password}`);
	
	if (username === 'admin' && password === 'admin') {
		// Set the Content-Type header
    res.setHeader('Content-Type', 'application/json');
    // Set the cookie
    res.cookie('sessionid', sessionid, { httpOnly: true, sameSite: 'Strict' });
		// Send JSON response
		res.json({ user: { username: "admin" } });
	} else {
		res.sendStatus(401);
	}
});

// Handle requests for log out endpoint
app.post('/api/auth/logout/', (req, res) => {

	// log the request
	console.log(`POST request for /auth/logout`);

	// Clear the cookie
	res.clearCookie('sessionid');

	// Send JSON response
	res.json({ detail: 'success' });
});

// Handle requests for refresh token endpoint
app.post('/api/auth/token/refresh/', (req, res) => {

	// log the request
	console.log(`POST request for /auth/refresh`);

	// read cookie
	const sessionCookie = req.cookies.sessionid;

	// Check if the cookie is valid
	if (sessionCookie !== sessionid) {
		res.sendStatus(401);
		return;
	}

	// Send JSON response
	res.json({ detail: 'success' });
});

// Handle requests for upload endpoint
app.post('/api/upload/', (req, res) => {

	// log the request
	console.log(`POST request for /upload`);

	// read cookie
	const sessionCookie = req.cookies.sessionid;

	// Check if the cookie is valid
	if (sessionCookie !== sessionid) {
		res.sendStatus(401);
		return;
	}

	// Send JSON response
	res.json({ success: true });
});


app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
});