import React, { useState, useEffect } from 'react';
import axios from '../helpers/axiosHelper';
import Button from 'react-bootstrap/esm/Button';
const Suppliers = () => {
  const [suppliers, setsuppliers] = useState([]);
  let [show , setShow]=useState(false)
  let [inp , setInp]=useState("")
  useEffect(() => {
    const fetchsuppliers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/suppliers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response=>{
        console.log(response.data)
        setsuppliers(response.data);

      });
    };

    fetchsuppliers();
  }, []);
  function AddSupplier(){
    setShow(true)
    const token = localStorage.getItem('token');
    const body={
      name:inp
    }
    console.log(body)
    axios.post('/suppliers',body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res=>{
      console.log(res.data)
      setsuppliers([...suppliers,inp])
    })
    setInp("")
  }
  return (
    <div>
      <h2 style={{textAlign:"center"}}>Suppliers</h2>
      <div style={{padding:"2rem",border:"1px solid black",borderRadius:"10px",width:"50%",margin:"auto"}}>
      <ul style={{textDecoration:"none",listStyleType:"none"}}>
        {suppliers&&suppliers.map((supplier) => (
          <li style={{textDecoration:"none"}} key={supplier.id}>{supplier}</li>
        ))}
      </ul>
      <input type="text" placeholder="Enter manufacturer name" onChange={(e)=>setInp(e.target.value)}></input>
        <Button onClick={AddSupplier}>Add Supplier</Button>
      </div>
    </div>
  );
};

export default Suppliers;
