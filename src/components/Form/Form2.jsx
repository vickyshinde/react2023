import { useState } from 'react';
// import SubmitButtonWrapped from '../Shared/SubmitButton/SubmitButton';
import DatePicker from 'react-datepicker';
import UserInputWrapped from '../Shared/UserInput/UserInput';
// import { getCategory, getSubCategory } from '../../config/api-endpoints';

import 'react-datepicker/dist/react-datepicker.css';
import SubmitButtonWrapped from '../Shared/SubmitButton/SubmitButton';

const indiaStateList = [
  {
    id: 1,
    name: 'Maharastra'
  },
  {
    id: 2,
    name: 'Delhi'
  },
  {
    id: 3,
    name: 'Gujrat'
  },
  {
    id: 4,
    name: 'Punjab'
  }
];

const countryList = [
  {
    id: 1,
    name: 'india',
    stateList: [
      {
        id: 1,
        name: 'Maharastra'
      },
      {
        id: 2,
        name: 'Delhi'
      },
      {
        id: 3,
        name: 'Gujrat'
      },
      {
        id: 4,
        name: 'Punjab'
      }
    ]
  },
  {
    id: 2,
    name: 'USA',
    stateList: [
      {
        id: 1,
        name: 'Maharastra'
      },
      {
        id: 2,
        name: 'Delhi'
      },
      {
        id: 3,
        name: 'Gujrat'
      },
      {
        id: 4,
        name: 'Punjab'
      }
    ]
  }
];

const Form2 = () => {
  const [startDate, setStartDate] = useState(new Date());
  // const [catSub, setCatSub] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    filter: []
  });

  const onChangeHandler = (name, value) => {
    setFormData((prevFromData) => ({
      ...prevFromData,
      [name]: value
    }));
  };

  // console.log(startDate);

  const onSelectHandler = (name, value, index) => {
    const updatedFilter = [...formData.filter];
    console.log(updatedFilter);
    updatedFilter[index] = {
      ...updatedFilter[index],
      [name]: value
    };
    setFormData((prevFromData) => ({
      ...prevFromData,
      filter: updatedFilter
    }));
  };

  // console.log(catSub);

  const onSubmitClick = (event) => {
    event.preventDefault();
    if (startDate) {
      formData.date = startDate;
    }
    // formData.filter = [
    //   {
    //     type: 'admin',
    //     value: 'admin1'
    //   }
    // ];
    console.log('formData', formData);
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
              onChange={onChangeHandler}
              value={formData.name}
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
              onChange={onChangeHandler}
              value={formData.email}
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
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">select</label>
            <div className="col-sm-4">
              <UserInputWrapped
                selectList={countryList}
                index="0"
                // label="category"
                // id="country"
                // name={Object.keys(formData.filter[0])[0]}
                name="country"
                type="select"
                clsName="form-select form-select-sm"
                placeholder="Select country"
                // isValid={fromError.occupation}
                onChange={onSelectHandler}
                value=""
              />
            </div>
            <div className="col-sm-5">
              <UserInputWrapped
                selectList={indiaStateList}
                index="0"
                // label="subCategory"
                // id="userTypeSub"
                // name={Object.keys(formData.filter[0])[1]}
                name="state"
                type="select"
                clsName="form-select form-select-sm"
                placeholder="Select state"
                // isValid={fromError.occupation}
                onChange={onSelectHandler}
                value=""
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">select</label>
            <div className="col-sm-4">
              <UserInputWrapped
                selectList={countryList}
                index="1"
                // label="category"
                // id="country"
                // name={Object.keys(formData.filter[0])[0]}
                name="country"
                type="select"
                clsName="form-select form-select-sm"
                placeholder="Select country"
                // isValid={fromError.occupation}
                onChange={onSelectHandler}
                value=""
              />
            </div>
            <div className="col-sm-5">
              <UserInputWrapped
                selectList={indiaStateList}
                index="1"
                // label="subCategory"
                // id="state"
                // name={Object.keys(formData.filter[0])[1]}
                name="state"
                type="select"
                clsName="form-select form-select-sm"
                placeholder="Select state"
                // isValid={fromError.occupation}
                onChange={onSelectHandler}
                value=""
              />
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
