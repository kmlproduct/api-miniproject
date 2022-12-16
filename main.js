import './style.css'
import './products.scss'
import axios from 'axios'
import {
  fetchProduct
} from './product'
const path = window.location.pathname

fetchProduct()
const pathFragments = path.split('/').filter(ele => ele !== '')

if (pathFragments[0] === 'products') {
  axios.get(`https://dummyjson.com/products/${pathFragments[1]}`)

    .then(function (response) {
      const product = response.data
      console.log(product)

      document.querySelector('#app').innerHTML = `<div  class="product">
      <img src="${product.thumbnail}" alt=''>
      <h3>${product.title}</h3>
      <div class="parent-ele">
      <div class="left-section">
      <div class="price"><span>Price: </span> ${product.price.toFixed(2)}</div>
      <div class="price"><span>discountPercentage: </span>${product.discountPercentage}</div>
      <div class="price"><span>category: </span>${product.category}</div>
      </div>
      
      <div class="right-section">
      <div class="price"><span>rating: </span>${product.rating}</div>
      <div class="price"><span>discountPercentage: </span>${product.discountPercentage}</div>
      <div class="price"><span>stock: </span> ${product.stock}</div>
      </div>
      </div>
      
      
      </div>`

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
} else {
  axios.get('https://dummyjson.com/products/')
    .then(function (response) {
      // handle success

      const products = response.data.products.map(p => {
        return {
          id: p.id,
          price: p.price,
          title: p.title,
          img: p.thumbnail
        }
      }).map(p => {

        return `<a href="/products/${p.id}" class="product" id='${p.id}'>
      <img src="${p.img}" alt=''>
      <h3>${p.title}</h3>
      <div class="price">$${p.price.toFixed(2)}</div>
      </a>`

      }).join('');


      document.querySelector('#app').innerHTML = `
  <div class="products">
 ${products}
  </div>
`

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}