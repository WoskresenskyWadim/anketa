// pages/index.js
import { useState } from 'react';

export default function Анкета() {
  const [formData, setFormData] = useState({
    'ФИО': '',
    'Воинское звание': ''
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ 'ФИО': '', 'Воинское звание': '' });
      } else {
        const errorText = await res.text();
        console.error('Ошибка API:', errorText);
        setStatus('error');
      }
    } catch (err) {
      console.error('Сетевая ошибка:', err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Тестовая анкета</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ФИО *</label>
            <input
              type="text"
              name="ФИО"
              value={formData['ФИО']}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Воинское звание</label>
            <input
              type="text"
              name="Воинское звание"
              value={formData['Воинское звание']}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {status === 'sending' ? 'Отправка...' : 'Сохранить'}
          </button>

          {status === 'success' && (
            <p className="text-green-600 text-center mt-4">✅ Успех! Данные сохранены.</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center mt-4">❌ Ошибка. Откройте DevTools → Console.</p>
          )}
        </form>
      </div>
    </div>
  );
}
