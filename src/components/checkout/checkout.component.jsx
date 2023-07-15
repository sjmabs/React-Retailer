import './checkout.styles.scss'

import { CartContext } from '../../context/cart.context';
import { useContext } from 'react';
import CheckoutItem from '../checkout-item/checkout-item.component';


const Checkout = () => {
    const {cartItems, cartTotal} = useContext(CartContext)
    const headers = ["PRODUCT", "DESCRIPTION", "QUANTITY", "PRICE", "REMOVE" ]

    return (
            <div className='checkout-container'>
                <div className='checkout-header'>
                {headers.map(header => 
                    <div className='header-block'>
                        <span>{header}</span>
                    </div>
                )}

                </div>
            {cartItems.map(cartItem => 
                <CheckoutItem key={cartItem.id} product={cartItem} />
            )}
            <span className='total'>TOTAL: £{cartTotal}</span>
            </div>      
    )
};

export default Checkout;