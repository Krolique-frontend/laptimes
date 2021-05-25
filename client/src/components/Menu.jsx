import menu from './Menu.module.css';

const Menu = (props) => {
    const dates = props.dates;

    function toggleMenu() {
        const m = document.querySelector(`.${menu.menu}`);
        m.classList.toggle(menu.show);
    }

    function toggleDropdown(event) {
        const list = event.target.nextElementSibling;

        event.target.classList.toggle(menu.altAfter);
        list.classList.toggle(menu.showList);
    }

    return (
            <nav>
                <a className={menu.menuButton} onClick={toggleMenu}>Меню</a>

                <ul className={menu.menu + ' ' +  menu.hide}>
                    <li>
                        <a className={menu.dropdown} onClick={toggleDropdown}>Трэк</a>
                        <ul className={menu.list} id="track">
                            <li className={menu.item}>
                                <input type="radio" name="track" id="6km" value="6km" checked/>
                                <label htmlFor="6km">6й км</label>
                            </li>

                            <li className={menu.item}>
                                <input type="radio" name="track" id="nikoring" value="nikoring" />
                                <label htmlFor="nikoring">Никоринг</label>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a className={menu.dropdown} onClick={toggleDropdown}>Мероприятие</a>
                        <ul className={menu.list} id="event">
                            <li className={menu.item}>
                                <input type="radio" name="event" id="allEvents" value="all"  />
                                <label htmlFor="allEvents">Все</label>
                            </li>

                            {dates.map((date) => <li className={menu.item}>
                                <input type="radio" id={date} name="event" value={date}/>
                                <label htmlFor={date}>{date}</label>
                            </li>)}
                        </ul>
                    </li>

                    <li>
                        <a className={menu.menuLink} href="/">На главную</a>
                    </li>
                </ul>

            </nav>
    )
};

export default Menu;