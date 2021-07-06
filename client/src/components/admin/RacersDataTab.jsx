import React from 'react';
import {useHttp} from '../../hooks/http.hook';
import admin from "../../pages/admin.module.css";
import FormComp from "./FormComp";

const stuff = [
    'date',
    'event',
    'track',
    'number',
    'pilot',
    'make',
    'model',
    'engine',
    'aspiration',
    'drivetrain',
    'tyre',
    'class',
    'time'
];

const RacersDataTab = ({sendRaceDayStatus}) => {
    function sendToDb() {
    }

    const formSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const data = {};

        for (let item of form) {
            data[item.id] = item.value;
            delete data['racerButton'];
            delete data[""];

            if (!data['date']) delete data['date'];
        }

        return false;
    };

    const chkbx = event => {
        const data = {raceDayStatus: event.target.checked};
        sendRaceDayStatus(data);
    };

    return (
        <section id={admin.racersData}>
            <form id={admin.racerForm} onSubmit={formSubmit} name="racerAdminka">
                {stuff.map(elem => <FormComp key={elem} props={elem} />)}
                <button className={admin.button}>добавить</button>
            </form>

            <div className={admin.racemodeBlock}>
                <input type="checkbox" id={admin.racemodeCheckbox} value="true" onChange={chkbx}/>
                <span className={admin.racemodeTitle}>Гинка</span>
                <label htmlFor={admin.racemodeCheckbox} className={admin.racemodeSwitch}> <span className={admin.rmsCaret}></span> </label>
            </div>
        </section>
    );
};

export default RacersDataTab;