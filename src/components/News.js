import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:false,
      page:1,
      totalResults:0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }
  async componentDidMount(){
    this.props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c18a6b3281824e2da7c66d86657bc558&page=1&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults})
    this.props.setProgress(100);

  }
  handlePrevClick=async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c18a6b3281824e2da7c66d86657bc558&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      page:this.state.page - 1,
      articles:parsedData.articles
    })
    this.props.setProgress(100);

  }
  handleNextClick=async ()=>{
    if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){

    }else{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c18a6b3281824e2da7c66d86657bc558&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      page:this.state.page + 1,
      articles:parsedData.articles
    })
    this.props.setProgress(100);
  }
  }
  fetchMoreData = async() => {
    this.setState({page:this.state.page+1});
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c18a6b3281824e2da7c66d86657bc558&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
      loading:false
    })
    this.props.setProgress(100);

  };
  render() {
    return (
      <>
        <h2 className="text-center" style={{margin:'35px 0px', marginTop:'90px'}}>Khabarshala - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className='container'>  
              <div className='row'>
                    {this.state.articles.map((element)=>{
                      return <div className='col-md-4'  key={element.url}>
                      <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                      </div>
                    })}
              </div> 
        </div>

        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
