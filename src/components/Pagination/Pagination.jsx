const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  paginatePrev,
  // isPrevDisabled,
  // isNextDisabled,
  paginateNext,
  // pageNumberLimit,
  maxPageNumberLimit,
  minPageNumberLimit
}) => {
  console.log(totalPosts);
  const pageNumbers = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    // console.log(i);
    // debugger;
    pageNumbers.push(i);
  }

  let pageIncrementBtn = null;

  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li className="page-item">
        <a className="page-link" onClick={(e) => paginateNext(e, currentPage)} href={`posts/${currentPage}`}>
          ...
        </a>
      </li>
    );
  }

  let pageDecrementBtn = null;

  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li className="page-item">
        <a className="page-link" onClick={(e) => paginatePrev(e, currentPage)} href={`posts/${currentPage}`}>
          ...
        </a>
      </li>
    );
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${currentPage === pageNumbers[0] ? 'disabled' : ''}`}>
          <a className="page-link" onClick={(e) => paginatePrev(e, currentPage)} href={`posts/${currentPage}`}>
            Previous
          </a>
        </li>
        {pageDecrementBtn}
        {pageNumbers.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                <a className="page-link" onClick={(e) => paginate(e, number)} href={`posts/${number}`}>
                  {number}
                </a>
              </li>
            );
          }
          return null;
        })}
        {pageIncrementBtn}
        <li className={`page-item ${currentPage === pageNumbers[pageNumbers.length - 1] ? 'disabled' : ''}`}>
          <a className="page-link" onClick={(e) => paginateNext(e, currentPage)} href={`posts/${currentPage}`}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
