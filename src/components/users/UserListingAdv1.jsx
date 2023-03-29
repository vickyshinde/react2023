import { useEffect, useState } from 'react';
import { getUsersAdv } from '../../config/api-endpoints';
import Pagination from '../Pagination/Pagination';

const UserListingAdv1 = () => {
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
        const totalCount = Math.ceil(response.headers.get('X-Total-Count'));
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

  return (
    <div className="userListPage">
      <h2>User List - Custom Pagination</h2>
      <input
        label="Search"
        name="search"
        type="text"
        className="form-control"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
        val={controller.searchInput}
      />
      <span>Showing {userList.length > controller.rowsPerPage ? controller.rowsPerPage: userList.length} out of {totalCount} entries</span>
      {loader ? (
        <h2 style={{ color: 'red' }}>loading....</h2>
      ) : (
        <table className="table table-bordered" width="100%">
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
