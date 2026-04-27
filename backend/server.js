const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let customers = [];
let idCounter = 1;

// POST /customers - Add customer
app.post('/customers', (req, res) => {
  const { name, email, phone } = req.body;

  const duplicate = customers.find(
    c => c.email === email || c.phone === phone
  );

  if (duplicate) {
    return res.status(400).json({ message: 'Email or phone number already exists!' });
  }

  const newCustomer = { id: idCounter++, name, email, phone };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

// GET /customers - Get all customers
app.get('/customers', (req, res) => {
  res.json(customers);
});

// DELETE /customers/:id - Delete customer
app.delete('/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  customers = customers.filter(c => c.id !== id);
  res.json({ message: 'Deleted successfully' });
});

app.listen(5000, () => console.log('Server running on port 5000'));