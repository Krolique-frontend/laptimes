import sort from './Sort.module.css';
import Sortings from "../hooks/sorting";
import React from "react";

const Sort = (props) => {
    const table = props.data;
    const klass = new Sortings().filterBy(table.map(el => el['class']));
    const dt = new Sortings().filterBy(table.map(el => el['drivetrain'].toUpperCase()));
    const aspir = new Sortings().filterBy(table.map(el => el['aspiration'].toUpperCase()));
    const car = new Sortings().filterBy(table.map(el => el['make'].toUpperCase())).sort((a, b) => a < b ? -1 : 1);

    function togglesort() {
        const m = document.querySelector(`.${sort.sort}`);
        m.classList.toggle(sort.show);
    }

    function toggleDropdown(event) {
        const list = event.target.nextElementSibling;

        event.target.classList.toggle(sort.altAfter);
        list.classList.toggle(sort.showList);
    }

    function filter(event) {
        if (event.target.type !== 'checkbox') return;
        // console.log(event.target.dataset);
        let filterArr = [];
        document.querySelectorAll('.check_box').forEach(el => {
            if (el.checked === true) {
                filterArr.push(el.value);
            }
        });
        // console.log(filterArr);
        props.dataFromSortComponent(filterArr); // sends filters array to App component
    }

    return (
        <nav>
            <a className={sort.sortButton} onClick={togglesort}>Фильтры</a>

            <ul className={sort.sort + ' ' + sort.hide}>
                <li>
                    <a className={sort.dropdown} onClick={toggleDropdown}>Класс</a>
                    <ul className={sort.list} id={sort.class}>
                        <li className={sort.item}>
                            <input type="radio" name="class" id="allClass" value="all"  />
                            <label htmlFor="allClass">Все</label>
                        </li>

                        {klass.map(el => <li className={sort.item}>
                            <input
                                type="radio"
                                className="check_box"
                                value={el}
                                name="class"
                                onChange={filter}
                            />
                            {el}
                        </li>)
                        }
                    </ul>
                </li>

                <li>
                    <a className={sort.dropdown} onClick={toggleDropdown}>Привод</a>
                    <ul className={sort.list} id={sort.drivetrain}>
                        <li className={sort.item}>
                            <input type="radio" name="drivetrain" id="allDrivetrain" value="all"  />
                            <label htmlFor="allDrivetrain">Все</label>
                        </li>

                        {dt.map(el => <li className={sort.item}>
                            <input
                                type="radio"
                                className="check_box"
                                value={el}
                                name="drivetrain"
                                onChange={filter}
                            />
                            {el}
                        </li>)
                        }
                    </ul>
                </li>

                <li>
                    <a className={sort.dropdown} onClick={toggleDropdown}>Наддув</a>
                    <ul className={sort.list} id={sort.aspiration}>
                        <li className={sort.item}>
                            <input type="radio" name="aspiration" id="allAspiration" value="all"  />
                            <label htmlFor="allAspiration">Все</label>
                        </li>

                        {aspir.map(el => <li className={sort.item}>
                            <input
                                type="radio"
                                className="check_box"
                                value={el}
                                name="aspiration"
                                onChange={filter}
                            />
                            {el}
                        </li>)
                        }
                    </ul>
                </li>

                <li>
                    <a className={sort.dropdown} onClick={toggleDropdown}>Марка авто</a>
                    <ul className={sort.list} id={sort.make}>
                        <li className={sort.item}>
                            <input type="radio" name="make" id="allEvents" value="all"  />
                            <label htmlFor="allEvents">Все</label>
                        </li>

                        {car.map(el => <li className={sort.item}>
                            <input
                                type="radio"
                                className="check_box"
                                value={el}
                                name="make"
                            />
                            {el}
                        </li>)
                        }
                    </ul>
                </li>
            </ul>

        </nav>
    )
};

export default Sort;