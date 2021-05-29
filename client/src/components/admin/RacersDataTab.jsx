import React, {useState} from 'react';
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
const racers = [];

const RacersDataTab = ({sendDb}) => {
    const [display, setDisplay] = useState([]);
    function sendToDb() {
        sendDb(racers);
    }

    const formSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const data = {
        };

        for (let item of form) {
            data[item.id] = item.value;
            delete data['racerButton'];
            delete data[""];

            if (!data['date']) delete data['date'];
        }

        racers.push(data);
        console.log(data);

        let toDisplay = racers.map(obj => JSON
            .stringify(obj)
            .replaceAll('",', '"\n')
            .replaceAll('"}', '"}\n\n'));

        setDisplay(prev => toDisplay);

        // for (let item of form) {
        //     if (item.type === 'text') item.value = '';
        // }

        return false;
    };

    return (
        <section id={admin.racersData}>
            <form id={admin.racerForm} onSubmit={formSubmit} name="racerAdminka">
                {stuff.map(elem => <FormComp key={elem} props={elem} />)}
                <button className={admin.button}>добавить</button>
            </form>

            <aside id={admin.pilotsArr}>
                <div id={admin.jsonMonitor}>{display}</div>
                <button className={admin.button} onClick={sendToDb}>отправить</button>
            </aside>
        </section>
    );
};

export default RacersDataTab;