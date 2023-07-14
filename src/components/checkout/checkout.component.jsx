import './checkout.styles.scss'

import { CartContext } from '../../context/cart.context';
import { useContext } from 'react';
import CheckoutItem from '../checkout-item/checkout-item.component';


const Checkout = () => {
    const {cartItems} = useContext(CartContext)
    var cartCount = 0;
    if (cartItems.length !== 0) {
        cartCount = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
    }    
    return (
            <div className='checkout-items'>
            {cartItems.map(cartItem => 
                <CheckoutItem key={cartItem.id} product={cartItem} />
            )}
            <span>TOTAL: £{cartCount}</span>
            </div>      
    )
};

export default Checkout;