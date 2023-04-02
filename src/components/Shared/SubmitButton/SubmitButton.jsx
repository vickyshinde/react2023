import React from 'react';
import PropTypes from 'prop-types';

class SubmitButtonErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.log(error, info);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="alert alert-danger" role="alert">
          Something went wrong in SubmitButton.
        </div>
      );
    }
    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    return this.props.children;
  }
}

const SubmitButtonWrapped = (props) => {
  return (
    <SubmitButtonErrorBoundary>
      <SubmitButton {...props} />
    </SubmitButtonErrorBoundary>
  );
};

const SubmitButton = ({ clsName, onClick, title, disabled }) => {
  return (
    <button type="submit" disabled={disabled} onClick={onClick} className={clsName}>
      {title}
    </button>
  );
};

export default SubmitButtonWrapped;

SubmitButton.defaultProps = {
  clsName: '',
  onClick: () => {},
  title: '',
  disabled: false
};

SubmitButton.propTypes = {
  clsName: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool
};
