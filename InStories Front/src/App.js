import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Url from './components/url/Url';
import Creator from './components/creator/Creator';
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'
import Nav from './components/nav/Nav';

@inject('store') 
class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path='/' render={() => {
            return this.props.store.startedEditing ? <Creator /> : <Redirect to='/url' />
          }} />
          <Route exact path='/url' component={Url} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(observer(App));
