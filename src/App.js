import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Header from 'layout/header';
import Footer from 'layout/footer';
import Main from 'layout/main';
import 'style/main.css';

class App extends Component {

  render() {
    const RoutedHeader = withRouter(props => <Header {...props}/>);
    return (
      <div className="container">
        <RoutedHeader/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;
