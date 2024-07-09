import React, { useState, useEffect } from 'react';
import axios from '../helpers/axiosHelper';
import Button from 'react-bootstrap/esm/Button';
const Manufacturers = () => {
  const [manufacturers, setManufacturers] = useState([]);
  let [show , setShow]=useState(false)
  let [inp , setInp]=useState("")
  useEffect(() => {
    const fetchManufacturers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/manufacturers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response=>{
        console.log(response.data)
        setManufacturers(response.data);

      });
    };

    fetchManufacturers();
  }, []);
  function addManufacturer(){
    setShow(true)
    const token = localStorage.getItem('token');
    const body={
      name:inp
    }
    console.log(body)
    axios.post('/manufacturers',body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res=>{
      console.log(res.data)
      setManufacturers([...manufacturers,inp])
    })
    setInp("")
  }
  return (
    <div>
      <h2 style={{textAlign:"center"}}>Manufacturers</h2>
      <div style={{padding:"2rem",border:"1px solid black",borderRadius:"10px",width:"50%",margin:"auto"}}>
      <ul style={{textDecoration:"none",listStyleType:"none"}}>
        {manufacturers.map((manufacturer) => (
          <li style={{textDecoration:"none"}} key={manufacturer.id}>{manufacturer}</li>
        ))}
      </ul>
      <input type="text" placeholder="Enter manufacturer name" onChange={(e)=>setInp(e.target.value)}></input>
        <Button onClick={addManufacturer}>Add Manufacturer</Button>
      </div>
    </div>
  );
};

export default Manufacturers;
