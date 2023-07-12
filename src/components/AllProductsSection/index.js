import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]
const renderResultComponent = {
  failure: 'FAILURE',
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    searchElement: '',
    finalCategoryItem: '',
    finalRatingItem: '',
    presStatus: renderResultComponent.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      presStatus: renderResultComponent.loading,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      finalCategoryItem,
      finalRatingItem,
      searchElement,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${finalCategoryItem}&title_search=${searchElement}&rating=${finalRatingItem}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        presStatus: renderResultComponent.success,
      })
    } else if (response.status === 401) {
      this.setState({presStatus: renderResultComponent.failure})
    }
  }

  clearFilters = status => {
    if (status === true) {
      this.setState(
        {
          activeOptionId: sortbyOptions[0].optionId,
          searchElement: '',
          finalCategoryItem: '',
          finalRatingItem: '',
        },
        this.getProducts,
      )
    }
  }

  getUpdatedProductsList = async () => {
    this.setState({
      presStatus: renderResultComponent.loading,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {
      activeOptionId,
      finalCategoryItem,
      finalRatingItem,
      searchElement,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${finalCategoryItem}&title_search=${searchElement}&rating=${finalRatingItem}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      const temLength = updatedData.length
      if (temLength > 0) {
        this.setState({
          productsList: updatedData,
          presStatus: renderResultComponent.success,
        })
      } else {
        this.setState({
          productsList: updatedData,
          presStatus: renderResultComponent.success,
        })
      }
    } else if (response.status === 401) {
      this.setState({presStatus: renderResultComponent.failure})
    }
  }

  finalRating = rId => {
    this.setState({finalRatingItem: rId}, this.getUpdatedProductsList)
  }

  finalCategory = cId => {
    this.setState({finalCategoryItem: cId}, this.getUpdatedProductsList)
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getUpdatedProductsList)
  }

  searchUpdate = searchInput => {
    this.setState({searchElement: searchInput}, this.getUpdatedProductsList)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId, searchElement} = this.state

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          searchUpdate={this.searchUpdate}
          searchElement={searchElement}
        />
        <div>
          <FiltersGroup
            ratingsList={ratingsList}
            categoryOptions={categoryOptions}
            finalRating={this.finalRating}
            finalCategory={this.finalCategory}
            clearFilters={this.clearFilters}
          />
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => {
    const {activeOptionId} = this.state
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          searchUpdate={this.searchUpdate}
        />
        <div>
          <FiltersGroup
            ratingsList={ratingsList}
            categoryOptions={categoryOptions}
            finalRating={this.finalRating}
            finalCategory={this.finalCategory}
          />
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
              alt="products failure"
            />
            <h1>Oops! something went wrong</h1>
            <p>we are having some trouble</p>
          </div>
        </div>
      </div>
    )
  }

  // TODO: Add failure view

  render() {
    const {presStatus} = this.state
    switch (presStatus) {
      case renderResultComponent.failure:
        return this.renderFailure()
      case renderResultComponent.success:
        return this.renderProductsList()
      case renderResultComponent.loading:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default AllProductsSection
