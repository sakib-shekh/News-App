import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class news extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      Page: 1,
      PageSize:0
    };
  }
  async componentDidMount() {
    try {
      const TempUrl = `https://newsapi.org/v2/everything?q=tesla&language=en&from=2023-05-05&sortBy=publishedAt&apiKey=b840ea8eda5643b797021a01937d10f2&pagesize=9&page=${this.state.Page}`;
      let data = await fetch(TempUrl);
      let dataParse = await data.json();
      await this.setState({ articles: dataParse.articles ,PageSize:Number(dataParse.totalResults)/9+ (Number(dataParse.totalResults)%9?1:0)});
      console.log(this.state.PageSize);
    } catch (err) {
      console.log(err);
    }
  }
  previousClick= async() => {
    this.setState ({ Page: this.state.Page - 1 });
    try {
      const TempUrl = `https://newsapi.org/v2/everything?q=tesla&language=en&from=2023-05-05&sortBy=publishedAt&apiKey=b840ea8eda5643b797021a01937d10f2&pagesize=9&page=${this.state.Page}`;
      let data = await fetch(TempUrl);
      let dataParse = await data.json();
      this.setState({ articles: dataParse.articles });
    } catch (err) {
      console.log(err);
    }
  };
  nextClick = async() => {
    this.setState ({ Page: this.state.Page +1 });
    try {
      const TempUrl = `https://newsapi.org/v2/everything?q=tesla&language=en&from=2023-05-05&sortBy=publishedAt&apiKey=b840ea8eda5643b797021a01937d10f2&pagesize=9&page=${this.state.Page}`;
      let data = await fetch(TempUrl);
      let dataParse = await data.json();
      this.setState({ articles: dataParse.articles });
    } catch (err) {
      console.log(err);
      console.log(this.state.articles);
    }
    

  };
  render() {
    return (
      <div className="container my-3">
        <h1>top Headlines</h1>
        <div className="row">
          {this.state.articles.map((e) => {
            return (
              <div className="col-md-4" key={e.url}>
                <NewsItem
                  title={e.title}
                  description={e.description}
                  imageUrl={e.urlToImage}
                  NewsUrl={e.url}
                />
              </div>
            );
          })}
        </div>
        <div
          className="d-flex justify-content-evenly"
          style={{ marginTop: "20px" }}
        >
          <button
            type="button"
            disabled={this.state.Page===1}
            onClick={this.previousClick}
          >
            {" "}
            &laquo; prev
          </button>
          <button type="button" disabled={this.state.Page===this.state.PageSize}  className="btn btn-primary" onClick={this.nextClick}>
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}
