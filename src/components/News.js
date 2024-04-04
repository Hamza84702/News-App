import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pagesize:6,
    category:"general"
  }

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
  }
 
  constructor(){
    super();
    console.log("this is a constructor");
    this.state = {
      articles: [],
      loading: false,
      page:1,
    };
  }
  
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2fd326252c74720bfc80e396c6f94e7&page=1&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState(
      {
        articles:parsData.articles,
        totalResults: parsData.totalResults,
        loading: false
      });
  
  }

  handleNextBtn = async() =>{
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pagesize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2fd326252c74720bfc80e396c6f94e7&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsData = await data.json();
      this.setState(
        {
          articles:parsData.articles,
          page: this.state.page + 1,
          loading: false
        });

    }
    
  }

  handlePrevBtn = async() =>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2fd326252c74720bfc80e396c6f94e7&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState(
      {
        articles:parsData.articles,
        page: this.state.page - 1,
        loading: false
      });
  }

  render() {
    return (
      <div className="container my-4 mb-4">
        <h2 className="text-center">NewsWave - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading  && this.state.articles.map((element) =>{
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0,45) : ""} description={element.description ? element.description.slice(0,88) : ""} imageUrl={element.urlToImage} newsUrl={element.url}/>
              </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} className="btn btn-sm btn-dark" onClick={this.handlePrevBtn}>&larr; Prev</button>
            <button  disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pagesize)} className="btn btn-sm btn-dark" onClick={this.handleNextBtn}>Next &rarr;</button>
        </div>
      </div>
      

    )
  }
}
