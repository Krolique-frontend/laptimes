import {useRef} from 'react';
import ti from './TableItem.module.css';

const TableItem = ({data}) => {
    data.make = data.make.toUpperCase();

    const dropDown = useRef(null);
    const arrow = useRef(null);

    function toggleSpecs() {
        arrow.current.classList.toggle(ti.flip);
        dropDown.current.classList.toggle(ti.showList);
    }

    return (
        <li className={ti.tableItem}>
            <div className={`${ti.tableItem__nameNtime} flexRow`}>
                <span className={ti.pilot}>{data.pilot}</span>
                <span className={ti.time}>{data.time}</span>
            </div>

            <span className={ti.car}>{data.make} {data.model}</span>

            <span className={ti.arrow} onClick={toggleSpecs} ref={arrow}>
                <img src="img/arrow.svg" alt="arrow img"/>
            </span>

            <div className={ti.dropdownSpecs} ref={dropDown}>

                <p className={`${ti.dropdownItem} flexRow`}>
                    <span className={ti.dropdown__span}>Когда:</span>
                    <span className={ti.dropdown__span}>{data.date}</span>
                </p>

                <p className={`${ti.dropdownItem} flexRow`}>
                    <span className={ti.dropdown__span}>Где:</span>
                    <span className={ti.dropdown__span}>{data.track}</span>
                </p>

                <p className={`${ti.dropdownItem} flexRow`}>
                    <span className={ti.dropdown__span}>Почему:</span>
                    <span className={ti.dropdown__span}>{data.event}</span>
                </p>

                <p className={`${ti.dropdownItem} flexRow`}>
                    <span className={ti.dropdown__span}>Класс:</span>
                    <span className={ti.dropdown__span}>{data.class}</span>
                </p>

                <p className={`${ti.dropdownItem} flexRow`}>
                    <span className={ti.dropdown__span}>Резина:</span>
                    <span className={ti.dropdown__span}>{data.tyre}</span>
                </p>

                <p className={`${ti.dropdownItem} flexRow`}>
                    <span className={ti.dropdown__span}>Мотор:</span>
                    <span className={ti.dropdown__span}>{data.engine}</span>
                </p>

                <p className={`${ti.dropdownItem} flexRow`}>
                    <span className={ti.dropdown__span}>Наддув:</span>
                    <span className={ti.dropdown__span}>{data.aspiration}</span>
                </p>

                <p className={`${ti.dropdownItem} flexRow`}>
                    <span className={ti.dropdown__span}>Привод:</span>
                    <span className={ti.dropdown__span}>{data.drivetrain}</span>
                </p>
            </div>
        </li>
    );
}

export default TableItem;