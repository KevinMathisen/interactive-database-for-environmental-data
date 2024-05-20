const express = require('express');
const app = express();
const fsp = require('fs').promises;
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

// initialize json data to be used in the mock server
let jsonData = {};

async function loadJsonFiles() {
  jsonData['river_with_species'] = JSON.parse(await fsp.readFile(path.join(__dirname, 'data', 'river_with_species.json'), 'utf8'));
  jsonData['station_with_species'] = JSON.parse(await fsp.readFile(path.join(__dirname, 'data', 'station_with_species.json'), 'utf8'));
  jsonData['river_summary'] = JSON.parse(await fsp.readFile(path.join(__dirname, 'data', 'river_summary.json'), 'utf8'));
  jsonData['station_summary'] = JSON.parse(await fsp.readFile(path.join(__dirname, 'data', 'station_summary.json'), 'utf8'));
  jsonData['station_download'] = JSON.parse(await fsp.readFile(path.join(__dirname, 'data', 'station_download.json'), 'utf8'));
}

	
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Handle requests for postgrest endpoint
app.get('/postgrest/:endpoint', (req, res) => {
	// get endpoint from request
	const { endpoint } = req.params;

	// log the request
	console.log(`GET request for ${endpoint}`);

	// Read cookie
	const sessionCookie = req.cookies.sessionid;

	// Check if the cookie is valid
	if (sessionCookie !== sessionid) {
		res.sendStatus(401);
		return;
	}

	// select json data based on endpoint
	let data = jsonData[endpoint];

	if (!data) {
		res.sendStatus(404).send('Not found');
		return;
	}

	// if endpoint is 'river_with_species' or 'station_with_species', simply return the data
	if (endpoint === 'river_with_species' || endpoint === 'station_with_species') {
		// Send JSON response
		res.json(data);
		return;
	}

	// get id from query
	const { id } = req.query;

	// check if id is defined as eq.<id> or in.(<id1>,<id2>,...)
	const eqMatch = id.match(/^eq\.(\d+)$/);
	const inMatch = id.match(/^in\.\((\d+(,\d+)*)\)$/);

	if (eqMatch) {
		// if eq, select data with specified id
		data = data.filter(item => item.id === Number(eqMatch[1]));
	} else if (inMatch) {
		// if in, select all data with specified ids
		const ids = inMatch[1].split(',').map(Number);
		data = data.filter(item => ids.includes(item.id));
	} else {
		data = [];
	}

	// Send JSON response
	res.json(data);
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


loadJsonFiles().then(() => {
  app.listen(port, () => {
    console.log(`Mock server listening at http://localhost:${port}`);
  });
});