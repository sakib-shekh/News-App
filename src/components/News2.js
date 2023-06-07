import React, { Component } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

const API_KEY = "49ff17a3a0284277a34d4e0beab9d4a2";

export default class news extends Component {
  // static defaultProps={
  //   category:"general",
  //   country:"en",
  //   PageValue:5
  // }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      Page: 1,
      PageSize: 1,
      id: 1,
    };
  }
  async fetchReq() {
    const TempUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${API_KEY}&pagesize=${this.props.PageValue}&language=en&page=${this.state.Page}`;

    let data = await fetch(TempUrl);
    let dataParse = await data.json();
    this.setState({
      articles: this.state.articles.concat(dataParse.articles),
      PageSize:
        Number(dataParse.totalResults) / 9 +
        (Number(dataParse.totalResults) % 9 ? 1 : 0),
      id: this.state.id + 6,
    });
    this.setState({ loading: false });
  }
  async componentDidMount() {
    this.fetchReq();
  }

  fetchMoreData() {
    console.log(this.state.Page);
    this.setState({ Page: (this.state.Page + 1) });
    console.log(this.state.Page);
    this.fetchReq();
  }
  render() {
    return (
      <div className="container my-3">
        <figure className="text-center">
          <blockquote className="blockquote">
            <p>Top Headlines</p>
          </blockquote>
        </figure>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.Page !== this.state.PageSize}
          loader={<h4>Loading...</h4>}
        >
          <div className="row">
            {(!(this.state.articles === undefined)) &&
              this.state.articles.map((e, index) => {
                return (
                  <div
                    className="col-md-4"
                    key={this.state.id + index && index++}
                  >
                    <NewsItem
                      title={e.title}
                      description={e.description}
                      imageUrl={e.urlToImage}
                      NewsUrl={e.url}
                      loading1={this.state.loading}
                      author={e.author}
                      date={e.publishedAt}
                    />
                  </div>
                );
              })}
            {this.state.articles === undefined && <div>No Data</div>}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
