import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    finalCategory,
    finalRating,
    clearFilters,
  } = props
  const clearTriggered = true
  const selectedCategory = categoryId => {
    finalCategory(categoryId)
  }
  const selectedRating = ratingId => {
    finalRating(ratingId)
  }
  const clearActiveFilters = () => {
    clearFilters(clearTriggered)
  }
  return (
    <div className="filters-group-container">
      <h1>Filters Group</h1>
      <h1>Category</h1>
      <ul>
        {categoryOptions.map(eachItem => {
          const {name, categoryId} = eachItem
          const changeCategory = () => {
            selectedCategory(categoryId)
          }
          return (
            <li key={categoryId}>
              <button type="button" onClick={changeCategory}>
                <p>{name}</p>
              </button>
            </li>
          )
        })}
      </ul>
      <ul>
        {ratingsList.map(eachItem => {
          const {ratingId, imageUrl} = eachItem
          const changeRating = () => {
            selectedRating(ratingId)
          }
          return (
            <li key={ratingId}>
              <button type="button" onClick={changeRating}>
                <img src={imageUrl} alt="rating" />
              </button>
            </li>
          )
        })}
      </ul>
      <div>
        <button type="button" onClick={clearActiveFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FiltersGroup
