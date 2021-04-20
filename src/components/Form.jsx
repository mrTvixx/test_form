import { useState, useCallback } from 'react';
import dayjs from 'dayjs';

import './styles.css';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [supportCategory, setSupportCategory] = useState('0');
  const [description, setDescription] = useState('');
  const [issueDate, setIssueDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [billingCategory, setBillingCategory] = useState('0');
  const [accountNumber, setAccountNumber] = useState('');

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setSupportCategory(0);
    setDescription('');
    setIssueDate(dayjs().format('YYYY-MM-DD'));
    setBillingCategory('0');
    setAccountNumber('');
  }

  const handleChange = useCallback(({ target }) => {
    const { name, value } = target;

    if (name === 'firstName') {
      setFirstName(value)
    }
    if (name === 'lastName') {
      setLastName(value)
    }
    if (name === 'email') {
      setEmail(value)
    }
    if (name === 'phoneNumber') {
      setPhoneNumber(value)
    }
    if (name === 'supportcategory') {
      setSupportCategory(target.value);
    }
    if (name === 'description') {
      setDescription(value);
    }
    if (name === 'issueDate') {
      setIssueDate(value);
    }
    if (name === 'accountNumber') {
      setAccountNumber(value);
    }
    if (name === 'billingCategory') {
      setBillingCategory(value);
    }
  }, []);

  const checkFormForValidation = () => {
    const errors = {};
    const emailRegExp = /^\S+@\S+$/i;

    if (!firstName.trim())  errors['firstName'] = 'Empty field';
    if (!lastName.trim())  errors['lastName'] = 'Empty field';
    if (!email.trim())  errors['email'] = 'Empty field';
    if (email.trim() && !emailRegExp.test(email)) errors['email'] = 'Invalid format';
    if (!phoneNumber.trim()) errors['phoneNumber'] = 'Empty field';
    if (phoneNumber.trim() && phoneNumber.length !== 10) errors['phoneNumber'] = 'Invalid format';
    if (!description.trim()) errors['description'] = 'Empty field';

    // extra field
    if (!accountNumber.length && supportCategory === '2') errors['accountNumber'] = 'Empty field';

    const errorsCount = Object.keys(errors);

    if (errorsCount.length) alert(JSON.stringify(errors, null, 2));

    return !errorsCount.length;
  }

  const onSubmit = (event) => {
    let data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      supportCategory,
      description,
    };

    if (supportCategory === '1') {
      data = {
        ...data,
        issueDate,
      };
    }

    if (supportCategory === '2') {
      data = {
        ...data,
        accountNumber,
        billingCategory,
      };
    }
    
    let isValid = checkFormForValidation();

    if (isValid) {
      alert(JSON.stringify(data, null, 2));
      clearForm();
    }
  }

  const getExtraInputs = useCallback(() => {
    switch (supportCategory) {
      case '1':
        return (
          <>
            <input
              className="form__input"
              onChange={handleChange}
              value={issueDate}
              name="issueDate"
              type="date"
              max={dayjs().format('YYYY-MM-DD')}
            />
          </>
        )
      case '2':
        return (
          <>
            <input 
              placeholder="accountNumber" 
              name="accountNumber" 
              type="number" 
              className="form__input"
              onChange={handleChange} value={accountNumber}
            />
            <select value={billingCategory} className="form__input" onChange={handleChange} name="billingCategory">
              <option value="0">Billing Category</option>
              <option value="1">Account Number</option>
            </select>
          </>
        )
      default:
        return '';
    }
  }, [supportCategory,
    handleChange,
    issueDate,
    accountNumber,
    billingCategory,
  ])

  return (
    <div className="form">
      <input 
        placeholder="firstName" 
        name="firstName" 
        type="text" 
        className="form__input"
        onChange={handleChange} value={firstName}
      />
      <input 
        placeholder="lastName" 
        name="lastName" 
        type="text" 
        className="form__input"
        onChange={handleChange} value={lastName}
      />
      <input 
        placeholder="email" 
        name="email" 
        type="text" 
        className="form__input"
        onChange={handleChange} value={email}
      />
      <input 
        placeholder="phoneNumber" 
        name="phoneNumber" 
        type="number" 
        className="form__input"
        onChange={handleChange} value={phoneNumber}
      />
      <select value={supportCategory} className="form__input" onChange={handleChange} name="supportcategory">
        <option value="0">General Support</option>
        <option value="1">Report an Issue</option>
        <option value="2">Billing & Payments</option>
      </select>

      { getExtraInputs() }

      <textarea
        value={description}
        name="description"
        onChange={handleChange}
        className="form__textarea"
      />

      <button className="form__button" onClick={onSubmit}>Submit</button>
    </div>
  )
}

export default Form;
