import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getProduct } from '../api/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });

  if (isLoading) return <p className="mx-auto max-w-4xl px-4 py-16 text-ink/60">Loading…</p>;
  if (isError || !data?.product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-red-600 mb-4">Product not found.</p>
        <Link to="/store" className="text-brand-600 font-medium">&larr; Back to Our Products</Link>
      </div>
    );
  }

  const { product } = data;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 grid md:grid-cols-2 gap-10">
      <div className="aspect-square bg-brand-50 rounded-2xl flex items-center justify-center text-brand-300 text-sm overflow-hidden">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          'No image'
        )}
      </div>
      <div>
        <Link to="/store" className="text-sm text-brand-600 font-medium">&larr; Back to Our Products</Link>
        <h1 className="text-3xl font-semibold text-ink mt-3">{product.name}</h1>
        {product.category && (
          <p className="text-sm text-ink/50 mt-1">{product.category.name}</p>
        )}
        <p className="text-2xl font-semibold text-brand-600 mt-4">£{Number(product.price).toFixed(2)}</p>
        {product.description && <p className="text-ink/70 mt-4">{product.description}</p>}

        <button
          onClick={() => {
            addItem(product);
            toast.success(`${product.name} added to cart`);
          }}
          disabled={product.stock === 0}
          className="mt-8 px-6 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}
