import './checkout-item.styles.scss';

import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';


const CheckoutItem = ( { product }) => {
    const { imageUrl, name, price, quantity } = product;
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product)

    const removeProductFromCart = () => removeItemFromCart(product)

    const clearProductFromCart = () => clearItemFromCart(product)

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/> 
            </div>
            <span className='name'>{name}</span>

            <span className='quantity'>
                <div onClick={removeProductFromCart}>&#10094;</div>
                    {quantity}
                <div onClick={addProductToCart}>&#10095;</div>
            </span>            
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearProductFromCart}>&#10005;</div>
        </div>
    )
};

export default CheckoutItem;