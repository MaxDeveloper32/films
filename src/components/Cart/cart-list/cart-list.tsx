import { useAppDispatch, useAppSelector } from '../../../hooks/use-app-redux/use-app-redux';
import { removeCart } from '../../../rtk/slice/shopping-cart/shopping-cart.slice';
import './cart-list.css';
import ControlCount from './control-count';
import BuyGoods from '../buy-goods/buy-goods';

const CartList = () => {
  const carts = useAppSelector((state) => state.cart.carts);
  const dispatch = useAppDispatch();

  const handleRemoveCart = (id: number) => {
    dispatch(removeCart(id));
  };

  if (!carts.length) {
    return <p className="cart-empty">Ваша корзина пока пуста!</p>;
  }

  return (
    <>
      <ul className="cart-info__list">
        {carts.map((cart) => (
          <li key={cart.id} className="cart-info__item">
            <img
              className="cart-info__image"
              src={cart.previewImage}
              alt=""
              width={200}
              height={150}
            />
            <div className="cart-info__content">
              <h4 className="cart-info__title"> {cart.title} </h4>
              <p> {cart.price} </p>
              <ControlCount {...cart} />
            </div>
            <button onClick={() => handleRemoveCart(cart.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      <BuyGoods />
    </>
  );
};

export default CartList;
