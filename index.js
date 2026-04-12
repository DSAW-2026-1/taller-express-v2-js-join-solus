// ESTE ARCHIVO DEBE SER MOVIDO A /api/index.js
// O puedes dejarlo aquí, pero Vercel prefiere la carpeta /api/

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const PORT = process.env.PORT || port;
app.use(cors());
app.use(express.json());

const users = [
    {
        username: 'ADMIN',
        password: 'ADMIN',
        role: 'admin'
    },
    {
        username: 'USER',
        password: 'USER',
        role: 'user'
    }
];

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.get('/users', (req, res) => {
    res.json(users.map(u => ({ username: u.username, role: u.role })));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.status(200).json({ token: 'token..' });
    } else {
        res.status(400).json({ message: 'invalid credentials' });
    }
});

app.get('/request', (req, res) => {
    const role = req.headers['role'];

    if (role === 'ADMIN') {
        res.status(200).json({ message: 'Hi from ADMIN' });
    } else if (role === 'USER') {
        res.status(200).json({ message: 'Hi from USER' });
    } else {
        res.status(401).json({ message: 'your not allowed to do this' });
    }
});

// Solo ejecutar app.listen si no estamos en Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
}

module.exports = app;