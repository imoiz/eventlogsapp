import React from 'react'

import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
export default function UserRegistration() {
  const [name, setName] = React.useState('');
    const [selectedCity, setSelectedCity] = React.useState(null);
    const cities = [
        { text: 'Select City', value: '' },
        { text: 'New York', value: 'NY' },
        { text: 'Los Angeles', value: 'LA' },
        { text: 'Chicago', value: 'CH' },
        { text: 'Houston', value: 'HO' },
        { text: 'Phoenix', value: 'PH' }
    ];
  return (
    <>
      <h3>User Registration</h3>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
            <label htmlFor='name'>User Name</label>
            <InputText  value={name} onChange={(e) => setName(e.target.value)} id='name' className='form-control' />
          </div>
          <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
            <label htmlFor='email'>City</label>
                <select className='form-control'>                 
                  {cities.map((city) => (
                    <option key={city.code} value={city.code}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
                <label htmlFor='dob'>Date of Birth</label>
                <InputText id='dob' type='date' className='form-control' />
              </div>
          <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
            <label htmlFor='confirm-password'>Active</label>
            <input type='checkbox' id='active' className='form-check-input' />            
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
            <Button label="Register" className='btn btn-primary' />
          </div>
        </div>
      </div>
    </>
  )
}
