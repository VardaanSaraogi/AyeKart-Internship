import React, { useState, useEffect } from 'react';
import axios from '../helpers/axiosHelper';

const SupplierLoans = () => {
  const [supplierLoans, setSupplierLoans] = useState([]);

  useEffect(() => {
    const fetchSupplierLoans = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/supplierLoans', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSupplierLoans(response.data);
    };

    fetchSupplierLoans();
  }, []);
  function useFilter(e)
  {
    setSupplierLoans(supplierLoans.filter(loan=>loan.from==e.target.value))
    }
  return (
    <div>

    <h2>Filter</h2>
    <input type="text" onChange={useFilter}/>
      <h2>Supplier Loans</h2>
      <ul>
        {supplierLoans.map((loan, index) => (
          <li key={index}>
            Supplier: {loan.supplier}, Amount: {loan.amount}, Status: {loan.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierLoans;
