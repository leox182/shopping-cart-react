import React, { useContext, useId } from "react";
import "./Filters.scss";
import { FiltersContext } from "../../context/filters";

export default function Filters() {
  //ids
  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const {filters, setFilters} = useContext(FiltersContext);

  const handleChangeMinPrice = (event) => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Price</label>
        <input type="range" id={minPriceFilterId} min={0} max={1000} onChange={handleChangeMinPrice} />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select name="category" id={categoryFilterId} value={filters.category} onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          <option value="laptops">Laptops</option>
          <option value="smartphones">Móviles</option>
        </select>
      </div>
    </section>
  );
}
