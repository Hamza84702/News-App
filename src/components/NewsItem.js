import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className="my-5">
        <div className="card">
            <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
              <span className="badge rounded-pill bg-danger">
                {source}
              </span>
            </div>
            <img src={!imageUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4dgZHCdEh4YN2rWz8MdchPX10qMz4sj4xhfiReonLA&s":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}
