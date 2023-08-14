import '../styles/ConfigMenu.scss'
import { ConfigCategories } from './ConfigCategories';
import { ConfigCities } from './ConfigCities';

interface IConfigMenuProps {
  debugMode: boolean;
  setDebugMode: (arg: boolean) => void;
}

export const ConfigMenu = (props: IConfigMenuProps) => {
  return (
    <section className='config-menu-container'>
      <div className='lead text-body-secondary config-menu'>
      <h2 className="fw-light">Settings</h2>
        <label>
          <input
            type="checkbox"
            name="bestPathChoice"
            checked={props.debugMode}
            onChange={() => props.setDebugMode(!props.debugMode)}
          />
          <span> Debug mode</span>
        </label>
        <ConfigCategories />
        <ConfigCities />
      </div>
    </section>
  );
}

// <div className="row py-lg-4">
// <div className="col-lg-12 col-md-8 mx-auto">