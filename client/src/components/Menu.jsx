import React, {useState} from 'react';
import menu from './Menu.module.css';
import {useHttp} from "../hooks/http.hook";
import {Filters} from "./Filters";
import About from "./About";

const Menu = ({racemode}) => {
    // const dates = props.dates;
    const {request} = useHttp();
    const [filtersArr, setFilters] = useState([]);

    function toggleMenu() {
        const m = document.querySelector(`.${menu.menu}`);
        m.classList.toggle(menu.show);
    }

    function toggleDropdown(event) {
        const list = event.target.nextElementSibling;

        list.classList.toggle(menu.showList);
    }

    const trackSelect = async (event) => {
        // console.log('selected');
        try {
            const data = await request(`/api/tables/track/${event.target.value}`);
            // console.log(data);
        } catch (e) {
            console.log('eroor happened', JSON.stringify(e));
        }
    };

    return (
            <nav>
                <button className={menu.menuButton} onClick={toggleMenu}>Меню</button>

                <ul className={menu.menu}>
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
                        </form>
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

                    <li className={menu.menuItem}>
                        <a className={menu.menuLink} href={racemode ? '/' : '/today'} >{racemode ? 'на главную' : 'гонка'}</a>
                    </li>

                    <li className={menu.menuItem}>
                        <a
                            className={menu.menuLink}
                            href='/admin'
                            style={racemode ? null : {display: 'none'}}
                        >
                            Админ
                        </a>
                    </li>
                </ul>

            </nav>
    )
};

export default Menu;