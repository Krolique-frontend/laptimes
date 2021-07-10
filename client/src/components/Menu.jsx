import React, {useRef, useState} from 'react';
import menu from './Menu.module.css';
import {useHttp} from "../hooks/http.hook";
import {Filters} from "./Filters";
import About from "./About";

const Menu = ({racemode, raceDay, toMain}) => {
    // const dates = props.dates;
    const {request} = useHttp();
    const [filtersArr, setFilters] = useState([]);
    const alertDiv = useRef(null);
    const m = useRef(null);

    function toggleMenu() {
        m.current.classList.toggle(menu.show);
    }

    function toggleDropdown(event) {
        const list = event.target.nextElementSibling;
        m.current.classList.toggle(menu.show);
        list.classList.toggle(menu.showList);
    }

    function toggleSwitch(event) {
        const list = event.target.parentElement;
        list.classList.toggle(menu.showList);
        m.current.classList.toggle(menu.show);
    }

    const trackSelect = async (event) => {
        try {
            const data = await request(`/api/tables/track?track=${event.target.value}`);
            toMain(data);
            toggleMenu();
        } catch (e) {
            console.log('eroor happened', e);
        }
    };

    function showAlert() {
        alertDiv.current.classList.toggle(menu.showAlert);
        setTimeout(() => {
            alertDiv.current.classList.toggle(menu.showAlert);
        }, 5000);
    }

    const todayHandler = event => {
        if (!raceDay) {
            event.preventDefault();
            showAlert();
        }
    };

    return (
        <nav>
            <button className={menu.menuButton} onClick={toggleMenu}>Меню</button>

            <ul className={menu.menu} ref={m}>
                <li className={menu.menuItem}>
                    <button
                        className={menu.dropdown}
                        onClick={toggleDropdown}
                        style={racemode ? {display: 'none'} : null}
                    >
                        Трэк
                    </button>

                    <ul className={menu.list} id="track">
                        <li className={menu.item}>
                            <input
                                type="radio"
                                name="track"
                                id="6km"
                                value="6km"
                                className={menu.radio__track}
                                onChange={trackSelect}
                            />
                            <label htmlFor="6km" className={menu.label__track}>6й км</label>
                        </li>

                        <li className={menu.item}>
                            <input
                                type="radio"
                                name="track"
                                id="nikoring"
                                value="nikoring"
                                className={menu.radio__track}
                                onChange={trackSelect}
                            />
                            <label htmlFor="nikoring" className={menu.label__track}>Никоринг</label>
                        </li>

                        <li className={menu.switch} onClick={toggleSwitch}>X</li>
                    </ul>
                </li>

                <li className={menu.menuItem}>
                    <button
                        className={menu.dropdown}
                        onClick={toggleDropdown}
                        style={racemode ? {display: 'none'} : null}
                    >
                        фильтры
                    </button>
                    <form className={menu.list} id="event">
                        <Filters
                            className={menu.item}
                            filters={filtersArr}
                        />

                        <span className={menu.switch} onClick={toggleSwitch}>X</span>
                    </form>
                </li>

                <li className={menu.menuItem}>
                    <a
                        className={menu.menuLink}
                        href={racemode ? '/' : '/today'}
                        onClick={todayHandler}
                    >
                        {racemode ? 'на главную' : 'гонка'}
                    </a>
                </li>

                <li className={menu.menuItem}>
                    <a
                        className={menu.menuLink}
                        href='/admin'
                    >
                        Админ
                    </a>
                </li>

                <li className={menu.menuItem}>
                    <button
                        className={menu.dropdown}
                        onClick={toggleDropdown}
                    >
                        Регламенты
                    </button>
                    <div className={menu.list}>
                        <a className={menu.menuLink} href="/reglaments/rom">ROM</a>
                        <a className={menu.menuLink} href="/reglaments/brd">BRD</a>
                        <span className={menu.switch} onClick={toggleSwitch}>X</span>
                    </div>
                </li>

                <li className={menu.menuItem}>
                    <button
                        className={menu.dropdown}
                        onClick={toggleDropdown}
                    >
                        Даты гонок
                    </button>
                    <ul className={menu.list}>
                        <li className={menu.dateItem}>30.05.2021 - Race of Masters, Николаев</li>
                        <li className={menu.dateItem}>10-11.07.2021 - Race of Masters, Николаев</li>
                        <li className={menu.dateItem}>22.08.2021 - Race of Masters, Николаев</li>
                        <li className={menu.dateItem}>26.09.2021 - Race of Masters, Николаев</li>
                        <li className={menu.switch} onClick={toggleSwitch}>X</li>
                    </ul>
                </li>

                <li className={menu.menuItem}>
                    <button
                        className={menu.dropdown}
                        onClick={toggleDropdown}
                    >
                        Инфо
                    </button>
                    <div className={menu.list}>
                        <About/>
                    </div>
                </li>
            </ul>

            <div className={menu.alert} ref={alertDiv}>Сегодня гонок нет. Смотрите календарь мероприятий</div>
        </nav>
    )
};

export default Menu;