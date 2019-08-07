class Forecast {
  constructor() {
    this.key = '4RAdbRdebGOvQaK6PbIgXFhxQuv4QDwa';
    this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  }

  // Update city
  async updateCity(city) {
    const cityData = await this.getCity(city);
    const weather = await this.getWeather(cityData.Key);
    return {
      cityData,
      weather
    }
  }

  // Get city information
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURL + query);
    const data = await response.json();
    return data[0];
  }

  // Get  weather information
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURL + query);
    const data = await response.json();
    return data[0];
  }
}