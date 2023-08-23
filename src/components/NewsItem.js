import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date}=this.props;
    return (
      <div className='my-3'>
        <div className="card" /*style={{width:"18rem"}}*/ >
          <img src={imageUrl?imageUrl:"https://cdn.wionews.com/sites/default/files/2023/08/15/1508_WION_CHUNK_CHANDRAYAN_11AM-1692084310-00000003.jpg"} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
