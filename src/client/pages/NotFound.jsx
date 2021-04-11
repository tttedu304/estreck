import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (<div>
        <h1>404</h1>
        Are you lost? <br />
        Go <Link to='/'>home</Link>
    </div>);
}