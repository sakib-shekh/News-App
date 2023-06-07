import React, { Component } from "react";
import NewsItem from "./NewsItem";
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
    };
  }

  async componentDidMount() {
    try {
      const TempUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${API_KEY}&pagesize=${this.props.PageValue}&language=en`;
      let data = await fetch(TempUrl);
      let dataParse = await data.json();

      await this.setState({
        articles: dataParse.articles,
        PageSize:
          Number(dataParse.totalResults) / 9 +
          (Number(dataParse.totalResults) % 9 ? 1 : 0),
      });
      this.setState({ loading: false });
      console.log(this.state.articles);
    } catch (err) {
      // console.log(err);
    }
  }
  previousClick = async () => {
    if (this.state.Page === 1) return;
    await this.setState({ loading: true });
    await this.setState({ Page: this.state.Page - 1 });
    try {
      const TempUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${API_KEY}&pagesize=${this.props.PageValue}&language=en`;
      let data = await fetch(TempUrl);
      let dataParse = await data.json();
      await this.setState({ articles: dataParse.articles });
      await this.setState({ loading: false });
    } catch (err) {
      // console.log(err);
    }
  };
  nextClick = async () => {
    if (this.state.Page === this.state.PageSize) return;
    await this.setState({ Page: this.state.Page + 1 });
    await this.setState({ loading: true });
    try {
      const TempUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${API_KEY}&pagesize=${this.props.PageValue}&language=en&page=${this.state.Page}`;
      let data = await fetch(TempUrl);
      let dataParse = await data.json();
      await this.setState({ articles: dataParse.articles });
      await this.setState({ loading: false });
    } catch (err) {
      // console.log(err);
      // console.log(this.state.articles);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <figure className="text-center" >
          <blockquote className="blockquote">
            <p>Top Headlines</p>
          </blockquote>
        </figure>

        <div className="row">
          {!(this.state.articles === undefined) &&
            this.state.articles.map((e) => {
              return (
                <div className="col-md-4" key={e.url}>
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
        <div
          className="d-flex justify-content-evenly"
          style={{ marginTop: "20px" }}
        >
          <button
            type="button"
            className="btn btn-primary"
            disabled={this.state.Page === 1}
            onClick={this.previousClick}
          >
            &laquo; prev
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={this.state.Page === this.state.PageSize}
            onClick={this.nextClick}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}
