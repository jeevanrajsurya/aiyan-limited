import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../api/orders';

export default function Cart() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleCheckout() {
    if (!user) {
      toast('Please sign in to check out');
      navigate('/sign-in');
      return;
    }
    try {
      await createOrder(items.map((i) => ({ productId: i.productId, quantity: i.quantity })));
      clearCart();
      toast.success('Order placed!');
      navigate('/account/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout failed');
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold text-ink mb-3">Your cart is empty</h1>
        <Link to="/store" className="text-brand-600 font-medium">
          Browse Our Products →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink mb-8">Your cart</h1>
      <div className="divide-y divide-brand-100">
        {items.map((item) => (
          <div key={item.productId} className="py-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-ink">{item.name}</p>
              <p className="text-sm text-ink/50">£{item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                className="w-16 border border-brand-200 rounded-lg px-2 py-1 text-sm"
              />
              <button
                onClick={() => removeItem(item.productId)}
                className="text-sm text-ink/40 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between text-lg font-semibold text-ink">
        <span>Total</span>
        <span>£{total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-6 w-full px-6 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors"
      >
        Checkout
      </button>
    </div>
  );
}
