import './ProductSelect.css'
import { useState } from 'react';
import { data } from "../../data"
import ProductCart from '../ProductCart/ProductCart';

function ProductSelection() {
    const [colorBorder, setColorBorder] = useState([]);
    const [colorSizes, setColorSizes] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(data);
  

    const uniqueColors = [];
    const uniqueSizes = [];
    const uniqueOffer = [];

    // Collect unique colors, sizes, and offers
    data.forEach(dat => {
        dat.color.forEach(color => {
            if (!uniqueColors.includes(color)) {
                uniqueColors.push(color);
            }
        });
        dat.product_sizes.forEach(size => {
            const { name } = size;
            if (!uniqueSizes.includes(name)) {
                uniqueSizes.push(name);
            }
        });


        if (!uniqueOffer.includes(dat.offer)) {
            uniqueOffer.push(dat.offer);
        }
    });

    const handleClickColors = (color) => {
        const updatedColorBorder = colorBorder.includes(color) ? colorBorder.filter(c => c !== color) :
         [...colorBorder, color];
        setColorBorder(updatedColorBorder);
    };

    const handleClickSizes = (size) => {
        const updatedColorSizes = colorSizes.includes(size) ?
         colorSizes.filter(s => s !== size)
         : [...colorSizes, size];
        setColorSizes(updatedColorSizes);
    };

    const handleChange = (e) => {
        const newPrice = Number(e.target.value);
        const filteredData = data.filter(item => item.price <= newPrice);
        setFilteredProducts(filteredData);
    };

    const Applyfilter = () => {
        const filteredData = data.filter(item =>
            colorBorder.every(color => item.color.includes(color)) &&
            colorSizes.every(size => item.product_sizes.some(s => s.name === size))
        );
        setFilteredProducts(filteredData);
    };

    return (
        <div className='container'>

        <div className="selection-container">
            <div className="colors-container">
                <h2 className='color-heading'>colors:</h2>
                {uniqueColors.map((color, index) => (
                    <button key={index}
                        onClick={() => handleClickColors(color)}
                        style={{
                            backgroundColor: color,
                            border: colorBorder.includes(color) ? "3px solid black" : ""
                        }}
                    ></button>
                ))}
            </div>

            <div className="sizes-container">
                <h2>size:</h2>
                <div className="sizes">
                    {uniqueSizes.map((size, index) => (
                        <button key={index}
                            onClick={() => handleClickSizes(size)}
                            style={{ border: colorSizes.includes(size) ? "3px solid black" : "" }}
                        >{size}</button>
                    ))}
                </div>
            </div>

            <div className="offer-container">
                <h2>offer:</h2>
                {uniqueOffer.map((off, index) => (
                    <button key={index}>{off}</button>
                ))}
            </div>

            <div className="amount-container">
                <h2>price:</h2>
                <input type="range"
                    min={299}
                    max={899}
                    step={50}
                    onChange={handleChange}
                />
                
            </div>
            <button onClick={Applyfilter} className='filter-btn'>apply filter</button>

            
        </div>
        <div className='filter-container'>
        {filteredProducts.length > 0 ?
         (
            filteredProducts.map((item, index) => (
                <div key={index}>
                    <ProductCart product={item} />
                </div>
            ))
        ) :
         (
            <div>
                <h1 className='gr'>not found</h1>
            </div>
        )}
    </div>
    </div>

    )
}

export default ProductSelection;
