import { useState } from 'react';
import { allCities, citiesToShow } from '../services/configService';

export const ConfigCities = () => {
  const [checkedState, setCheckedState] = useState(
    new Array(allCities.length).fill(true)
);


  const handleCityChange = (selectedCity: string, position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    if (!checkedState[position]) {
      citiesToShow.add(selectedCity);
    } else {
      citiesToShow.delete(selectedCity);
    }
  }

  return (
    <div className="lead text-body-secondary config-menu-child">
      <h3>Cities</h3>
      {allCities.map((city, index) => {
        return (
          <label key={city}>
            <input
              type="checkbox"
              name="city"
              checked={checkedState[index]}
              onChange={() => handleCityChange(city, index)}
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