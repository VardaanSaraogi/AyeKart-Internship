import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Home = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <>
      <h1 style={{textAlign:"center"}}>Home</h1>

    <div style={{margin:"auto",padding:"2rem",border:"1px solid black",borderRadius:"10px",width:"50%"}}>
      <nav>
        <Button variant="success" style={{display:"block",marginTop:"1rem",marginLeft:"auto",marginRight:"auto",width:"50%"}}><Link to="/suppliers" style={{display:"block",textDecoration:"none",color:"white"}}>Suppliers</Link></Button>
        <Button variant="success" style={{display:"block",marginTop:"1rem",marginLeft:"auto",marginRight:"auto",width:"50%"}}> <Link to="/manufacturers" style={{display:"block",textDecoration:"none",color:"white"}}>Manufacturers</Link></Button>
        <Button variant="success"  style={{display:"block",marginTop:"1rem",marginLeft:"auto",marginRight:"auto",width:"50%"}}><Link to="/buyers" style={{display:"block",textDecoration:"none",color:"white"}}>Buyers</Link></Button>
        <Button variant="success" style={{display:"block",marginTop:"1rem",marginLeft:"auto",marginRight:"auto",width:"50%"}}><Link to="/loans" style={{display:"block",textDecoration:"none",color:"white"}}>Loans</Link></Button>
        <Button variant="primary" onClick={handleLogout} style={{display:"block",textDecoration:"none",color:"white",marginLeft:"auto",marginRight:"auto",marginTop:"2px",width:"50%"}}>Logout</Button>
      </nav>
    </div>
    </>
  );
};

export default Home;
