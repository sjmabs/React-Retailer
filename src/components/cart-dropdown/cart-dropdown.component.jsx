import { useContext } from 'react';

import Button from '../button/button.component';
import './cart-dropdown.styles.scss';

import { CartContext } from '../../context/cart.context';

import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(cartItem => 
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                )}
            </div>
            <Button buttonType=''>Checkout</Button>
        </div>
    )
};

export default CartDropdown;
