import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className='mt-8'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <div className='flex-center text-xl font-semibold font-mono h-40'>
      <p>Your cart is still empty. Start adding some pizzas :)</p>
      </div>
    </div>
  );
}

export default EmptyCart;
