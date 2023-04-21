import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SubmitButtonWrapped from '../Shared/SubmitButton/SubmitButton';
import UserInputWrapped from '../Shared/UserInput/UserInput';
import { getCategory, getSubCategory } from '../../config/api-endpoints';

const categoryList = [
  {
    id: 1,
    name: 'option 1'
  },
  {
    id: 2,
    name: 'option 2'
  },
  {
    id: 3,
    name: 'option 3'
  },
  {
    id: 4,
    name: 'option 4'
  }
];
const subCategoryList = [
  {
    id: 1,
    name: 'sub option 1'
  },
  {
    id: 2,
    name: 'sub option 2'
  },
  {
    id: 3,
    name: 'sub option 3'
  },
  {
    id: 4,
    name: 'sub option 4'
  }
];
const Form = () => {
  const [loader, setLoader] = useState(false);
  const [apiError, setApiError] = useState('');
  const [ddList, setDdList] = useState();
  const [formData, setFromData] = useState({
    name: '',
    filter: []
  });

  const getDDCategory = async () => {
    try {
      setLoader(true);
      const response = await getCategory();
      if (!response.ok) throw new Error(`${response.status} Problem with getting data`);
      const data = await response.json();
      setDdList(data);
      setLoader(false);
    } catch (err) {
      console.error(`${err.message} 💥`);
      setApiError(`${err.message} 💥`);
      setLoader(false);
    }
  };

  const [subDdId, setSubDdId] = useState(1);
  const [subDdList, setSubDdList] = useState([]);
  /*  const changeSubCategory = () => {
    if (subDdId === 1) {
      type = algorithm;
    } else if (selected === 'Language') {
      type = language;
    } else if (selected === 'Data Structure') {
      type = dataStructure;
    }
  }; */

  const getDDSubCategory = async () => {
    try {
      setLoader(true);
      const response = await getSubCategory(subDdId);
      // console.log(response);
      if (!response.ok) throw new Error(`${response.status} Problem with getting data`);
      const data = await response.json();
      // console.log(data);

      setSubDdList(data.sub);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.error(`${err.message} 💥`);
    }
  };
  useEffect(() => {
    getDDSubCategory();
  }, [subDdId]);

  useEffect(() => {
    getDDCategory();
  }, []);

  // console.log(subDdList);
  // console.log(subDdList);

  // const updateSubList = (index) => {
  //   setSubDdList(ddList[index].sub);
  // };
  const onChangeHandler = (name, value, index) => {
    const updatedFilter = [...formData.filter];
    updatedFilter[index] = {
      ...updatedFilter[index],
      [name]: value
    };
    setSubDdId(value);
    // console.log('updatedFilter', updatedFilter[index]);

    // console.log(name, value, index);
    if (name === 'category' || name === 'subCategory') {
      setFromData({
        ...formData,
        filter: updatedFilter
      });
    } else {
      setFromData({
        ...formData,
        [name]: value
      });
    }
  };

  // console.log(Object.keys(formData.filter[0])[0]);
  const onSubmitClick = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  // console.log(formData);
  return (
    <div className="test">
      <NavLink className="nav-link" to="/form2">
        <strong>Form Nav 2</strong>
      </NavLink>
      <h2 className="my-4">Form</h2>
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
              // isValid={fromError.name}
              onChange={onChangeHandler}
              value={formData.name}
            />
          </div>
          <div className="col-lg-6 offset-lg-3">
            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">select</label>
              <div className="col-sm-4">
                <UserInputWrapped
                  selectList={ddList}
                  index="0"
                  // label="category"
                  id="category"
                  // name={Object.keys(formData.filter[0])[0]}
                  name="category"
                  type="select"
                  clsName="form-select form-select-sm"
                  placeholder="Select category"
                  // isValid={fromError.occupation}
                  onChange={onChangeHandler}
                  value=""
                />
              </div>
              <div className="col-sm-5">
                <UserInputWrapped
                  selectList={subDdList}
                  index="0"
                  // label="subCategory"
                  id="subCategory"
                  // name={Object.keys(formData.filter[0])[1]}
                  name="subCategory"
                  type="select"
                  clsName="form-select form-select-sm"
                  placeholder="Select subCategory"
                  // isValid={fromError.occupation}
                  onChange={onChangeHandler}
                  value=""
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">select</label>
              <div className="col-sm-4">
                <UserInputWrapped
                  selectList={categoryList}
                  index="1"
                  // label="category"
                  id="category"
                  // name={Object.keys(formData.filter[0])[0]}
                  name="category"
                  type="select"
                  clsName="form-select form-select-sm"
                  placeholder="Select category"
                  // isValid={fromError.occupation}
                  onChange={onChangeHandler}
                  value=""
                />
              </div>
              <div className="col-sm-5">
                <UserInputWrapped
                  selectList={subCategoryList}
                  index="1"
                  // label="subCategory"
                  id="subCategory"
                  // name={Object.keys(formData.filter[0])[1]}
                  name="subCategory"
                  type="select"
                  clsName="form-select form-select-sm"
                  placeholder="Select subCategory"
                  // isValid={fromError.occupation}
                  onChange={onChangeHandler}
                  value=""
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">select</label>
              <div className="col-sm-4">
                <UserInputWrapped
                  selectList={categoryList}
                  index="2"
                  // label="category"
                  id="category"
                  // name={Object.keys(formData.filter[0])[0]}
                  name="category"
                  type="select"
                  clsName="form-select form-select-sm"
                  placeholder="Select category"
                  // isValid={fromError.occupation}
                  onChange={onChangeHandler}
                  value=""
                />
              </div>
              <div className="col-sm-5">
                <UserInputWrapped
                  selectList={subCategoryList}
                  index="2"
                  // label="subCategory"
                  id="subCategory"
                  // name={Object.keys(formData.filter[0])[1]}
                  name="subCategory"
                  type="select"
                  clsName="form-select form-select-sm"
                  placeholder="Select subCategory"
                  // isValid={fromError.occupation}
                  onChange={onChangeHandler}
                  value=""
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
      {apiError && apiError}
    </div>
  );
};

export default Form;
