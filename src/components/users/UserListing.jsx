import { useEffect, useState } from 'react';
import { dateFormats } from '../../constants/dateFormats';
import { dateFormater, getFormatedDate } from '../../utility/date-utils';
import { getPlaceholderUsers } from '../../config';

const UserListing = () => {
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);
  // const [apiError, setApiError] = useState('');
  // const API = `https://jsonplaceholder.typicode.com/users`;
  /* const getData = async () => {
    try {
      setLoader(true);
      // const response = await fetch(url);
      const response = await getPlaceholderUsers();
      // console.log(response);
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
  }; */

  const getData = async () => {
    setLoader(true);
    const response = await getPlaceholderUsers();
    setUserList(response);
    /* if (response && response.message === statusOk) {
      setUserList(response);
    } */
    setLoader(false);
  };
  useEffect(() => {
    getData();
  }, []);
  // console.log(userList);

  return (
    <div className="userListPage">
      <h2 className="my-4">User List July 22, 2018 (2023-04-25T09:54:54.833Z)</h2>
      <h4>{getFormatedDate(new Date('2023-04-25T09:54:54.833Z'), dateFormats.dddd_MM_DD)}</h4>
      <h4>{getFormatedDate(new Date('2023-04-25T09:54:54.833Z'), dateFormats.MM_DD_dddd)}</h4>
      <h4>{getFormatedDate(new Date('2023-04-25T09:54:54.833Z'), dateFormats.dddd_MMMM_DD)}</h4>
      <h4>{getFormatedDate(new Date('2023-04-25T09:54:54.833Z'), dateFormats.DD_MM_dddd)}</h4>
      <h4>{dateFormater(new Date('2023-04-01T09:54:54.833Z'))}</h4>
      {loader ? (
        <h2 style={{ color: 'red' }}>loading....</h2>
      ) : (
        <table className="table table-bordered table-sm table-hover table-striped" width="100%">
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
      {/* {apiError && apiError} */}
    </div>
  );
};

export default UserListing;
