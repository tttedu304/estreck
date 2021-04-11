import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import styles from '../styles/Home.css';

const query = gql`
    query {
        user {
            username
        }
    }
`;

export default function Home() {
    const { data } = useQuery(query);

    return (<div className={styles.home}>
        <div className={styles.authButtons}>
            {!data || !data.user
                ? <>
                    <Link to='/signup'>Sign up</Link>
                    <Link to='/login'>Login</Link>
                </>
                : <>
                    <a className={styles.logoutButton} href='/logout'>Logout</a>
                    <p className={styles.loggedUser}>Hey, {data.user.username}</p>
                </>}
        </div>
        <div className={styles.estreckTitle}>
            estreck&trade;
        </div>
    </div>);
}