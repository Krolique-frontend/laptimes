import React from 'react';
import admin from "../../pages/admin.module.css";

export default function FormComp({props}) {
    const placeholder = props === 'date'
        ? 'dd.MM.yyyy'
        : props === 'engine'
            ? '5.7'
            : props === 'time'
                ? '00:00:00'
                : null;

    const required = props !== 'date';

    const input = props === 'aspiration'
        ? <select id={props} className={admin.dataSelect} required>
                        <option value="atmo">atmo</option>
                        <option value="turbo">turbo</option>
                        <option value="supercharger">supercharger</option>
                        <option value="electro">electro</option>
                    </select>
        : props === 'drivetrain'
            ? <select id={props} className={admin.dataSelect} required>
                        <option value="rwd">rwd</option>
                        <option value="awd">awd</option>
                        <option value="fwd">fwd</option>
                    </select>
            : <input
                id={props}
                type="text"
                className={admin.dataInput}
                placeholder={placeholder}
                required={required}
            />

    return(
        <div className={admin.inputWrapper}>
            <label htmlFor={props} className={admin.dataLabel}>{props}</label>
            {input}
        </div>
    );
}