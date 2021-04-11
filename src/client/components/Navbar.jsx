import React, { createRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from '../styles/index.css';
import bars from '../assets/bars.svg';

function CustomLink(props) {
    const location = useLocation();
    return (<Link {...props}
        className={`${props.className ? props.className : ''} ${location.pathname === props.to ? styles.activePage : ''}`.trim()}
    >{props.children}</Link>);
}

CustomLink.propTypes = Link.propTypes;

export default function Navbar() {
    const navbarRef = createRef();
    return (<div className={styles.navbar} ref={navbarRef}>
        <div className={styles.links}>
            <CustomLink to='/'>Home</CustomLink>
            <CustomLink to='/codes'>Codes</CustomLink>
            <CustomLink to='/add'>Add Code</CustomLink>
            <CustomLink to='/about' className={styles.special}>Wtf is Estreck</CustomLink>
        </div>
        <div className={styles.links}>
            <CustomLink to='/about'>Wtf is Estreck</CustomLink>
            <p className={styles.bars} onClick={() => {
                navbarRef.current.classList.toggle(styles.responsive);
            }}><img src={bars} width='26' height='26' /></p>
        </div>
    </div>);
}