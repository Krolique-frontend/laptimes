import React from 'react';
import styles from './BrdRegl.module.css';
import Menu from "./Menu";

export function BrdRegl() {
    // const block = document.querySelector(`.${styles.about}`);

    // const toggle = (event) => {
    //     if (event.target.tagName === 'A') return;
    //     const classToToggle = block.parentNode.classList[1];
    //     const node = block.parentNode;
    //
    //     node.classList.toggle(classToToggle);
    // };

    return (
        // <div className={styles.about} onClick={toggle}>
        <div className={styles.main}>
            <h2 className={styles.title_h2}>Base Race Days регламент</h2>
            <h4>coming soon...</h4>
            <Menu racemode={true}/>
        </div>
    );
}