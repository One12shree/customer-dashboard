import { useState, useEffect } from 'react';

const API = 'http://localhost:5000';

function App() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');

  const fetchCustomers = async () => {
    const res = await fetch(`${API}/customers`);
    const data = await res.json();
    setCustomers(data);
  };

  useEffect(() => { fetchCustomers(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch(`${API}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setForm({ name: '', email: '', phone: '' });
    fetchCustomers();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/customers/${id}`, { method: 'DELETE' });
    fetchCustomers();
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>Customer Management Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Customer</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}

      <table border="1" cellPadding="8" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;