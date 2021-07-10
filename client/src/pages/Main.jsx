import React, {useCallback, useEffect, useState} from 'react';

import TableItem from "../components/TableItem";
import {useHttp} from "../hooks/http.hook";
import Sortings from '../hooks/sorting';
import Menu from "../components/Menu";

export const Main = () => {
    const {request} = useHttp();
    const fetchPath = 'initialtable';
    const [table, setTable] = useState([]);

    const [tableHeader, setTableHeader] = useState(`6km classic - все даты`);
    const [filtersData, setFiltersData] = useState([]);

    const getData = useCallback(async () => {
        try {
            const data = await request(`/api/tables/initialtable`, "GET", null);
            setTable(data);
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }, [request]);

    useEffect(() => getData(), [getData]);

    const sortByTime = () => {
        let dataset = document.querySelector('[data-sort]').dataset;
        let sort = new Sortings();
        let tempArr = [...table];

        if (dataset.sort === 'desc' || dataset.sort === '') {
            dataset.sort = 'asc';
            setTable(sort.byTimeAsc(tempArr));
        } else {
            dataset.sort = 'desc';
            setTable(sort.byTimeDesc(tempArr));
        }
    };

    const fromMenu = useCallback((data)=>{
        setTable(data);
        setTableHeader(`${data[0].track} - все даты`);
    });

    return (
        <div className="table">
            <div className="tableHeader">
                <h3 className="table__title">{tableHeader}</h3>
                <span className="tableHeader__timeHeader"
                      data-sort=""
                      onClick={sortByTime}><b>&uarr;&darr;</b>время</span>
            </div>

            <ul>
                {table.map((elem) => <TableItem key={elem.id} data={elem}/>)}
            </ul>

            <Menu raceDay={true} toMain={fromMenu}/>
        </div>
    );
};