import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


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

  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1,
      totalResults: 0
    };
    document.title = `NewsWave - ${this.capitalizeFirstLetter(this.props.category)}`;
  }
  
  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2fd326252c74720bfc80e396c6f94e7&page=1&pagesize=${this.props.pagesize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsData = await data.json();
    // this.setState(
    //   {
    //     articles:parsData.articles,
    //     totalResults: parsData.totalResults,
    //     loading: false
    //   });
    this.updateNews();
  
  }

  async updateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsData = await data.json();
    this.props.setProgress(70);
    this.setState(
      {
        articles:parsData.articles,
        totalResults: parsData.totalResults,
        loading: false
      })
      this.props.setProgress(100);
  }

  handleNextBtn = async() =>{
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pagesize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2fd326252c74720bfc80e396c6f94e7&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsData = await data.json();
    //   this.setState(
    //     {
    //       articles:parsData.articles,
    //       page: this.state.page + 1,
    //       loading: false
    //     });

    // }
    this.setState({page: this.state.page + 1});
    this.updateNews();
    
  }

  handlePrevBtn = async() =>{
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2fd326252c74720bfc80e396c6f94e7&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsData = await data.json();
    // this.setState(
    //   {
    //     articles:parsData.articles,
    //     page: this.state.page - 1,
    //     loading: false
    //   });
    this.setState({page: this.state.page - 1});
    this.updateNews();
  }

  fetchMoreData = async () => {
    // 20 more records in 1.5 secs
    this.setState({page:this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState(
      {
        articles:this.state.articles.concat(parsData.articles),
        totalResults: parsData.totalResults,
      });
  };

  render() {
    return (
      <div>
        <h2 className="text-center">Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length <= this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {/* Mapping through articles to render NewsItem */}
              {this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} className="btn btn-sm btn-dark" onClick={this.handlePrevBtn}>&larr; Prev</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} className="btn btn-sm btn-dark" onClick={this.handleNextBtn}>Next &rarr;</button>
        </div> */}
      </div>
    );
  }
  
}
