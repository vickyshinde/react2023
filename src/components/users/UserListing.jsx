import { useEffect, useState } from 'react';
import { getUsers } from '../../config/api-endpoints';

const UserListing = () => {
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [apiError, setApiError] = useState('');
  // const API = `https://jsonplaceholder.typicode.com/users`;
  const getData = async () => {
    try {
      setLoader(true);
      // const response = await fetch(url);
      const response = await getUsers()
      // console.log(response);
      if (!response.ok) throw new Error(`${response.status} Problem with getting data`);
      const data = await response.json();
      // console.log(data);
      setUserList(data);
      setLoader(false);
    } catch (err) {
      console.error(`${err} 💥`);
      setApiError(`${err} 💥`)
    }
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(userList);
  
  return (
    <div className="userListPage">
      <h2>User List</h2>
      {loader ? (
        <h2 style={{color: 'red'}}>loading....</h2>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">phone</th>
              <th scope="col">website</th>
              <th scope="col">company</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((item) => {
              const { id, name, email, phone, website, company } = item;
              return (
                <tr key={id}>
                  <th scope="row">{id.toString().padStart(2, '0')}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>{website}</td>
                  <td>{company.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {apiError && apiError}
    </div>
  );
};

export default UserListing;
