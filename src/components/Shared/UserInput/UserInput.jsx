import React from 'react';
import PropTypes from 'prop-types';

class UserInputErrorBoundary extends React.Component {
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
          Something went wrong in UserInput.
        </div>
      );
    }
    return this.props.children;
  }
}

const UserInputWrapped = (props) => {
  return (
    <UserInputErrorBoundary>
      <UserInput {...props} />
    </UserInputErrorBoundary>
  );
};

const UserInput = ({ label, id, name, type, clsName, placeholder, isValid, onChange, val, selectList }) => {

  const selectedVal = selectList.map((item) => {
    if (val === item.id) {
      return item.name;
    }
    return null;
  });
  console.log(selectedVal);
  return (
    <div className="mb-3 row">
      {label && (
        <label className="col-sm-3 col-form-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="col-sm-9">
        {type === 'select' ? (
          <select
            className={`${clsName} ${isValid ? 'is-invalid' : ''}`}
            id={id}
            name={name}
            onChange={(event) => {
              onChange(event.target.name, event.target.value);
              console.log(event.target.name, event.target.value)
            }}>
            <option defaultValue>{placeholder}</option>
            {selectList.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        ) : (
          <input
            type={type}
            className={`${clsName} ${isValid ? 'is-invalid' : ''}`}
            id={id}
            name={name}
            placeholder={placeholder}
            autoComplete="off"
            value={val}
            onChange={(event) => {
              onChange(event.target.name, event.target.value);
            }}
          />
        )}
        {isValid && <small className="invalid-feedback">{isValid}</small>}
      </div>
    </div>
  );
};

UserInput.defaultProps = {
  id: '',
  name: '',
  label: 'Input',
  type: 'text',
  clsName: 'inputClass',
  placeholder: 'placeholder',
  value: '',
  onChange: () => {},
  selectList: []
};

UserInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  clsName: PropTypes.string,
  placeholder: PropTypes.string,
  isValid: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  selectList: PropTypes.array
};

export default UserInputWrapped;
