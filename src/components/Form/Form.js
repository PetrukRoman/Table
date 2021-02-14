import React from "react";
import classes from "./Form.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import validator from "validator";

function validateEmail(email) {
  const isValidEmail = validator.isEmail(email);
  return isValidEmail;
}
function validatePhone(phone) {
  const isValidPhoneNumber = validator.isMobilePhone(phone);
  return isValidPhoneNumber;
}
class Form extends React.Component {
  state = {
    isFormValid: false,
    formControls: {
      id: {
        value: "",
        type: "number",
        label: "ID",
        errorMessage: "Введите корректный Id",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 1,
          id: true,
        },
      },
      firstName: {
        value: "",
        type: "text",
        label: "Имя",
        errorMessage: "Введите корректное имя",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 1,
        },
      },
      lastName: {
        value: "",
        type: "text",
        label: "Фамилия",
        errorMessage: "Введите корректную фамилию",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 1,
        },
      },
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      phone: {
        value: "",
        type: "text",
        label: "Номер телефона",
        errorMessage: "Введите корректный номер телефона",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
          phone: true,
        },
      },
    },
  };
  addHandler = () => {
    this.props.add(
      this.state.formControls.id.value,
      this.state.formControls.firstName.value,
      this.state.formControls.lastName.value,
      this.state.formControls.email.value,
      this.state.formControls.phone.value
    );
  };
  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    if (validation.phone) {
      isValid = validatePhone(value) && isValid;
    }
    if (validation.id) {
      isValid = value >= 0 && isValid;
    }
    return isValid;
  }
  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
    });
  };
  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }
  render() {
    return (
      <div className={classes.Form}>
        <div>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.addHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
