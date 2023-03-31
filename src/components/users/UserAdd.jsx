import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../config/api-endpoints';
import SubmitButtonWrapped from '../Shared/SubmitButton/SubmitButton';
import UserInputWrapped from '../Shared/UserInput/UserInput';

const UserAdd = () => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [formData, setFromData] = useState({
    name: '',
    email: '',
    contact: '',
    password: ''
    // confirmPassword: '',
    // occupation: 'Select',
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

  const onSubmitClick = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      setLoader(true);
      const response = await addUser(formData);
      console.log(response);
      if (!response.ok) throw new Error(`${response.status} Problem with getting data`);
      // console.log(data);
      setLoader(false);
    } catch (err) {
      console.error(`${err.message} 💥`);
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
              errorMsg={'Please enter name min 4 character'}
              // isValid={isfNameValid}
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
              errorMsg={'Please enter name min 4 character'}
              // isValid={isfNameValid}
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
              errorMsg={'Please enter name min 4 character'}
              // isValid={isfNameValid}
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
              errorMsg={'Please enter name min 4 character'}
              // isValid={isfNameValid}
              onChange={onChangeHandler}
              value={formData.password}
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
