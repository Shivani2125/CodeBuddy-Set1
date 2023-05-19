import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/index.css';

function Form1() {
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
    setFormData({ ...formData, [name]: value });
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
      const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
      const pwdRegex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
      );
      if (formData.email === undefined || formData.password === undefined) {
        alert('Please enter all values');
        flag = false;
      }

      if (formData.email !== undefined && !regex.test(formData.email)) {
        alert('Please enter valid email address');
        flag = false;
      }

      console.log('Password: ', formData.password);
      if (formData.password !== undefined && !pwdRegex.test(formData.password)) {
        alert('Please enter valid password');
        flag = false;
      }
    }

    // if (formData.password !== undefined) {
    // }

    if (flag) {
      let path = '';
      if (name === 'SaveNext') {
        path = '/Form2';
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
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              onChange={event => fieldOnChange(event)}
              value={formData.email !== undefined ? formData.email : ''}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={event => fieldOnChange(event)}
              value={formData.password !== undefined ? formData.password : null}
            />
          </Form.Group>
        </div>
        <div className="buttons">
          <Button variant="primary" type="submit" name="Back" disabled>
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

export default Form1;
