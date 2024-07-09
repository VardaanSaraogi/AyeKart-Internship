import React, { useState, useEffect } from 'react';
import axios from '../helpers/axiosHelper';
import Button from 'react-bootstrap/esm/Button';
import AddBuyer from "./AddBuyer";
const Buyers = () => {
  const [buyers, setbuyers] = useState([]);
  let [show , setShow]=useState(false)
  let [inp , setInp]=useState("")
  useEffect(() => {
    const fetchbuyers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/buyers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response=>{
        console.log(response.data)
        setbuyers(response.data);

      });
    };

    fetchbuyers();
  }, []);
  function AddBuyerr(name , gst , address){
    setShow(true)
    const token = localStorage.getItem('token');
    const body={
      name:name,
      gstnum:gst,
      address:address
    }
    console.log(body)
    axios.post('/buyers',body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res=>{
      console.log(res.data)
      setbuyers([...buyers,body])
    })
    setInp("")
    setShow(false)
  }
  return (
    <div>
      <h2 style={{textAlign:"center"}}>Buyers</h2>
      <div style={{padding:"2rem",border:"1px solid black",borderRadius:"10px",width:"50%",margin:"auto"}}>
      <ul style={{textDecoration:"none",listStyleType:"none"}}>
        {buyers&&buyers.map((supplier) => (
          <li style={{textDecoration:"none"}} key={supplier.id}>Name: {supplier.name} GST Number:{supplier.GST?supplier.GST:supplier.gstnum}</li>
        ))}
      </ul>
        <Button onClick={()=>setShow(true)}>Add Buyer</Button>
        <AddBuyer show={show} handleClose={()=>setShow(false)} saveChanges={AddBuyerr} />
      </div>
    </div>
  );
};

export default Buyers;
