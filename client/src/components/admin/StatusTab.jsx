import React from 'react';
import styles from "./statusTab.module.css";
import Racer from "./Racer";

const StatusTab = ({data}) => {
    return (
        <section id={styles.status}>
            <form id={styles.statusForm} name='adminka'>
                <div className={styles.header}>
                    <span className={styles.headerItem}>№</span>
                    <span className={styles.headerItem}>Имя</span>
                    <span className={styles.headerItem}>тачка</span>
                    <span className={styles.headerItem}>статус</span>
                    <span className={styles.headerItem}>времена</span>
                </div>

                <div className={styles.pilotsList}>
                    {
                        data
                            ? data.map(elem => <Racer pilot={elem}/>)
                            : <h1>пока никого</h1>
                    }
                </div>

                <button className={styles.button}>отправить</button>
            </form>
        </section>
    );
};

export default StatusTab;