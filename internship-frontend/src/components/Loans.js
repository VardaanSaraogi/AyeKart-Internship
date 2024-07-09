import React, { useState, useEffect } from 'react';
import axios from '../helpers/axiosHelper';
import AddLoan from './AddLoan';
import Button from'react-bootstrap/Button';
const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [bkp, setBkp] = useState([]);
const [show , setShow]=useState(false)
  const [from, setFrom] = useState("");
  const [suppliers , setSuppliers]=useState([])
  const [buyers , setBuyers]=useState([]);
  const [manufacturers , setManufacturers]=useState([]);
  const [supp , setSupp]=useState([])
  function getTotal(loans){
    let total=0
    for(let i=0;i<loans.length;i++){
      total+=(loans[i].amount*1)
    }
    return total
  }
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
  useEffect(() => {
    const fetchsuppliers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/suppliers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response=>{
        console.log(response.data)
        setSuppliers(response.data);

      });
    };

    fetchsuppliers();
  }, []);
  useEffect(() => {
    const fetchbuyers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/buyers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response=>{
        console.log(response.data)
        setBuyers(response.data.map(user=>user.name));

      });
    };

    fetchbuyers();
  }, []);
  useEffect(()=>{
    setSupp([...suppliers , ...manufacturers])
  },[suppliers ])
  const [loanDetails, setLoanDetails] = useState({
    from: '',
    to: '',
    amount: '',
    status: ''
  });
  function useFilter(e)
  {
    // setFrom(e.target.value)///

    // console.log(from)
   if(e.target.value!=="") setLoans(bkp.filter(loan=>loan.from.toLowerCase().indexOf(e.target.value.toLowerCase())!==-1))
    else setLoans(bkp)
    }
  useEffect(() => {
    const fetchLoans = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/loans', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLoans(response.data);
      setBkp(response.data);
    };

    fetchLoans();
  }, []);

  const addLoan = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('/loans', loanDetails, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setLoans([...loans, loanDetails]);
  };

  return (
    <div>
        
    <h2>Filter</h2>
    <input type="text" onChange={useFilter}/>
      <h2>Loans</h2>
      <div style={{padding:"1rem",border:"1px solid black",borderRadius:"10px",width:"50%"}}>
      <ul>
        {loans.map((loan, index) => (
          <li key={index}>
            From: {loan.from}, To: {loan.to}, Amount: {loan.amount}, Status: {loan.status}
          </li>
        ))}
      </ul>
      <p>Total loan amount : {getTotal(loans)}</p>
      </div>
      <Button onClick={()=>setShow(true)}>Add Loan</Button>

      <AddLoan addLoan={addLoan} show={show} loanDetails={loanDetails} supp={supp} buyers={buyers}setLoanDetails={setLoanDetails} handleClose={()=>setShow(false)} />
    </div>
  );
};

export default Loans;
