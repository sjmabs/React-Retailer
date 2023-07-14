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
            <img src={imageUrl} alt={name}/>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <button onClick={removeProductFromCart}>-</button>
                {quantity}
                <button onClick={addProductToCart}>+</button>
            </span>
            <span className='price'>{price}</span>
            <button onClick={clearProductFromCart}>X</button>
        </div>
    )
};

export default CheckoutItem;