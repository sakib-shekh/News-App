import React, { Component } from "react";
import NewsItem from "./NewsItem";
import axios from "axios";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";



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
      loading: true,
      Page: 1,
      PageSize: 1,
      id: 1,
    };
  }

  async fetchReq() {

    this.setState({ loading: true });
    const TempUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pagesize=${this.props.PageValue}&language=en&page=${this.state.Page}`;

    console.log(this.props.apikey);
    axios
      .get(TempUrl)
      .then(async (res) => {
        let dataParse = res;
        this.setState({
          articles: this.state.articles.concat(dataParse.data.articles),
          PageSize:
            Number(dataParse.data.totalResults) / 9 +
            (Number(dataParse.data.totalResults) % 9 ? 1 : 0),
          id: this.state.id + 6,
        });
        this.setState({ loading: false });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ articles: undefined });
        }
      });
  }
  async componentDidMount() {
    this.fetchReq();
  }

  fetchMoreData = () => {
    this.setState({ Page: this.state.Page + 1 });

    this.fetchReq();
  };
  render() {
    return (
      <div className="container my-3">
        <figure className="text-center">
          <blockquote className="blockquote">
            <p>Top Headlines</p>
          </blockquote>
        </figure>
        {
          this.state.loading && <Spinner/>
        }
        {this.state.articles !== undefined && (
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.Page !== parseInt(this.state.PageSize)}
            loader={
                <Spinner/>
            }
          >
            <div className="container">
              <div className="row">
                {!(this.state.articles === undefined) &&
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
            </div>
          </InfiniteScroll>
        )}
      </div>
    );
  }
}
