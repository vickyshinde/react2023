import { useEffect, useState } from 'react';
import { getUsersAdv } from '../../config/api-endpoints';
import Pagination from '../Shared/Pagination/Pagination';

const UserListingAdv1 = () => {
  const [userList, setUserList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [controller, setController] = useState({
    currentPage: 1,
    rowsPerPage: 10,
    searchInput: '',
    sortColumn: '',
    order: ''
  });

  const [loader, setLoader] = useState(false);
  const [apiError, setApiError] = useState('');

  // pagination limit
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true);
        const response = await getUsersAdv(controller);
        // console.log(response);
        if (!response.ok) throw new Error(`${response.status} Problem with getting data`);
        const data = await response.json();
        // console.log(data);
        const totalPageCount = Math.ceil(response.headers.get('X-Total-Count'));
        setUserList(data);
        setTotalCount(totalPageCount);
        setLoader(false);
      } catch (err) {
        console.error(`${err.message} 💥`);
        setApiError(`${err.message} 💥`);
      }
    };
    getData();
    // console.log(controller.sortColumn);
    // console.log(controller.order);
  }, [controller]);
  // console.log(userList);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setController({
      ...controller,
      currentPage: pageNumber
    });
    // setCurrentPage(pageNumber);
  };

  const paginatePrev = (e, pageNumber) => {
    e.preventDefault();
    setController({
      ...controller,
      currentPage: pageNumber - 1
    });
    // setCurrentPage(pageNumber - 1);
    if ((controller.currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const paginateNext = (e, pageNumber) => {
    e.preventDefault();
    setController({
      ...controller,
      currentPage: pageNumber + 1
    });
    // setCurrentPage(pageNumber + 1);
    if (controller.currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const searchItems = (searchValue) => {
    setController({
      ...controller,
      searchInput: searchValue,
      currentPage: 1
    });
    // console.log(searchValue);
  };

  const sorting = (col) => {
    setController({
      ...controller,
      sortColumn: col,
      order: controller.order === 'desc' ? 'asc' : 'desc',
      currentPage: 1
    });
  };

  return (
    <div className="userListPage">
      <h2 className="my-4">User List - Custom Pagination</h2>
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
            value={controller.searchInput}
          />
        </div>
        <div className="col">
          <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
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
                    <button type="submit" className="btn btn-outline-primary btn-sm me-2">
                      Edit
                    </button>
                    <button type="submit" className="btn btn-outline-danger btn-sm">
                      Delete
                    </button>
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
          postsPerPage={controller.rowsPerPage}
          totalPosts={totalCount}
          paginate={paginate}
          currentPage={controller.currentPage}
          paginatePrev={paginatePrev}
          paginateNext={paginateNext}
          pageNumberLimit={pageNumberLimit}
          maxPageNumberLimit={maxPageNumberLimit}
          minPageNumberLimit={minPageNumberLimit}
        />
      ) : (
        'no results'
      )}
    </div>
  );
};

export default UserListingAdv1;
