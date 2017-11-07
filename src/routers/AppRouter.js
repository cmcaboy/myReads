import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from '../components/App.js';
import SearchPage from '../components/SearchPage.js';
import NotFoundPage from '../components/NotFoundPage.js';

const AppRouter = () => (
    <BrowserRouter>
    <div>
        <Switch>
            <Route path="/search" component={SearchPage} exact={true}/>
            <Route path="/" component={App} exact={true}/>
            <Route component={NotFoundPage}/>
        </Switch> 
    </div>
    </BrowserRouter>
)

export default AppRouter;