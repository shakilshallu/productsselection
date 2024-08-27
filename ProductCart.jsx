import React from 'react'
import "./productcard.css"

const ProductCart = ({product}) => {
 const name= product.name.length> 10 ? product.name.substring(0,10): product.name;
  return (
    <div className='main-container'>
      <div className='sub-container'>
      <h1>{product.name}</h1>
      <p><strong>size:</strong>{""}
      {product.product_sizes.map((p_s)=>p_s.name)}</p>
      <p>
        <strong>color:</strong>
        {product.color.join(",")}
      </p>

      <p>
        <strong>amount:</strong>
        {product.all_offer_price}
      </p>
      </div>

        </div>
  )
}

export default ProductCart