import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Book from './components/CMS/Book/index';
import AddBook from './components/CMS/Book/AddBook/index'
import EditBook from './components/CMS/Book/EditBook/index'
import Login from './components/ClientSides/Login/index'
import DashBoard from './components/ClientSides/Dashboard/index'
import Register from './components/ClientSides/Register/index'
import Header from './components/ClientSides/Header/index'
import ActiveEmail from './components/ClientSides/ActiveEmail/index'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/addBooks" component={AddBook} />
          <Route path="/editBooks" component={EditBook} />
          <Route path="/login" component={Login} />
          <Route path="/books" component={Book} />
          <Route path="/header" component={Header} />
          <Route path="/register" component={Register} />
          <Route path="/active/:id" component={ActiveEmail} />
          <Route path="/" component={DashBoard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
