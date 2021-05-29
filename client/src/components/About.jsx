import React from 'react';
import styles from './about.module.css';

function About() {
    const block = document.querySelector(`.${styles.about}`);

    const toggle = (event) => {
        if (event.target.tagName === 'A') return;
        const classToToggle = block.parentNode.classList[1];
        const node = block.parentNode;

        node.classList.toggle(classToToggle);
    };

    return (
        <div className={styles.about} onClick={toggle}>
            <p>Это веб-приложение, тут можно посмотреть времена круга на Одесском 6км и Николаевском картодроме.</p>
            <p>Но самый цимес - это режим "гонка". Вы в своем телефоне можете видеть у кого какое время в день гонки. Если прослушал, кому надо готовиться к заезду, а кто уже дубасит - так же можно глянуть тут.</p>
            <p>В будущем буду добавлять прочие свистелки-перделки, как то
                <ul>
                    <li>Скачать регламент</li>
                    <li>отфильтровать данные на любой вкус</li>
                    <li>добавить свое время с рейсхроно</li>
                    <li>и шо нибудь еще придумаем</li>
                    <li>???</li>
                    <li>PROFIT!!!</li>
                </ul>
                </p>
            <p>P.S. Дизайн говно, но у меня нет вкуса и воображения, так шо сделал как смог. В будущем человек со вкусом и воображением поможет мне оформить это всё по красоте.</p>
            <p>По вопросам и предложениям милости просим
                <ul>
                    <li>мыло - <a href="mailto:korolenko.fe@gmail.com">korolenko.fe@gmail.com</a></li>
                    <li>телега - <a href="tg://resolve?domain=krolique46">@krolique46</a></li>
                </ul>
            </p>
        </div>
    );
}

export default About;