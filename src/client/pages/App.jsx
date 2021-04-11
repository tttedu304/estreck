import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Loading from '../components/Loading.jsx';
import Navbar from '../components/Navbar.jsx';
import styles from '../styles/index.css';
import NotFound from './NotFound.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Codes from './Codes.jsx';

export default function App() {
    const [loading, setLoading] = useState(true);
    const randomTime = (Math.random() * 1000) + 1500;
    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), randomTime);
        return () => clearTimeout(timeout);
    });
    return (
        <BrowserRouter>
            <Navbar />
            <div className={styles.background}>
                {loading
                    ? <Loading />
                    : <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/login' component={Login} />
                        <Route path='/codes' component={Codes} />
                        <Route path='/signup' component={Signup} />
                        <NotFound />
                    </Switch>}
            </div>
        </BrowserRouter>
    );
}