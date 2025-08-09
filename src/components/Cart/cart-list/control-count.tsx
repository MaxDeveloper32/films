
import { useAppDispatch } from '../../../hooks/use-app-redux/use-app-redux';
import { removeToCart, addToCart } from '../../../rtk/slice/shopping-cart/shopping-cart.slice';
import { ShoppingCard } from '../../../types/shop';


const ControlCount = (cart: ShoppingCard) => {
  const dispatch = useAppDispatch();
  const {id, previewImage, price, quantity, title} = cart;

  const handleRemoveToCart = () => {
    dispatch(removeToCart(id));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, previewImage }));
  };

  return (
    <div className='cart-info__control-count'>
      <button onClick={handleRemoveToCart}>
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <line x1="5" y1="12" x2="19" y2="12" stroke="black" strokeWidth="2"/>
        </svg>
      </button>
      <span> {quantity}</span>
      <button onClick={handleAddToCart}>
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <line x1="12" y1="5" x2="12" y2="19" stroke="black" strokeWidth="2"/>
          <line x1="5" y1="12" x2="19" y2="12" stroke="black" strokeWidth="2"/>
        </svg>
      </button>
    </div>
  );
};

export default ControlCount;
