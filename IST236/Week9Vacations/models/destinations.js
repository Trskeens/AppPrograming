class Destination {
  constructor(id, countryId, name, averageCost, yearFounded, averageUserRating, description, imageUrl) {
    this.id = id;
    this.countryId = countryId;
    this.name = name;
    this.averageCost = averageCost;
    this.yearFounded = yearFounded;
    this.averageUserRating = averageUserRating;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  toString() {
    return `${this.name} was founded in ${this.yearFounded} - Average Cost: ${this.averageCost}, Average User Rating: ${this.averageUserRating}`;
  }
}

export default Destination;

