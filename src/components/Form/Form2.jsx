import { useState } from 'react';
// import SubmitButtonWrapped from '../Shared/SubmitButton/SubmitButton';
import DatePicker from 'react-datepicker';
import UserInputWrapped from '../Shared/UserInput/UserInput';
// import { getCategory, getSubCategory } from '../../config/api-endpoints';

import 'react-datepicker/dist/react-datepicker.css';
import SubmitButtonWrapped from '../Shared/SubmitButton/SubmitButton';

const Form2 = () => {
  const [startDate, setStartDate] = useState(new Date());

  const onSubmitClick = (event) => {
    event.preventDefault();
    console.log('hi');
  };

  return (
    <div className="test">
      <h2 className="my-4">Form 2</h2>
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
              // isValid={fromError.name}
              // onChange={onChangeHandler}
              // value={formData.name}
            />
          </div>
          <div className="col-lg-6 offset-lg-3">
            <UserInputWrapped
              label="Email"
              id="email"
              name="email"
              type="text"
              clsName="form-control form-control-sm"
              placeholder="Enter first name"
              // isValid={fromError.name}
              // onChange={onChangeHandler}
              // value={formData.name}
            />
          </div>
          <div className="col-lg-6 offset-lg-3">
            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">Date</label>
              <div className="col-sm-9">
                <DatePicker
                  className="form-control form-control-sm"
                  selected={startDate}
                  showIcon
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
          </div>
          <div className="offset-3 col-sm-9">
            <SubmitButtonWrapped
              // disabled={!isDisabled}
              title="Submit"
              clsName="btn btn-outline-primary btn-sm me-2"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form2;
