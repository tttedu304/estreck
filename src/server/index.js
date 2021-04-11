require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import session from 'express-session';
import mongodb from './models.js';
import express from 'express';
import { join } from 'path';

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground:
        process.env.NODE_ENV === 'production' ? false : {
            settings: {
                'request.credentials': 'include'
            }
        },
    context: ({ req }) => ({ req })
});

app.use(mongodb());
app.use(session({
    secret: 'Estreck',
    resave: false,
    saveUninitialized: false
}));
server.applyMiddleware({ app });
app.set('port', process.env.PORT || 3000);
app.use(express.static(join(__dirname, 'public')));

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'public/index.html'));
});

app.listen(app.get('port'), (err) => {
    if (err) return console.error(err);
    console.log(`Server ready! http://localhost:${app.get('port')}`);
});