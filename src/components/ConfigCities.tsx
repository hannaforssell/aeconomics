import { cities } from '../services/recipeService';
import '../styles/ConfigCities.scss'

export const ConfigCities = () => {

  const handleCityChange = (city: string) => {
    console.log(city);
  }

  return (
    <div className="lead text-body-secondary config-menu-categories">
      <h3>Cities</h3>
      {cities.map((city) => {
        return (
          <label key={city}>
            <input
              type="checkbox"
              name="city"
              checked={false}
              onChange={() => handleCityChange(city)}
            />
            <span> {city}</span>
          </label>
        )
      })}
    </div>
  );
}

// <div className="row py-lg-4">
// <div className="col-lg-12 col-md-8 mx-auto">