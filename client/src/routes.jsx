import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {Main} from "./pages/DetailPage";
import {Today} from "./pages/today/Today";
import {AdminPage} from "./pages/LinksPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route exact path="/admin">
                    <AdminPage/>
                </Route>

                <Redirect to="/" />
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

            <Redirect to="/" />
        </Switch>
    )
}