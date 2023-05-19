import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/index.css';

function Form2() {
  const navigate = useNavigate();
  const prop = useLocation();
  const [formData, setFormData] = useState({});
  // const [finalFormData, setFinalFormData] = useState({});
  useEffect(() => {
    console.log('Form 2 prop: ', prop);
    if (prop.state !== null) {
      setFormData(prop.state.formElements !== undefined ? prop.state.formElements : {});
    }
  }, []);

  const fieldOnChange = evnt => {
    const { name, value } = evnt.target;
    console.log('Inside field change value: ', `${name} `, value);
    if (name === 'firstName' || name === 'lastName') {
      const numbersRegex = /^[a-zA-Z]+$/;
      //   const numbersRegex = /^[0-9]+$/;
      console.log('Test value: ', numbersRegex.test(value));
      if (value === '' || numbersRegex.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    console.log('Inside onchange state: ', formData);
  };

  //   navigate(navigateUrl, {
  //     replace: true,
  //     state: {
  //         caseNumber: obj.CaseNumber,
  //         formNames: obj.TransactionType,
  //         userName : userName,
  //         // decisionNotes : '',Das
  //         // stageName : 'Open',
  //         // transactionType : 'Add Provider',
  //         stageName : obj.StageName,
  //         flowId : obj.FlowId,
  //         lockStatus: lockStat
  //     }
  // });
  const navigateToForm = evnt => {
    evnt.preventDefault();
    const { name } = evnt.target;
    let flag = true;
    if (name !== 'Back') {
      const firstNameVal = formData.firstName === undefined ? '' : formData.firstName;
      const addressVal = formData.address === undefined ? '' : formData.address;
      if (firstNameVal === '' || firstNameVal.length < 2 || firstNameVal.length > 50) {
        alert('First Name Value must be within 2 to 50');
        flag = false;
      }

      if (addressVal === '' || addressVal.length < 10) {
        alert('Address must contain minimum 10 characters');
        flag = false;
      }
    }

    if (flag) {
      let path = '';
      if (name === 'Back') {
        path = '/Form1';
      }

      if (name === 'SaveNext') {
        path = '/Form3';
      }

      // setFinalFormData({ ...finalFormData, formData });
      navigate(path, {
        state: {
          formElements: formData,
        },
      });
    }
  };

  return (
    <>
      <Container>
        <div className="Container1">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter First Name"
              onChange={event => fieldOnChange(event)}
              value={formData.firstName !== undefined ? formData.firstName : ''}
              minLength={2}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              onChange={event => fieldOnChange(event)}
              value={formData.lastName !== undefined ? formData.lastName : null}
              minLength={2}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              onChange={event => fieldOnChange(event)}
              value={formData.address !== undefined ? formData.address : null}
              minLength={10}
            />
          </Form.Group>
        </div>
        <div className="buttons">
          <Button
            onClick={event => navigateToForm(event)}
            variant="primary"
            type="submit"
            name="Back"
          >
            Back
          </Button>

          <Button variant="primary" type="submit" name="Save">
            Save
          </Button>

          <Button
            onClick={event => navigateToForm(event)}
            variant="primary"
            type="submit"
            name="SaveNext"
          >
            Save & Next
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Form2;
