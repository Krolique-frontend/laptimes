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
            <span>{pilot.number}</span>
            <span>{pilot.pilot}</span>
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

            <div className={racer.times}>
                <input
                    type="text"
                    className={racer.time}
                    name='time1'
                    data-name={pilot.pilot}
                    placeholder='время1'
                    maxLength="8"
                    onInput={timeInputHandler}
                />

                <input
                    type="text"
                    className={racer.time}
                    name='time2'
                    data-name={pilot.pilot}
                    placeholder='время2'
                    maxLength="8"
                    onInput={timeInputHandler}
                />

                <input
                    type="text"
                    className={racer.time}
                    name='time3'
                    data-name={pilot.pilot}
                    placeholder='лучшее'
                    maxLength="8"
                    onInput={timeInputHandler}
                />
            </div>
        </div>
    );
};

export default Racer;