import { useAppSelector } from '../../../hooks/use-app-redux/use-app-redux';
import { selectSumGoods } from '../../../rtk/selector/shopping-cart.selector';
import './buy-goods.css';

const BuyGoods = () => {
  const sumGoods = useAppSelector(selectSumGoods);

  return (
    <div className="buy-goods">
      <button className="buy-button "> Перейти к оформлению </button>
      <p className="buy-goods__total">
        {' '}
        Итого:
        <span className="buy-goods__sum">{sumGoods}</span>
      </p>
    </div>
  );
};

export default BuyGoods;
