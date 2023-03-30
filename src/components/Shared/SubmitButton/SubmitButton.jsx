import React from 'react';

class SubmitButtonErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="alert alert-danger" role="alert">
          Something went wrong in SubmitButton.
        </div>
      );
    }
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
    <button disabled={disabled} onClick={onClick} className={clsName}>
      {title}
    </button>
  );
};

export default SubmitButtonWrapped;
