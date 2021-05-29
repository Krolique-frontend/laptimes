import React from 'react';
import styles from "./statusTab.module.css";
import Racer from "./Racer";

const StatusTab = ({list, sendWs}) => {

    const wsSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const data = [];

        for (let item of form) {
            if (item.checked) data.push({name: item.name, status: item.value});
            // item.checked === true ? data.push({name: item.name, status: item.value}) : null;
            if (item.type === 'text' && item.value !== '') {
                data.find(el => {
                    if (el.name === item.dataset.name) {
                        const timesArr = item.parentNode.childNodes;
                        el['times'] = [];

                        timesArr.forEach(child => child.value !== ''
                            ? el.times.push(child.value)
                            : null
                        );

                        return el.times;
                    } else return null;
                });
            }
        }

        sendWs(data);
        return false;
    };

    return (
        <section id={styles.status}>
            <form id={styles.statusForm} name='adminka' onSubmit={wsSubmit}>
                <div className={styles.header}>
                    <span className={styles.headerItem}>№</span>
                    <span className={styles.headerItem}>Имя</span>
                    <span className={styles.headerItem}>тачка</span>
                    <span className={styles.headerItem}>статус</span>
                    <span className={styles.headerItem}>времена</span>
                </div>

                <div className={styles.pilotsList}>
                    {
                        list
                            ? list.map(elem => <Racer key={elem.number} pilot={elem}/>)
                            : <h1>пока никого</h1>
                    }
                </div>

                <button className={styles.button}>отправить</button>
            </form>
        </section>
    );
};

export default StatusTab;