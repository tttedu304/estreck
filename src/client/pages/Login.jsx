import React, { createRef, useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Redirect, useHistory } from 'react-router-dom';

import close from '../assets/close.svg';
import styles from '../styles/Auth.css';

const query = gql`
    query {
        user {
            username
        }
    }
`;

const mutation = gql`
    mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
        }
    }
`;

export default function Login() {
    const [errorMessage, setErrorMessage] = useState();
    const { data, refetch } = useQuery(query);
    const [login] = useMutation(mutation);
    const history = useHistory();
    const usernameInput = createRef();
    const passwordInput = createRef();

    useEffect(() => {
        if (!errorMessage) return;
        usernameInput.current.value = '';
        passwordInput.current.value = '';
    }, [errorMessage]);

    if (data && data.user)
        return (<Redirect to='/' />);

    async function sendForm() {
        try {
            await login({
                variables: {
                    username: usernameInput.current.value,
                    password: passwordInput.current.value
                }
            });
            await refetch();
        } catch (e) {
            setErrorMessage();
            setErrorMessage(e.message);
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.error} style={{ display: errorMessage ? 'flex' : 'none' }}>
                <p>{errorMessage}</p>
                <img onClick={() => {
                    setErrorMessage();
                }} src={close} width='18' height='18' />
            </div>
            <div className={styles.control}>
                <h1>Sign In</h1>
            </div>
            <div className={`${styles['control']} ${styles['block-cube']} ${styles['block-input']}`}>
                <input ref={usernameInput}
                    placeholder='Username'
                    type='text' autoComplete='off' id='userInputId' />
                <div className={styles['bg-top']}>
                    <div className={styles['bg-inner']}></div>
                </div>
                <div className={styles['bg-right']}>
                    <div className={styles['bg-inner']}></div>
                </div>
                <div className={styles.bg}>
                    <div className={styles['bg-inner']}></div>
                </div>
            </div>
            <div className={`${styles.control} ${styles['block-cube']} ${styles['block-input']}`}>
                <input ref={passwordInput}
                    placeholder='Password'
                    type='password' autoComplete='off' id='passInputId' />
                <div className={styles['bg-top']}>
                    <div className={styles['bg-inner']}></div>
                </div>
                <div className={styles['bg-right']}>
                    <div className={styles['bg-inner']}></div>
                </div>
                <div className={styles.bg}>
                    <div className={styles['bg-inner']}></div>
                </div>
            </div>
            <button
                className={`${styles.btn} ${styles['block-cube']} ${styles['block-cube-hover']}`}
                onClick={() => sendForm()}>
                <div className={styles['bg-top']}>
                    <div className={styles['bg-inner']}></div>
                </div>
                <div className={styles['bg-right']}>
                    <div className={styles['bg-inner']}></div>
                </div>
                <div className={styles.bg}>
                    <div className={styles['bg-inner']}></div>
                </div>
                <div className={styles.text}>Log In</div>
            </button>
            <br />
            <button
                className={`${styles.btn} ${styles['block-cube']} ${styles['block-cube-hover']}`}
                onClick={() => {
                    history.push('/signup');
                }}>
                <div className={styles['bg-top']}>
                    <div className={styles['bg-inner']}></div>
                </div>
                <div className={styles['bg-right']}>
                    <div className={styles['bg-inner']}></div>
                </div>
                <div className={styles.bg}>
                    <div className={styles['bg-inner']}></div>
                </div>
                <div className={styles.text}>Don´t have an account? Go to Sign Up</div>
            </button>

        </div>
    );
}