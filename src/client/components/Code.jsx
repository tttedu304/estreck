import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Codes.css';

export default function Code(props) {
    return (
        <div className={styles.code}>
            <h3 className={styles.title}>{props.title}</h3>
            <p className={styles.description}>{props.description}</p>
            <small className={styles.author}>Created by: {props.author.username} • {new Date(props.createdAt).toLocaleDateString()} </small>
            <p>Language: <span>{props.language}</span></p>
        </div>
    );
}

Code.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.object,
    createdAt: PropTypes.string,
    language: PropTypes.string
};