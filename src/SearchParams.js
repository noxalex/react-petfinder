import React from "react";
import pf, { ANIMALS } from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
class SearchParams extends React.Component {
  state = {
    location: "Seattle, WA",
    animal: "",
    breed: "",
    breeds: []
  };

  handleLocationChange = e => {
    this.setState({
      location: e.target.value
    });
  };

  handleAnimalChange = e => {
    this.setState(
      {
        animal: e.target.value
      },
      this.getBreeds
    );
  };

  handleBreedChange = e => {
    this.setState({
      breed: e.target.value
    });
  };

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({ breeds: data.petfinder.breeds.breed });
        } else {
          this.setState({ breeds: [] });
        }
      });
    } else {
      this.setState({ breeds: [] });
    }
  }

  render() {
    return (
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            onChange={this.handleLocationChange}
            id="location"
            value={this.state.location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            onChange={this.handleAnimalChange}
            onBlur={this.handleAnimalChange}
            id="animal"
            value={this.state.animal}
            placeholder="Animal"
          >
            <option />
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            onChange={this.handleBreedChange}
            onBlur={this.handleBreedChange}
            id="breed"
            value={this.state.breed}
            placeholder="Breed"
            disabled={!this.state.breeds.length}
          >
            <option />
            {this.state.breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

export default SearchParams;
