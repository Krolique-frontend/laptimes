import style from './pilot.module.css';

const Pilot = ({list}) => {
    console.log(style);
    return (
        <div className={style.pilot}>
            <span className={style.num}>{list.number}</span>

            <span className={style.name}>
                 {list.pilot}
                <span className={style.car}>
                    {list.make.toUpperCase()} {list.model}
                </span>
             </span>

            <span className={style.statusCell}>
                <span
                    className={style.status}
                    style={list.status === 'session'
                    ? {background: 'rgba(0, 180, 0, 0.8)'}
                    : list.status === 'standby'
                        ? {background: '#ffbc00c4'}
                        : {background: '#ff0e0ecf'}}
                >
                    {list.status === 'session'
                        ? 'дубасит'
                        : list.status === 'standby'
                            ? "готовится"
                            : "техпарк"
                    }
                </span>
            </span>

            <span className={style.times}>
                {
                    list.times
                        ? list.times.map(time => <span className={style.time}>{time}</span>)
                        : null
                }
            </span>
        </div>
    );
};

export default Pilot;