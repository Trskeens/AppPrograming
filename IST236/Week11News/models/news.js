class NewsItem {
  constructor(
    id,
    headline,
    date,
    author,
    agency,
    description,
    imageUrl,
    category
  ) {
    this.id = id;
    this.headline = headline;
    this.date = date;
    this.author = author;
    this.agency = agency;
    this.description = description;
    this.imageUrl = imageUrl;
    this.category = category; 
  }

  toString() {
    return `${this.headline} - Date: ${this.date} - Author: ${this.author} - Agency: ${this.agency} - Description: ${this.description} - Image URL: ${this.imageUrl}`;
  }
}

export default NewsItem;
