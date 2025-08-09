import styles from './subscription-list.module.css';
import ProductItem from './subscription-item';
import CartProduct from '../../components/Cart/cart-product';

type SubscriptionCard = {
  id: number;
  title: string;
  price: number;
  description: string;
  previewImage: string;
};

const subscriptions: SubscriptionCard[] = [
  {
    id: 1,
    title: 'Базовый',
    price: 399,
    description: 'Доступ к базовому контенту без ограничений',
    previewImage: 'images/base.jpg',
  },
  {
    id: 2,
    title: 'Премиум',
    price: 799,
    description: 'Полный доступ ко всем материалам и эксклюзивный контент',
    previewImage: 'images/premium.jpg',
  },
  {
    id: 3,
    title: 'Годовой',
    price: 5990,
    description: 'Экономия 20% при оплате за год вперед',
    previewImage: 'images/annual.jpg',
  },
  {
    id: 4,
    title: 'Все включено',
    price: 7990,
    description: 'Экономия 50% при оплате за год вперед',
    previewImage: 'images/included.jpg',
  },
];


const ProductList = () => {

  return (
    <div className="wrapper-films">
      <CartProduct />
      <ul className={styles['subscription-list']}>
        {subscriptions.map((subscription) => (
          <ProductItem key={subscription.id} subscription={subscription} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
