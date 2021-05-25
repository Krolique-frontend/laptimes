import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import axios from 'axios';

import './App.css';
import TableItem from "./components/TableItem";
import Menu from './components/Menu';
import Sort from './components/Sort';
import Sortings from "./hooks/sorting";
import Today from './pages/today/Today.jsx';

function App() {
    const [table, setTable] = useState([]);
    const host = 'http://localhost:3001/api/tables';
    // const host = '';
    let getQuery = '/initialtable';
    const [url, setUrl] = useState('http://localhost:3001/api/tables/initialtable'); // dev
    // const [url, setUrl] = useState('/initialtable'); // prod
    const [tableHeader, setTableHeader] = useState(`6km classic - все даты`);
    const [filtersData, setFiltersData] = useState([]);

    useEffect(() => {
        axios
            .get(url)
            .then(res => {
                // console.log(res.data);
                setTable(res.data);
            })
            .catch(err => console.log(err));
    }, [url]);

    let tableCopy;

    axios.get(`${host}/initialtable`).then(res => tableCopy = res.data).catch(err => console.log(err));

    document.addEventListener('change', event => {
        switch (event.target.name) {
            case 'event':
                event.target.value === 'all' ? getQuery = 'initialtable' : getQuery = '/event?date=' + event.target.value;
                setUrl(host + getQuery);
                // console.log(url);
                break;

            case 'make':
                event.target.value === 'all' ? getQuery = 'initialtable' : getQuery = '/car?make=' + event.target.value;
                setUrl(host + getQuery);
                // console.log(url);
                break;
        }

        // if (filtersData.length !== 0) {
        //     let newArr = [];
        //
        //     filtersData.map(el => {
        //         console.log(el);
        //         table.forEach(obj => {
        //             if (obj[event.target.dataset.group].toLowerCase() === el.toLowerCase()) newArr.push(obj);
        //             // if(newArr[])
        //         });
        //     });
        //     console.log(newArr);
        //     setTable(newArr);
        // } else {
        //     console.log(tableCopy);
        //     setTable(tableCopy);
        // }
    });

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

    // getting all data to build filters list
    const [tableForFilters, setFilters] = useState([]);

    useEffect(() => {
        axios
            .get(`${host}/initialtable`)
            .then(res => {
                setFilters(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    // getting availible dates for sorting/filtering by date
    const datesList = tableForFilters
        .map(el => el['date'])
        .filter((el, i, arr) => arr[i] !== arr[i + 1]);

    return (
        <div className="App">
            <header className="header"><a href={'/'}> <h1>laptimes-ua</h1> </a></header>

            <main>
                <Router>


                    <Switch>
                        <Route exact path="/">

                            <div className="table">
                                <div className="tableHeader">
                                    <h3 className="table__title">{tableHeader}</h3>
                                    <span className="tableHeader__timeHeader"
                                          data-sort=""
                                          onClick={sortByTime}><b>&uarr;&darr;</b>время</span>
                                </div>

                                <ul>
                                    {table.map((elem) => <TableItem data={elem}/>)}
                                </ul>
                            </div>

                        </Route>

                        <Route exact path="/today" component={Today} />
                    </Switch>

                <nav className="mobileNav">
                    <Sort dataFromSortComponent={setFiltersData} data={tableForFilters}/>
                    <Menu dates={datesList}/>
                    <Link to='/today' className="todayLink">гинка</Link>
                </nav>

                <nav className="desktopNav">
                    <Menu dates={datesList}/>
                    <Sort data={tableForFilters} dataFromSortComponent={setFiltersData}/>
                </nav>

                </Router>

            </main>

        </div>
    );
}

export default App;
