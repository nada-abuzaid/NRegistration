import { useState, useEffect } from 'react';

const CountryRegionCitySelect = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const BATTUTA_KEY = 'bf1e45b991175c82e259d699da8516e7';

  useEffect(() => {
    // Fetch countries from the API
    const url = `https://battuta.medunes.net/api/country/all/?key=${BATTUTA_KEY}`;
    fetch(url, {
      headers: {
        'Access-Control-Allow-Origin': 'true',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const handleCountryChange = (event: any) => {
    const selectedCountryName =
      event.target.options[event.target.selectedIndex].text;
    const countryCode = event.target.value;
    setSelectedCountry(selectedCountryName);

    // Fetch regions for the selected country from the API
    const url = `https://battuta.medunes.net/api/region/${countryCode}/all/?key=${BATTUTA_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRegions(data);
      })
      .catch((error) => console.error('Error fetching regions:', error));
  };

  const handleRegionChange = (event: any) => {
    const selectedRegionName =
      event.target.options[event.target.selectedIndex].text;
    setSelectedRegion(selectedRegionName);

    // Fetch cities for the selected country and region from the API
    const countryCode = selectedCountry
      ? countries.find((c: any) => c.name === selectedCountry)?.code
      : '';
    const region = event.target.value;
    const url = `https://battuta.medunes.net/api/city/${countryCode}/search/?region=${region}&key=${BATTUTA_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch((error) => console.error('Error fetching cities:', error));
  };

  const handleCityChange = (event: any) => {
    const selectedCityName =
      event.target.options[event.target.selectedIndex].text;
    setSelectedCity(selectedCityName);
  };

  return (
    <div className="jumbotron">
      <div className="container">
        {/* Country */}
        <div className="row w3-margin-bottom">
          <div className="col-md-6 col-xs-6">
            <p>
              <b>Country</b>
            </p>
          </div>
          <div className="col-md-6 col-xs-6">
            <select
              id="country"
              className="form-control"
              onChange={handleCountryChange}
            >
              <option value="">-- Country --</option>
              {countries.map((country: any) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Region */}
        <div className="row w3-margin-bottom">
          <div className="col-md-6 col-xs-6">
            <p>
              <b>Region</b>
            </p>
          </div>
          <div className="col-md-6 col-xs-6">
            <select
              id="region"
              className="form-control"
              onChange={handleRegionChange}
            >
              <option value="">-- Region --</option>
              {regions.map((region: any) => (
                <option key={region.region} value={region.region}>
                  {region.region}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* City */}
        <div className="row w3-margin-bottom">
          <div className="col-md-6 col-xs-6">
            <p>
              <b>City</b>
            </p>
          </div>
          <div className="col-md-6 col-xs-6">
            <select
              id="city"
              className="form-control"
              onChange={handleCityChange}
            >
              <option value="">-- City --</option>
              {cities.map((city: any) => (
                <option key={city.city} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div id="location">
          Location: Country: {selectedCountry}, Region: {selectedRegion}, City:{' '}
          {selectedCity}
        </div>
      </div>
      <div className="container text-center text-primary">
        <h4>
          Author: Sam-Shudukhi. (c){' '}
          <a
            className="text-danger"
            href="https://github.com/Sam-Shudukhi/country-region-city-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </h4>
      </div>
    </div>
  );
};

export default CountryRegionCitySelect;
