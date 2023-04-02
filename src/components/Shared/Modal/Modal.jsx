import PropTypes from 'prop-types';

const Modal = ({ handleDelete, modalDeleteID, showModal, hideModal }) => {
  return (
    <>
      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete User</h5>
              <button
                type="submit"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideModal}
              />
            </div>
            <div className="modal-body">
              <p>Are you wanted to delete the User with id - {modalDeleteID}</p>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-outline-primary btn-sm"
                data-bs-dismiss="modal"
                onClick={hideModal}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  handleDelete(modalDeleteID);
                }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show" />}
    </>
  );
};

export default Modal;

Modal.propTypes = {
  handleDelete: PropTypes.func,
  modalDeleteID: PropTypes.string,
  showModal: PropTypes.bool,
  hideModal: PropTypes.func
};

Modal.defaultProps = {
  handleDelete: () => {},
  modalDeleteID: '',
  showModal: false,
  hideModal: () => {}
};
