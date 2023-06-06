import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, NewsUrl } = this.props;
    return (
      <div className="card my-3" style={{ width: "18rem", margin: "auto" }}>
        <img style={{height:"200px"}} src={imageUrl} className="card-img-top" alt="img" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a
            href={NewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
