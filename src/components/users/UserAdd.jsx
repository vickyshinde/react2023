import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../config/api-endpoints';
import SubmitButtonWrapped from '../Shared/SubmitButton/SubmitButton';
import UserInputWrapped from '../Shared/UserInput/UserInput';

const occupationList = [
  {
    id: 1,
    name: '1'
  },
  {
    id: 2,
    name: '2'
  },
  {
    id: 3,
    name: '3'
  }
];
const UserAdd = () => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [formData, setFromData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    occupation: 'Select'
    // confirmPassword: '',
    // gender: '',
    // languages: [],
    // additional: ''
  });

  const onChangeHandler = (name, value) => {
    setFromData(() => ({
      ...formData,
      [name]: value
    }));
  };

  // console.log(formData);

  // validation
  const [fromError, setFromError] = useState({});
  const validateFrom = () => {
    const err = {};

    if (formData.name === '') {
      err.name = 'name required!';
    }

    if (formData.email === '') {
      err.email = 'email required!';
    } else {
      // eslint-disable-next-line no-useless-escape
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(formData.email)) {
        err.email = 'Email not valid!';
      }
    }

    if (formData.contact === '') {
      err.contact = 'contact required!';
    }

    if (formData.password === '') {
      err.password = 'password required!';
    }

    if (formData.occupation === 'Select') {
      err.occupation = 'Occupation required!';
    }

    setFromError({ ...err });

    // console.log(Object.keys(err));

    return Object.keys(err).length < 1;
  };

  const onSubmitClick = async (event) => {
    event.preventDefault();
    // console.log(formData);
    const isValid = validateFrom();
    if (isValid) {
      try {
        setLoader(true);
        const response = await addUser(formData);
        // console.log(response);
        if (!response.ok) throw new Error(`${response.status} Problem with getting data`);
        // console.log(data);
        setLoader(false);
      } catch (err) {
        console.error(`${err.message} 💥`);
      }
      alert('submitted');
    } else {
      alert('inValid form');
    }
  };
  return (
    <div className="userAddPage">
      <h2 className="my-4">User Add</h2>
      {loader && <h2 style={{ color: 'red' }}>loading....</h2>}
      <form onSubmit={onSubmitClick}>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <UserInputWrapped
              label="Name"
              id="name"
              name="name"
              type="text"
              clsName="form-control form-control-sm"
              placeholder="Enter first name"
              isValid={fromError.name}
              onChange={onChangeHandler}
              value={formData.name}
            />
            <UserInputWrapped
              label="Email"
              id="email"
              name="email"
              type="text"
              clsName="form-control form-control-sm"
              placeholder="Enter email"
              isValid={fromError.email}
              onChange={onChangeHandler}
              value={formData.email}
            />
            <UserInputWrapped
              label="Contact"
              id="contact"
              name="contact"
              type="text"
              clsName="form-control form-control-sm"
              placeholder="Enter contact"
              isValid={fromError.contact}
              onChange={onChangeHandler}
              value={formData.contact}
            />
            <UserInputWrapped
              label="Password"
              id="password"
              name="password"
              type="text"
              clsName="form-control form-control-sm"
              placeholder="Enter password"
              isValid={fromError.password}
              onChange={onChangeHandler}
              value={formData.password}
            />
            <UserInputWrapped
              selectList={occupationList}
              label="occupation"
              id="occupation"
              name="occupation"
              type="select"
              clsName="form-select form-select-sm"
              placeholder="Select Occupation"
              isValid={fromError.occupation}
              onChange={onChangeHandler}
              val={formData.occupation}
            />
            <div className="row">
              <div className="offset-3 col-sm-9">
                <SubmitButtonWrapped
                  // disabled={!isDisabled}
                  title="Submit"
                  clsName="btn btn-outline-primary btn-sm me-2"
                />
                <SubmitButtonWrapped
                  title="< Back"
                  clsName="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    navigate('/user-listing-adv');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserAdd;
