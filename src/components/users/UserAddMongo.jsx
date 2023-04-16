import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getUsersFromMongoDB } from '../../config/api-endpoints';

function UserAddMongo() {
  // Add User
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm({
    defaultValues: {
      name: '',
      email: ''
    }
  });

  const onSubmit = async (data) => {
    console.log(data);
    let result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      alert('Data saved succesfully');
      reset(data);
    }
  };

  /* const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      alert('Data saved succesfully');
      setEmail('');
      setName('');
    }
  }; */

  // End add user

  // List Users
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [apiError, setApiError] = useState('');
  // const API = `https://jsonplaceholder.typicode.com/users`;
  const getData = async () => {
    try {
      setLoader(true);
      // const response = await fetch(url);
      const response = await getUsersFromMongoDB();
      console.log(response);
      if (!response.ok) throw new Error(`${response.status} Problem with getting data`);
      const data = await response.json();
      // console.log(data);
      setUserList(data);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.error(`${err} 💥`);
      setApiError(`${err} 💥`);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // End List Users
  return (
    <>
      <h1>This is React WebApp </h1>
      {/* <form action="">
        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" onClick={handleOnSubmit}>
          submit
        </button>
      </form> */}
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
                {...register('name', { required: 'First name is required' })}
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && <small className="invalid-feedback">{errors.name?.message}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
                {...register('email', { required: 'Email Address is required' })}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <small className="invalid-feedback">{errors.email?.message}</small>}
            </div>
            <input className="btn btn-outline-primary btn-sm mt-3" type="submit" />
          </form>
        </div>
      </div>
      <h2 className="my-4">User List</h2>
      {loader ? (
        <h2 style={{ color: 'red' }}>loading....</h2>
      ) : (
        <table className="table table-bordered table-sm table-hover table-striped" width="100%">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((item) => {
              const { _id, name, email } = item;
              return (
                <tr key={_id}>
                  <th scope="row">{_id}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {apiError && apiError}
    </>
  );
}

export default UserAddMongo;
