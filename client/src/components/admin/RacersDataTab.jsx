import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from '../../hooks/http.hook';
import admin from "../../pages/admin.module.css";
import FormComp from "./FormComp";

const stuff = [
    'number',
    'pilot',
    'make',
    'model',
    'engine',
    'aspiration',
    'drivetrain',
    'tyre',
    'class'
];

const RacersDataTab = ({addNewRacer, switchRaceDay}) => {
    const {request} = useHttp();
    const raceDayUrl = '/api/tables/raceDayState'
    const [raceDayState, setRaceDayState] = useState(false);
    const setRaceDay = useCallback(async () => {
        try {
            const raceDayReq = await request(raceDayUrl, 'GET', null);
            console.log('raceDayReq >>>>', raceDayReq)
            if (raceDayReq.hasOwnProperty('raceDayStatus')) setRaceDayState(raceDayReq.raceDayStatus);
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }, [request]);
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

        // console.log({addRacer: true ,...data});
        addNewRacer({addRacer: true, ...data});
        return false;
    };

    const switchRaceDayState = event => {
        const data = {raceDayStatus: event.target.checked};
        switchRaceDay(data);
        console.log(data)
    };

    useEffect(async () => await setRaceDay(), [setRaceDay])
    console.log('raceDayState >>>', raceDayState)

    return (
        <section id={admin.racersData}>
            <form
                id={admin.racerForm}
                onSubmit={formSubmit}
                name="racerAdminka"
            >
                {stuff.map(elem => <FormComp key={elem} props={elem} />)}

                <button className={admin.button}>добавить</button>
            </form>

            <div className={admin.racemodeBlock}>
                <input
                    type="checkbox"
                    id={admin.racemodeCheckbox}
                    value={''+raceDayState}
                    onChange={switchRaceDayState}
                />

                <span className={admin.racemodeTitle}>Гинка</span>

                <label
                    htmlFor={admin.racemodeCheckbox}
                    className={admin.racemodeSwitch}
                >
                    <span className={admin.rmsCaret}/>
                </label>
            </div>
        </section>
    );
};

export default RacersDataTab;