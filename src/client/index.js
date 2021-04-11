import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import App from './pages/App.jsx';
import './styles/index.css';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
});

ReactDOM.render(<ApolloProvider client={client}>
    <App />
</ApolloProvider>, document.querySelector('#root'));