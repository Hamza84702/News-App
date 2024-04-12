// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  paggeSize = 5;
  apiKey=process.env.REACT_APP_NEWS_API;

  state ={
    progress: 0
  }

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar/>
            <LoadingBar
              color='#f11946'
              height={3}
              progress={this.state.progress}
              // onLoaderFinished={() => setProgress(0)}
            />
            <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pagesize={this.pageSize} country="us" category="general" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pagesize={this.pageSize} country="us" category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pagesize={this.pageSize} country="us" category="health" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pagesize={this.pageSize} country="us" category="business" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pagesize={this.pageSize} country="us" category="science" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pagesize={this.pageSize} country="us" category="general" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pagesize={this.pageSize} country="us" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pagesize={this.pageSize} country="us" category="technology" />} />
            </Routes>
        </Router>
      </div>
    )
  }
}


