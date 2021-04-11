import React, { createRef, useEffect, useState } from 'react';
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
    mutation($email: String!, $username: String!, $password: String!) {
        signup(email: $email, username: $username, password: $password) {
            username
        }
    }
`;

export default function Signup() {
    const [errorMessage, setErrorMessage] = useState();
    const { data, refetch } = useQuery(query);
    const [signup] = useMutation(mutation);
    const emailInput = createRef();
    const usernameInput = createRef();
    const passwordInput = createRef();
    const history = useHistory();

    useEffect(() => {
        if (!errorMessage) return;
        emailInput.current.value = '';
        usernameInput.current.value = '';
        passwordInput.current.value = '';
    }, [errorMessage]);

    if (data && data.user)
        return (<Redirect to='/' />);

    async function sendForm() {
        try {
            await signup({
                variables: {
                    email: emailInput.current.value,
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
                <h1>Sign Up</h1>
            </div>
            <div className={`${styles['control']} ${styles['block-cube']} ${styles['block-input']}`}>
                <input ref={usernameInput}
                    placeholder='Username'
                    type='text' autoComplete='off' />
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
            <div className={`${styles['control']} ${styles['block-cube']} ${styles['block-input']}`}>
                <input ref={emailInput}
                    placeholder='Email'
                    type='email' autoComplete='off' />
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
                    type='password' autoComplete='off' />
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
                <div className={styles.text}>Sign up</div>
            </button>
            <br />
            <button
                className={`${styles.btn} ${styles['block-cube']} ${styles['block-cube-hover']}`}
                onClick={() => {
                    history.push('/login');
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
                <div className={styles.text}>Already have an account? Go to Login</div>
            </button>
        </div>
    );
}