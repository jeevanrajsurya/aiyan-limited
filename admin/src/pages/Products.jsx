import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from '../api/products';

const emptyForm = { name: '', description: '', price: '', stock: '', categoryId: '', imageUrl: '' };

export default function Products() {
  const qc = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const { data } = useQuery({ queryKey: ['products', 'admin'], queryFn: () => getProducts({ limit: 100 }) });
  const { data: categoriesData } = useQuery({ queryKey: ['categories'], queryFn: getCategories });

  const saveMutation = useMutation({
    mutationFn: (payload) =>
      editingId ? updateProduct(editingId, payload) : createProduct(payload),
    onSuccess: () => {
      toast.success(editingId ? 'Product updated' : 'Product created');
      qc.invalidateQueries({ queryKey: ['products'] });
      setForm(emptyForm);
      setEditingId(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Save failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success('Product deleted');
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    saveMutation.mutate({ ...form, price: Number(form.price), stock: Number(form.stock) });
  }

  function handleEdit(p) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description || '',
      price: p.price,
      stock: p.stock,
      categoryId: p.categoryId || '',
      imageUrl: p.imageUrl || '',
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Products</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-5 mb-8 grid md:grid-cols-2 gap-4">
        <input
          placeholder="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-gray-200 rounded-lg px-3 py-2"
        />
        <input
          placeholder="Price"
          type="number"
          step="0.01"
          required
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border border-gray-200 rounded-lg px-3 py-2"
        />
        <input
          placeholder="Stock"
          type="number"
          required
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="border border-gray-200 rounded-lg px-3 py-2"
        />
        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          className="border border-gray-200 rounded-lg px-3 py-2"
        >
          <option value="">No category</option>
          {categoriesData?.categories?.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="border border-gray-200 rounded-lg px-3 py-2 md:col-span-2"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border border-gray-200 rounded-lg px-3 py-2 md:col-span-2"
          rows={2}
        />
        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="px-5 py-2 rounded-lg bg-brand-500 text-white font-semibold hover:bg-brand-600 disabled:opacity-50"
          >
            {editingId ? 'Update product' : 'Add product'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setForm(emptyForm); }}
              className="px-5 py-2 rounded-lg border border-gray-200 font-semibold text-ink/70"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-ink/50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.items?.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                <td className="px-4 py-3">${Number(p.price).toFixed(2)}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">{p.category?.name || '—'}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button onClick={() => handleEdit(p)} className="text-brand-600 font-medium">Edit</button>
                  <button onClick={() => deleteMutation.mutate(p.id)} className="text-red-600 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
