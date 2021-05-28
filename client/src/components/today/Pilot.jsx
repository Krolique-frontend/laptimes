import style from './pilot.module.css';

const Pilot = (props) => {
    let list = props.list;

    return (
        <div className={`${style.pilot} ${
            list.status === 'session'
                ? style.session
                : list.status === 'standby'
                ? style.stdBy
                : style.park
        }`}
        >
            <span className={style.pilotNumber}>{list.number}</span>

            <span className={style.pilotName}>
                 {list.pilot}
                <span className={style.pilotCar}>
                    {list.make.toUpperCase()} {list.model}
                </span>
             </span>

            <span className={style.pilotStatus}>
                {list.status === 'session'
                    ? 'дубасит'
                    : list.status === 'standby'
                        ? "готовится"
                        : "техпарк"
                }
            </span>

            <span className={style.pilotTimes}>{
                list.times
                    ? list.times.map(time => <span className={style.time}>{time}</span>)
                    : null
            }</span>
        </div>
    );
};

export default Pilot;