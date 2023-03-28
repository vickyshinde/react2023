import { useEffect, useState } from 'react';
import { getUsersAdv } from '../../config/api-endpoints';
import { Pagination } from '@mui/material';

const UserListingAdv = () => {
  const [userList, setUserList] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [controller, setController] = useState({
    page: 1,
    rowsPerPage: 10,
    searchInput: '',
    sortColumn: '',
    order: ''
  });

  const [loader, setLoader] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true);
        const response = await getUsersAdv(controller);
        // console.log(response);
        if (!response.ok) throw new Error(`${response.status} Problem with getting data`);
        const data = await response.json();
        // console.log(data);
        const totalCount = Math.ceil(response.headers.get('X-Total-Count') / controller.rowsPerPage);
        setUserList(data);
        setPageCount(totalCount);
        setLoader(false);
      } catch (err) {
        console.error(`${err} 💥`);
        setApiError(`${err} 💥`);
      }
    };
    getData();
  }, [controller]);

  console.log(userList);

  const handlePageChange = (event, newPage) => {
    console.log(event);
    console.log(newPage);
    setController({
      ...controller,
      page: newPage
    });
  };

  const searchItems = (searchValue) => {
    setController({
      ...controller,
      searchInput: searchValue,
      page: 1
    });
    console.log(searchValue);
  };

  const sorting = (col) => {
    setController({
      ...controller,
      sortColumn: col,
      order: controller.order === 'desc' ? 'asc' : 'desc',
      page: 1
    });
  };
  console.log(controller.sortColumn);
  console.log(controller.order);

  return (
    <div className="userListPage">
      <h2>User List</h2>
      <input
        label="Search"
        name="search"
        type="text"
        className="form-control"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
        val={controller.searchInput}
      />
      {loader ? (
        <h2>loading....</h2>
      ) : (
        <table className="table table-bordered" width="100%">
          <thead>
            <tr>
              <th scope="col">index</th>
              <th scope="col" onClick={() => sorting('id')}>#</th>
              <th scope="col" onClick={() => sorting('name')}>Name</th>
              <th scope="col" onClick={() => sorting('email')}>Email</th>
              <th scope="col" onClick={() => sorting('contact')}>contact</th>
              <th scope="col" onClick={() => sorting('password')}>password</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((item, index) => {
              const { id, name, email, contact, password } = item;
              return (
                <tr key={id}>
                  <th scope="row">{(index + 1).toString().padStart(2, '0')}</th>
                  <th scope="row">{id.toString().padStart(2, '0')}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{contact}</td>
                  <td>{password}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {apiError && apiError}
      {userList.length ? (
        <Pagination
          count={pageCount}
          page={controller.page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="secondary"
        />
      ) : 'no results'}
    </div>
  );
};

export default UserListingAdv;
