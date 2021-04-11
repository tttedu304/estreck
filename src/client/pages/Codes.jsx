import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Code from '../components/Code.jsx';
import Splitter from '../components/Splitter.jsx';
import styles from '../styles/Codes.css';
import search from '../assets/search.svg';

const query = gql`
    query {
        codes (isValidated: false) {
            title
            description
            author { username }
            createdAt   
        }
    }
`;

export default function Codes() {

    const { data } = useQuery(query);

    return (
        <div className={styles.codes}>
            <Splitter>
                <div className={styles.left}>
                    <div className={styles.searchBar}>
                        <input type='search' placeholder='Type something...' />
                        <button><img src={search} width='15' height='15' /></button>
                    </div>
                    <div className={styles.list}>
                        {data && data.codes ? data.codes.map(code => (
                            <Code key={code}
                                {...code}
                            />
                        )) : <div>Loading..</div>}
                    </div>
                </div>
                <div style={{ margin: '1rem' }}>Result</div>
            </Splitter>
        </div>
    );
}