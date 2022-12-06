import React from 'react';

const Form: React.FC<{ header: string }> = ({ header }) => {
  const [food, setFood] = React.useState<string>('');
  const [place, setPlace] = React.useState<'city' | 'beach' | 'mountains' | null>(null);
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
  const dropdownYears = React.useMemo<JSX.Element[]>(
    () =>
      Array.from({ length: new Date().getFullYear() - 2001 }, (_, i) => 2002 + i)
        .reverse()
        .map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        )),
    [],
  );

  const handleFoodInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFood(event.target.value);
  };

  const handlePlaceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value as 'city' | 'beach' | 'mountains');
  };

  const handleYearInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.debug({ food, place, year });

    alert(food);

    try {
      const response = await fetch('https://example.com', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ food, place, year }),
      });
      const responseBody = await response.json();

      console.log(responseBody);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="form-header">{header}</p>

      <div className="form-field">
        <label htmlFor="text-field">Favorite Food:</label>
        <input id="text-field" type="text" value={food} onChange={handleFoodInputChange} required />
      </div>

      <div className="form-field">
        <label>Favorite Place to Live:</label>
        <div className="radio-input">
          <input
            id="radio-city"
            type="radio"
            value="city"
            checked={place === 'city'}
            onChange={handlePlaceInputChange}
            required={!place}
          />
          <label htmlFor="radio-city">The City</label>
        </div>
        <div className="radio-input">
          <input
            id="radio-beach"
            type="radio"
            value="beach"
            checked={place === 'beach'}
            onChange={handlePlaceInputChange}
            required={!place}
          />
          <label htmlFor="radio-beach">The Beach</label>
        </div>
        <div className="radio-input">
          <input
            id="radio-mountains"
            type="radio"
            value="mountains"
            checked={place === 'mountains'}
            onChange={handlePlaceInputChange}
            required={!place}
          />
          <label htmlFor="radio-mountains">The Mountains</label>
        </div>
      </div>

      <div className="form-field">
        <label>Favorite Year: </label>
        <select value={year} onChange={handleYearInputChange}>
          {dropdownYears}
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
