import ti from './TableItem.module.css';

const TableItem = (props) => {
    const data = props.data;

    data.make = data.make.toLowerCase();

    function toggleSpecs(event) {
        if (event.target.tagName !== 'LI') return;

        const list = event.target.children[2];

        event.target.classList.toggle(ti.altAfter);
        list.classList.toggle(ti.showList);
    }

    return (
        <li className={ti.tableItem} onClick={toggleSpecs}>
            <div className={`${ti.tableItem__nameNtime} flexRow`}>
                <span className={ti.pilot}>{data.pilot}</span>
                <span className={ti.time}>{data.time}</span>
            </div>
            <span className={ti.car}>{data.make} {data.model}</span>

            <div className={ti.dropdownSpecs}>

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