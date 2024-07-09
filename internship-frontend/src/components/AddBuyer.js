import Modal from'react-bootstrap/Modal'
import Form from'react-bootstrap/Form'
import InputGroup from'react-bootstrap/InputGroup'
import Button from'react-bootstrap/Button'
import {useState} from "react"
function AddBuyer({show , handleClose,saveChanges}) {
    let [username , setUsername]=useState("")
    let [gstnumber , setGstnumber]=useState("")
    let [address , setAddress]=useState("")
  return <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Add Buyer</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e)=>setUsername(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">GST Number</InputGroup.Text>
        <Form.Control
          placeholder="gstnumber"
          aria-label="gstnumber"
          aria-describedby="basic-addon2"
          onChange={(e)=>setGstnumber(e.target.value)}
        />

      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Address</InputGroup.Text>
        <Form.Control
        type="textarea"
          placeholder="address"
          aria-label="address"
          aria-describedby="basic-addon3"
          onChange={(e)=>setAddress(e.target.value)}
        />
        
      </InputGroup>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button variant="primary" onClick={()=>saveChanges(username , gstnumber , address)}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>
}
export default AddBuyer