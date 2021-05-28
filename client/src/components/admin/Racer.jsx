import React from 'react';
import racer from './racer.module.css';

const Racer = ({pilot}) => {
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
                        checked
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
                />

                <input
                    type="text"
                    className={racer.time}
                    name='time2'
                    data-name={pilot.pilot}
                    placeholder='время2'
                />

                <input
                    type="text"
                    className={racer.time}
                    name='time3'
                    data-name={pilot.pilot}
                    placeholder='лучшее'
                />
            </div>
        </div>
    );
};

export default Racer;