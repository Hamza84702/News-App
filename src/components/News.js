import React, { useEffect,useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=>{
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    const capitalizeFirstLetter = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    
    const componentDidMount = async()=>{
      // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a2fd326252c74720bfc80e396c6f94e7&page=1&pagesize=${props.pagesize}`;
      // setState({loading:true});
      // let data = await fetch(url);
      // let parsData = await data.json();
      // setState(
        //   {
          //     articles:parsData.articles,
          //     totalResults: parsData.totalResults,
          //     loading: false
          //   });
          updateNews();
  
  }

  const updateNews = async() =>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsData = await data.json();
    props.setProgress(70);
    setarticles(parsData.articles)
    settotalResults(parsData.totalResults)
    setloading(false)
    props.setProgress(100);
  }
  
  useEffect(() => {
    document.title = `NewsWave - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    
    return () => {
      
    }
  }, [])
  
  
  const handleNextBtn = async() =>{
    // if(!(state.page + 1 > Math.ceil(state.totalResults/props.pagesize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a2fd326252c74720bfc80e396c6f94e7&page=${state.page + 1}&pagesize=${props.pagesize}`;
    //   setState({loading:true});
    //   let data = await fetch(url);
    //   let parsData = await data.json();
    //   setState(
    //     {
    //       articles:parsData.articles,
    //       page: state.page + 1,
    //       loading: false
    //     });

    // }
    setpage(page+1)
    updateNews();
    
  }

  const handlePrevBtn = async() =>{
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a2fd326252c74720bfc80e396c6f94e7&page=${state.page - 1}&pagesize=${props.pagesize}`;
    // setState({loading:true});
    // let data = await fetch(url);
    // let parsData = await data.json();
    // setState(
    //   {
    //     articles:parsData.articles,
    //     page: state.page - 1,
    //     loading: false
    //   });
    setpage(page-1)
    updateNews();
  }

  const fetchMoreData = async () => {
    // 20 more records in 1.5 secs
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pagesize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parsData = await data.json();
    setarticles(articles.concat(parsData.articles))
    settotalResults(parsData.totalResults)
   
  };

    return (
      <div>
        <h2 className="text-center" style={{marginTop:'70px'}}>Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length <= totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {/* Mapping through articles to render NewsItem */}
              {articles.map((element) => (
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
            <button disabled={state.page<=1} className="btn btn-sm btn-dark" onClick={handlePrevBtn}>&larr; Prev</button>
            <button disabled={state.page + 1 > Math.ceil(state.totalResults / props.pagesize)} className="btn btn-sm btn-dark" onClick={handleNextBtn}>Next &rarr;</button>
        </div> */}
      </div>
    );
  }
  


News.defaultProps = {
  country: "us",
  pagesize:6,
  category:"general"
}

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string
}

export default News