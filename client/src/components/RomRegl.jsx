import React from 'react';
import styles from './Regl.module.css';
import Menu from "./Menu";

export function RomRegl() {
    // const block = document.querySelector(`.${styles.about}`);

    // const toggle = (event) => {
    //     if (event.target.tagName === 'A') return;
    //     const classToToggle = block.parentNode.classList[1];
    //     const node = block.parentNode;
    //
    //     node.classList.toggle(classToToggle);
    // };

    return (
        // <div className={styles.about} onClick={toggle}>
        <div className={styles.main}>
            <h2 className={styles.title_h2}>Общий регламент Race of Masters</h2>
            <h4 className={styles.title_h4}>Классификация классов:</h4>

            <ol className={styles.list}>
                <li className={styles.listItem}>"S1500+" - до 1.58 л.(+ ВСЕ ВАЗ, ЗАЗ на резине с TW≥241)</li>
                <li className={styles.listItem}>"S2000" - от 1.59 до 2.20 л.</li>
                <li className={styles.listItem}>"S3000" - от 2.21 до 3.25 л.</li>
                <li className={styles.listItem}>"Unlim" - >3.26л.</li>
                <li className={styles.listItem}>"RWD Gymkhana" – все автомобили на заднем приводе. Запрещено
                    использовать на задней оси резину с
                    коэффициентом, только гражданская резина с TW > 241
                </li>
            </ol>

            <h4 className={styles.title_h4}>Максимально допустимая ширина резины в классе: (распространяется только на
                резину, которая попадает под коэффициент):</h4>

            <ol className={styles.list}>
                <li className={styles.listItem}>"S1500+": 205</li>
                <li className={styles.listItem}>"S2000": 215</li>
                <li className={styles.listItem}>"S3000": 225</li>
                <li className={styles.listItem}>"Unlimited": ДОСТУПНЫ ВСЕ РАЗМЕРЫ (без ограничений).</li>
                <li className={styles.listItem}>"RWD Gymkhana": ДОСТУПНЫ ВСЕ РАЗМЕРЫ.</li>
            </ol>

            <i>*** Если авто по своим характеристикам соответствует определенному классу, но ширина резины не
                допускается в этом классе, то автомобиль попадает в класс выше.</i>
            <i>*** Если у автомобиля с завода идет разноширокая резина, RWD, то участнику разрешается устанавливать
                ширину резины, которая изначально заложена заводскими параметрами (ширина) автомобиля, даже если резина
                попадает под коэффициент, но она не может превышать +10мм относительно максимально допустимой ширины
                резины в каждом классе.</i>

            <h4 className={styles.title_h4}>Коэффициенты(коэфф):</h4>

            <ul className={styles.list}>
                <li className={styles.listItem}>
                    Резина (TYRES), разбиваем на четыре группы по TreadWear (Индекс Износостойкости):
                    <ol className={styles.list}>
                        <li className={styles.listItem}>Спортивные (СЛИК) - для трека/соревнований с TW(ИИ) ~ до 139
                            единиц,
                            резина Extreme VR2 (Type R5,R7,R9) попадает под: коэфф: 1.3
                        </li>
                        <li className={styles.listItem}>Спортивные - для активной езды с TW(ИИ) ~ 140 - 199 единиц.,
                            резина Extreme VR1 (Type V) попадает под: коэфф: 1.2
                        </li>
                        <li className={styles.listItem}>Премиум комфорт, спорт-комфорт с TW(ИИ)~ 200-240 единиц., коэфф:
                            1.1
                        </li>
                        <li className={styles.listItem}>Экошины, комфорт класс ~ 241-500 единиц, а то и более. коэфф:
                            нет
                        </li>
                    </ol>
                </li>

                <li className={styles.listItem}>
                    <ul className={styles.uList}>
                        <li className={styles.listItem}>Турбо, + полный привод: 1.8</li>
                        <li className={styles.listItem}>Турбо, моно привод: 1.3</li>
                        <li className={styles.listItem}>Ротор: 1.5</li>
                        <li className={styles.listItem}>Мех. Нагнетатель: 1.3</li>
                        <li className={styles.listItem}>Вес автомобиля &lt; 950кг.: 1.2 ***</li>
                        <li className={styles.listItem}>Вес автомобиля &lt; 1100кг.: 1.1 ***</li>
                        <li className={styles.listItem}>Вес автомобиля &gt; 1410кг.: 0.9 ***</li>
                    </ul>

                    <i>*** Допустимая погрешность на вес автомобиля ±35кг (без водителя, только вес авто), которая разрешает не считать коэффициент на вес автомобиля! Если вес
                        автомобиля ±950кг или сомнения у технической комиссии, что авто весит ≥950кг, должны быть
                        подтверждающие
                        документы с взвешивания вашего автомобиля (можно произвести замеры веса авто на стенде
                        СфинксАвто,
                        адрес: ул.Марсельская 32а). Если соответствующий документов с весом вашего авто нет, то авто
                        получает коэффициент на вес – 1.2
                        или 1.1, взависимости от типа и облегчения автомобиля;
                        Все это относительно и ложится на совесть участника, если он
                        уверен, что вес его автомобиля больше
                        – предъяви документ о взвешивании своего автомобиля!</i>

                </li>
            </ul>
            <Menu racemode={true}/>
        </div>
    );
}

