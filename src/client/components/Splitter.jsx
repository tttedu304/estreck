import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Splitter.css';

const MIN_WIDTH = 300;

export function LeftPane({ children, leftWidth, setLeftWidth }) {
    const leftRef = createRef();
    useEffect(() => {
        if (leftRef.current) {
            if (!leftWidth) return setLeftWidth(leftRef.current.clientWidth);

            leftRef.current.style.width = `${leftWidth}px`;
        }
    }, [leftRef, leftWidth, setLeftWidth]);

    return (
        <div ref={leftRef}>{children}</div>
    );
}

LeftPane.propTypes = {
    children: PropTypes.object,
    leftWidth: PropTypes.number,
    setLeftWidth: PropTypes.func
};

export default function Splitter({ children }) {
    const [leftWidth, setLeftWidth] = useState(500);
    const [separatorXPosition, setSeparatorXPosition] = useState();
    const [dragging, setDragging] = useState(false);
    const splitPaneRef = createRef();

    function onMouseDown(e) {
        setSeparatorXPosition(e.clientX);
        setDragging(true);
    }

    function onTouchStart(e) {
        setSeparatorXPosition(e.touches[0].clientX);
        setDragging(true);
    }

    function onMove(clientX) {
        if (dragging && leftWidth && separatorXPosition) {
            const newLeftWidth = leftWidth + clientX - separatorXPosition;
            setSeparatorXPosition(clientX);

            if (newLeftWidth < MIN_WIDTH) {
                setLeftWidth(MIN_WIDTH);
                return;
            }

            if (splitPaneRef.current) {
                const splitPaneWidth = splitPaneRef.current.clientWidth;

                if (newLeftWidth > splitPaneWidth - MIN_WIDTH) {
                    setLeftWidth(splitPaneWidth - MIN_WIDTH);
                    return;
                }
            }

            setLeftWidth(newLeftWidth);
        }
    }

    function onMouseMove(e) {
        e.preventDefault();
        onMove(e.clientX);
    }

    function onTouchMove(e) {
        onMove(e.touches[0].clientX);
    }

    function onMouseUp() {
        setDragging(false);
    }

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    });

    return (
        <div className={styles.splitView} ref={splitPaneRef}>
            <LeftPane leftWidth={leftWidth} setLeftWidth={setLeftWidth}>
                {children[0]}
            </LeftPane>
            <div
                className={styles.dividerHitbox}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                onTouchEnd={onMouseUp}
            >
                <div className={styles.divider} />
            </div>
            <div className={styles.rightPane}>{children[1]}</div>
        </div>
    );
}

Splitter.propTypes = {
    children: PropTypes.array
};