import PropTypes from 'prop-types';

const AlertMessage = ({ clsName, msg }) => {
  return (
    <div className={`alert ${clsName}`} role="alert">
      {msg}
    </div>
  );
};

export default AlertMessage;

AlertMessage.defaultProps = {
  clsName: '',
  msg: ''
};
AlertMessage.propTypes = {
  clsName: PropTypes.string,
  msg: PropTypes.string
};
