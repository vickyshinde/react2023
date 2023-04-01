import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUsersAdv } from '../../config/api-endpoints';
import { Pagination } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Modal from '../Shared/Modal/Modal';

const UserListingAdv = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [controller, setController] = useState({
    currentPage: 1,
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
        setTotalCount(totalCount);
        setLoader(false);
      } catch (err) {
        console.error(`${err.message} 💥`);
        setApiError(`${err.message} 💥`);
      }
    };
    getData();
    console.log(controller.sortColumn);
    console.log(controller.order);
  }, [controller]);
  // console.log(userList);

  const handlePageChange = (event, newPage) => {
    console.log(event);
    console.log(newPage);
    setController({
      ...controller,
      currentPage: newPage
    });
  };

  const searchItems = (searchValue) => {
    setController({
      ...controller,
      searchInput: searchValue,
      currentPage: 1
    });
    console.log(searchValue);
  };

  const sorting = (col) => {
    setController({
      ...controller,
      sortColumn: col,
      order: controller.order === 'desc' ? 'asc' : 'desc',
      currentPage: 1
    });
  };

  const [filterOption, setFilterOption] = useState('all');
  const handleFilter = (event) => {
    setController({
      ...controller,
      searchInput: event.target.value,
      currentPage: 1
    });
    console.log('hi');
    setFilterOption(event.target.value);
  };
  // console.log(filterOption);

  // delete user
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalDeleteID, setModalDeleteID] = useState(false);
  const handleDeleteClose = () => {
    console.log('hi');
    setModalDeleteShow(false);
  }
  const handleDeleteShow = (id) => {
    console.log(id);
    setModalDeleteID(id);
    setModalDeleteShow(true);
  }


  const [deleteUserMsg, setDeleteUserMsg] = useState('');
  const handleDelete = async (id) => {
    try {
      setLoader(true);
      const response = await deleteUser(id);
      // console.log(response);
      if (!response.ok) throw new Error(`${response.status} - no user found with id - ${id}`);
      setDeleteUserMsg(`user with id ${id} deleted successfully`);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.error(`${err.message} 💥`);
      setApiError(`${err.message} 💥`);
    }
    setModalDeleteShow(false);
    // getData();
    // if (window.confirm(`Are you wanted to delete the User with id - ${id}`)) {
    // }
  };

  return (
    <div className="userListPage">
      <h2 className="my-4">User List</h2>
      <NavLink className="btn btn-outline-danger mb-4" to="/user-add">
        Create User
      </NavLink>
      <div className="row mb-3">
        <div className="col">
          <input
            label="Search"
            name="search"
            type="text"
            className="form-control"
            placeholder="Search..."
            autoComplete="off"
            onChange={(e) => searchItems(e.target.value)}
            val={controller.searchInput}
          />
        </div>
        <div className="col">
          <select
            className="form-select"
            aria-label="Default select example"
            value={filterOption}
            onChange={handleFilter}>
            <option defaultValue value={''}>
              Open this select menu
            </option>
            <option value="gdodson1@kickstarter.com">gdodson1@kickstarter.com</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col text-end">
          Showing <strong>{userList.length > controller.rowsPerPage ? controller.rowsPerPage : userList.length}</strong>{' '}
          out of <strong>{totalCount}</strong> entries
        </div>
      </div>
      {loader ? (
        <h2 style={{ color: 'red' }}>loading....</h2>
      ) : (
        <table className="table table-bordered table-sm table-hover table-striped" width="100%">
          <thead>
            <tr>
              <th scope="col">index</th>
              <th scope="col" onClick={() => sorting('id')}>
                #
              </th>
              <th scope="col" onClick={() => sorting('name')}>
                Name
              </th>
              <th scope="col" onClick={() => sorting('email')}>
                Email
              </th>
              <th scope="col" onClick={() => sorting('contact')}>
                contact
              </th>
              <th scope="col" onClick={() => sorting('password')}>
                password
              </th>
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
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => {
                        navigate(`/user-edit/${item.id}`);
                      }}>
                      Edit
                    </button>
                    {/* <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button> */}
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteShow(item.id)}>
                      Delete 
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {deleteUserMsg && <div className="test">{deleteUserMsg}</div>}
      {apiError && apiError}
      {userList.length ? (
        <Pagination
          count={totalCount}
          page={controller.currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="secondary"
        />
      ) : (
        'no results'
      )}
      <Modal handleDelete={handleDelete} modalDeleteID={modalDeleteID} showModal={modalDeleteShow} hideModal={handleDeleteClose} />
    </div>
  );
};

export default UserListingAdv;
