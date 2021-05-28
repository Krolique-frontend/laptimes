import React from 'react';
import admin from "../../pages/admin.module.css";

const RacersDataTab = () => {
    return (
        <section id={admin.racersData}>
            <form id={admin.racerForm} name="racerAdminka">
                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>дата</label>
                    <input type="text" className={admin.dataInput} required/>
                </div>

                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>ивент</label>
                    <input type="text" className={admin.dataInput} required/>
                </div>

                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>трэк</label>
                    <input type="text" className={admin.dataInput} required/>
                </div>

                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>№ гонщека</label>
                    <input type="text" className={admin.dataInput} required/>
                </div>

                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>Ф.И. (без О.)</label>
                    <input type="text" className={admin.dataInput} required/>
                </div>

                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>тачка</label>
                    <input type="text" className={admin.dataInput} required/>
                </div>

                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>модель</label>
                    <input type="text" className={admin.dataInput} required/>
                </div>

                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>мотор</label>
                    <input type="text" className={admin.dataInput} required/>
                </div>

                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>аспиратион</label>
                    <select id={admin.aspiration} className={admin.dataSelect} required>
                        <option value="atmo">atmo</option>
                        <option value="turbo">turbo</option>
                        <option value="supercharger">supercharger</option>
                        <option value="electro">electro</option>
                    </select>
                </div>

                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>Привод</label>
                    <select id={admin.drivetrain} className={admin.dataSelect} required>
                        <option value="rwd">rwd</option>
                        <option value="awd">awd</option>
                        <option value="fwd">fwd</option>
                    </select>
                </div>

                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>резина</label>
                    <input type="text" className={admin.dataInput} required/>
                </div>

                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>класс</label>
                    <input type="text" className={admin.dataInput} required/>
                </div>

                <div className={admin.inputWrapper}>
                    <label htmlFor="" className={admin.dataLabel}>лучшее время</label>
                    <input type="text" className={admin.dataInput} required/>
                </div>

                <button className={admin.button}>добавить</button>
            </form>

            <aside id={admin.pilotsArr}>
                <div id={admin.jsonMonitor}></div>
                <button className={admin.button}>отправить</button>
            </aside>
        </section>
    );
};

export default RacersDataTab;