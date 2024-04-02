import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
 
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
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=a2fd326252c74720bfc80e396c6f94e7&page=1&pagesize=20";
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState(
      {
        articles:parsData.articles,
        totalResults: parsData.totalResults
      });
  
  }

  handleNextBtn = async() =>{
    console.log("Next");
    if(this.state.page + 1 <= Math.ceil(this.state.totalResults/20)){
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a2fd326252c74720bfc80e396c6f94e7&page=${this.state.page + 1}&pagesize=20`;
      let data = await fetch(url);
      let parsData = await data.json();
      this.setState(
        {
          articles:parsData.articles,
          page: this.state.page + 1,
        });

    }
    
  }

  handlePrevBtn = async() =>{
    console.log("Prev");

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a2fd326252c74720bfc80e396c6f94e7&page=${this.state.page - 1}&pagesize=20`;
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState(
      {
        articles:parsData.articles,
        page: this.state.page - 1,
      });
  }

  render() {
    return (
      <div className="container my-3">
        <h2>NewsWave - Top Headlines</h2>
        <div className="row">
            {this.state.articles.map((element) =>{
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0,45) : ""} description={element.description ? element.description.slice(0,88) : ""} imageUrl={element.urlToImage} newsUrl={element.url}/>
              </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} className="btn btn-sm btn-dark" onClick={this.handlePrevBtn}>&larr; Prev</button>
            <button className="btn btn-sm btn-dark" onClick={this.handleNextBtn}>Next &rarr;</button>
        </div>
      </div>
      

    )
  }
}
