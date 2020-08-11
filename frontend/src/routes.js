import React from 'react';
import{BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Registro from './pages/Registro';
import Profile from './pages/Profile';
import NovoCaso from './pages/NovoCaso';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Logon}/>
                <Route path="/registro" component={Registro}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/casos/novo" component={NovoCaso}/>
            </Switch>
        </BrowserRouter>
    );
}