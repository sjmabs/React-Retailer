import Button from '../button/button.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div classname='cart-items'>
            </div>
            <Button buttonType=''>Checkout</Button>
        </div>
    )
};

export default CartDropdown;

// to do 
// create a way to be able to store the state of the cartdropdown is up or down and trigger an onclick to hide/show.