import Modal from'react-bootstrap/Modal'
import Form from'react-bootstrap/Form'
import InputGroup from'react-bootstrap/InputGroup'
import Button from'react-bootstrap/Button'
import {useState} from "react"
function AddLoan({show , handleClose,addLoan,setLoanDetails,loanDetails,supp,buyers}) {
    let [username , setUsername]=useState("")
    let [gstnumber , setGstnumber]=useState("")
    let [address , setAddress]=useState("")
  return <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Add Loan</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <form>
        <div>
          <label>From:</label>
          <select onChange={(e) => setLoanDetails({ ...loanDetails, from: e.target.value })}
          >
            {supp.map((supplier, index) => (
              <option key={index} value={supplier}>
                {supplier}
              </option>
            ))}
          </select>
   
        </div>
        <div>
          <label>To:</label>
          <select onChange={(e) => setLoanDetails({ ...loanDetails, to: e.target.value })}
          >
            {buyers.map((buyer, index) => (
              <option key={index} value={buyer}>
                {buyer}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={loanDetails.amount}
            min="1000"
            onChange={(e) => setLoanDetails({ ...loanDetails, amount: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select onChange={(e) => setLoanDetails({ ...loanDetails, status: e.target.value })}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>

          </select>
      
        </div>
      </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button variant="primary" onClick={(e)=>{addLoan(e);handleClose()}}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>
}
export default AddLoan