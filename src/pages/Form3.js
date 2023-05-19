import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/index.css';

function Form3() {
  const navigate = useNavigate();
  const prop = useLocation();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log('Form 2 prop: ', prop);
    if (prop.state !== null) {
      setFormData(prop.state.formElements !== undefined ? prop.state.formElements : {});
    }
  }, []);

  const fieldOnChange = evnt => {
    const { name, value } = evnt.target;
    console.log('Inside field change value: ', `${name} `, value);
    if (name === 'phoneNumber') {
      const numbersRegex = /^[0-9\b]+$/;
      //   const numbersRegex = /^[0-9]+$/;
      console.log('Test value: ', numbersRegex.test(value));
      if (value === '' || numbersRegex.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelect = e => {
    console.log('Inside handle select: ', e);
    setFormData({ ...formData, 'countryCode': e });
  };

  const checkFields = e => {
    e.preventDefault();
    let flag = true;
    const countryCodeVal = formData.countryCode === undefined ? '' : formData.countryCode;
    const phoneNumber = formData.phoneNumber === undefined ? '' : formData.phoneNumber;
    const accept =
      formData.acceptTermsAndCondition === undefined ? '' : formData.acceptTermsAndCondition;
    if (countryCodeVal === '') {
      alert('Please select country code');
      flag = false;
      return flag;
    }

    if (phoneNumber === '' || phoneNumber.length > 10) {
      alert('Phone number must be 10 digits');
      flag = false;
      return flag;
    }

    if (accept === '' || accept !== 'on') {
      alert('Please accept Terms and Conditions');
      flag = false;
      return flag;
    }

    return flag;
  };

  const submitForm = async e => {
    const flag = checkFields(e);
    console.log('Flag: ', flag);
    if (flag) {
      delete formData.acceptTermsAndCondition;
      const finalData = JSON.stringify(formData);
      console.log('Final FOrm Data: ', finalData);
      await fetch('https://codebuddy.review/submit', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(finalData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('api response: ', data);
          if (data.message !== undefined) {
            if (data.message === 'Success') {
              formData.acceptTermsAndCondition = 'off';
              navigate('/posts', {
                state: {
                  formElements: {},
                },
              });
            }
          }
        })
        .catch(err => {
          formData.acceptTermsAndCondition = 'off';
          console.log(err.message);
        });
    }
  };

  const navigateToForm = evnt => {
    evnt.preventDefault();
    const { name } = evnt.target;
    let flag = true;
    if (name !== 'Back') {
      flag = checkFields();
    }

    // if (formData.password !== undefined) {
    // }

    if (flag) {
      let path = '';
      if (name === 'Back') {
        path = '/Form2';
      }

      //   if (name === 'SaveNext') {
      //     path = '/Form3';
      //   }

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
          <DropdownButton
            as={ButtonGroup}
            // align={{ lg: 'end' }}
            title="Country Code"
            id="dropdown-menu-align-responsive-1"
            onSelect={event => handleSelect(event)}
          >
            <Dropdown.Item eventKey="+91">+91</Dropdown.Item>
            <Dropdown.Item eventKey="+1">+1</Dropdown.Item>
          </DropdownButton>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              onChange={event => fieldOnChange(event)}
              value={formData.phoneNumber !== undefined ? formData.phoneNumber : null}
              maxLength={10}
            />
          </Form.Group>

          <Form.Check
            inline
            label="Accept Terms & Conditions"
            name="acceptTermsAndCondition"
            defaultChecked={
              formData.acceptTermsAndCondition !== undefined
                ? formData.acceptTermsAndCondition
                : false
            }
            type="checkbox"
            id="inline-checkbox"
            onChange={event => fieldOnChange(event)}
          />
          <br />
          <br />
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

          <Button variant="primary" type="submit" name="Save" onClick={event => submitForm(event)}>
            Save
          </Button>

          <Button
            disabled
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

export default Form3;
