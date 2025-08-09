import classNames from 'classnames';
import { useAppDispatch } from '../../hooks/use-app-redux/use-app-redux';
import { addToCart } from '../../rtk/slice/shopping-cart/shopping-cart.slice';
import styles from './subscription-list.module.css';

type SubscriptionCard = {
  id: number;
  title: string;
  price: number;
  description: string;
  previewImage: string;
};

const ProductItem = ({ subscription }: { subscription: SubscriptionCard }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: subscription.id,
        title: subscription.title,
        price: subscription.price,
        previewImage: subscription.previewImage,
      })
    );
  };

  return (
    <li
      className={classNames(styles['subscription-item'])}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
                 url(${subscription.previewImage || 'default-image.jpg'}) center/cover no-repeat`,
      }}
    >
      <h3 className={styles['subscription__title']}>{subscription.title}</h3>
      <p className="subscription-price">{subscription.price}</p>
      <p className={styles['subscription-item__description']}>{subscription.description}</p>
      <button className="buy-button " onClick={handleAddToCart}>
        Купить
      </button>
    </li>
  );
};

export default ProductItem;
