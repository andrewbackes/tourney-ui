import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import TournamentsDashboard from 'scenes/tournament-list';
import Tournament from 'scenes/tournament';
import GameDashboard from 'scenes/game';

import WorkersDashboard from 'scenes/workers';
import EngineList from 'scenes/engine-list';
import Engine from 'scenes/engine';
import BooksDashboard from 'scenes/books';

import SignupScreen from 'scenes/signup';
import LoginScreen from 'scenes/login';

import NotFoundScreen from 'scenes/notfound';

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Redirect exact from="/" to="/tournaments"/>
          <Route exact path='/tournaments/:tournamentId/games/:gameId' component={GameDashboard}/>
          <Route exact path='/tournaments/:tournamentId/:tab' component={Tournament}/>
          <Route exact path='/tournaments' component={TournamentsDashboard}/>
          <Route exact path='/workers' component={WorkersDashboard}/>
          <Route exact path='/books' component={BooksDashboard}/>
          <Route exact path='/engines/:engineName' component={Engine}/>
          <Route exact path='/engines' component={EngineList}/>
          <Route exact path='/signup' component={SignupScreen}/>
          <Route exact path='/login' component={LoginScreen}/>
          <Route component={NotFoundScreen} />
        </Switch>
      </main>
    );
  }
}

// <Route exact path='/tournaments/:tournamentId/games' component={GameList}/>
// <Route exact path='/tournaments/:tournamentId' component={Tournament}/>