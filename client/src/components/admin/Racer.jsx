import React from 'react';
import racer from './racer.module.css';

const Racer = ({pilot}) => {
    const timeInputHandler = event => {
        if (event.nativeEvent.inputType === 'deleteContentBackward') return null;
        if (event.target.value.length === 2) event.target.value += ':';
        if (event.target.value.length === 5) event.target.value += ':';
    };

    return (
        <div className={racer.pilot}>
            <span className={racer.number}>{pilot.number}</span>
            <span className={racer.name}>{pilot.pilot}</span>
            <span className={racer.car}>{pilot.model}</span>

            <div className={racer.inputs}>
                <div>
                    <label>дубасит</label>
                    <input
                        type="radio"
                        name={pilot.pilot}
                        value='session'
                    />
                </div>
                <div>
                    <label>готовится</label>
                    <input
                        type="radio"
                        name={pilot.pilot}
                        value='standby'
                    />
                </div>
                <div>
                    <label>техпарк</label>
                    <input
                        type="radio"
                        name={pilot.pilot}
                        value='park'
                    />
                </div>
            </div>

            <div className={racer.time}>
                <input
                    type="text"
                    name='time'
                    data-name={pilot.pilot}
                    placeholder='время'
                    maxLength="8"
                    onInput={timeInputHandler}
                />
            </div>
        </div>
    );
};

export default Racer;