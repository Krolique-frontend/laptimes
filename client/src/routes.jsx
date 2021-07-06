import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {Main} from "./pages/Main";
import {Today} from "./pages/today/Today.jsx";
import {AdminPage} from "./pages/AdminPage";
import {AuthPage} from "./pages/AuthPage";
import {RomRegl} from "./components/RomRegl";
import {BrdRegl} from "./components/BrdRegl";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route exact path="/admin">
                    <AdminPage/>
                </Route>

                <Route exact path="/">
                    <Main/>
                </Route>

                <Route exact path="/today">
                    <Today/>
                </Route>

                <Route exact path="/reglaments/rom">
                    <RomRegl/>
                </Route>

                <Route exact path="/reglaments/brd">
                    <BrdRegl/>
                </Route>

                <Redirect to="/admin" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path="/">
                <Main/>
            </Route>

            <Route exact path="/today">
                <Today/>
            </Route>

            <Route exact path="/admin">
                <AuthPage/>
            </Route>

            <Route exact path="/reglaments/rom">
                <RomRegl/>
            </Route>

            <Route exact path="/reglaments/brd">
                <BrdRegl/>
            </Route>

            <Redirect to="/" />
        </Switch>
    )
}