
const http = require('http');

const options = {
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/users/me',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzdhMTlkMTk0OTNkNWU0NDg3ZGRkYiIsImlhdCI6MTc2NTg1NTk4NywiZXhwIjoxNzY2NDYwNzg3fQ.qwaMKfZvHYXJOC8LCCFFxd_VNYG4206G9ED7bwpr0U4',
        'Content-Type': 'application/json'
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.end();
