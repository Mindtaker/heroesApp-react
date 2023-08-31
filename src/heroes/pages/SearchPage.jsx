import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { HeroCard } from '../components';
import { useForm } from '../../hooks';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);
  const heroes = getHeroesByName(q);

  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();

    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>SearchPage</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form data-testid="search-form" onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a hero..."
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-dark mt-3">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          <div
            data-testid="alert-search"
            className={`alert alert-secondary animate__animated animate__fadeIn ${
              showSearch ? '' : 'd-none'
            }`}
            role="alert"
          >
            Search a hero
          </div>
          <div
            data-testid="alert-not-found"
            className={`alert alert-danger animate__animated animate__fadeIn ${
              showError ? '' : 'd-none'
            }`}
            role="alert"
          >
            Not hero with <b>{q}</b>
          </div>
          <div className="d-flex flex-wrap gap-3">
            {heroes.map((hero) => (
              <HeroCard key={hero.id} {...hero} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
