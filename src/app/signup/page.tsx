"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";

interface FormError {
  display: boolean;
  inputId: string;
  errorMessage: string;
}

function ErrMsg({ id, error }: { id: string; error: FormError }) {
  if (error.display && error.inputId === id) {
    return <p className="text-sm text-red-500">{error.errorMessage}</p>;
  } else {
    return <></>;
  }
}

export default function SignUpPage() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [focusedElement, setFocusedElement] = useState<string>("");
  const [error, setError] = useState<FormError>({
    display: false,
    inputId: "",
    errorMessage: "",
  });
  const formRefs: { [id: string]: MutableRefObject<any> } = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    username: useRef(null),
    password: useRef(null),
    retypePassword: useRef(null),
  };

  useEffect(() => {
    if (error.display) {
      formRefs[error.inputId]?.current?.focus();
    }
  }, [error.display]);

  function onSubmit(e: any) {
    e.preventDefault();
    setDisabled(true);
    const formData = {
      firstName: e.target.firstName.value as string,
      lastName: e.target.lastName.value as string,
      email: e.target.email.value as string,
      username: e.target.username.value as string,
      password: e.target.password.value as string,
      retypePassword: e.target.retypePassword.value as string,
    };
    console.log(JSON.stringify(formData));
    if (formData.firstName === "") {
      setTimeout(() => {
        setError({
          display: true,
          inputId: "firstName",
          errorMessage: "Enter a valid first name",
        });
        setDisabled(false);
      }, 1000);
    } else if (formData.lastName === "") {
      setTimeout(() => {
        setError({
          display: true,
          inputId: "lastName",
          errorMessage: "Enter a valid last name",
        });
        setDisabled(false);
      }, 1000);
    } else if (formData.email.split("@").length !== 2) {
      setTimeout(() => {
        setError({
          display: true,
          inputId: "email",
          errorMessage: "Enter a valid email address",
        });
        setDisabled(false);
      }, 1000);
    } else if (formData.username === "") {
      setTimeout(() => {
        setError({
          display: true,
          inputId: "username",
          errorMessage: "Enter a username",
        });
        setDisabled(false);
      }, 1000);
    } else if (formData.password === "") {
      setTimeout(() => {
        setError({
          display: true,
          inputId: "password",
          errorMessage: "Enter a password",
        });
        setDisabled(false);
      }, 1000);
    } else if (formData.retypePassword !== formData.password) {
      setTimeout(() => {
        setError({
          display: true,
          inputId: "retypePassword",
          errorMessage: "Confirm password does not match password",
        });
        setDisabled(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setDisabled(false);
      }, 1000);
    }
  }

  function getLabelStyle(id: string, focusEl: string, ferr: FormError) {
    if (ferr.display && ferr.inputId === id) {
      return "mb-1 font-semibold text-red-500";
    } else if (focusEl === id) {
      return "mb-1 font-semibold";
    } else {
      return "mb-1";
    }
  }

  function getInputStyle(id: string, ferr: FormError) {
    return (
      "mb-1 p-2 w-full rounded outline outline-2 outline-blue-900 " +
      "bg-[#0d1117]  disabled:bg-[#24292f] " +
      (ferr.display && ferr.inputId === id
        ? "focus:outline-red-500"
        : "focus:outline-blue-400")
    );
  }

  function onElementBlur(id: string, ferr: FormError) {
    setFocusedElement("");
    if (ferr.display && ferr.inputId === id) {
      setError({ ...error, display: false });
    }
  }

  function onElementChange(id: string, ferr: FormError) {
    if (ferr.display && ferr.inputId === id) {
      setError({ ...error, display: false });
    }
  }

  const formProps = {
    className: "w-3/4 max-w-[26rem] p-4 rounded bg-[#0d1117]",
    onSubmit,
  };

  const fnLabelProps = {
    className: getLabelStyle("firstName", focusedElement, error),
  };

  const fnProps = {
    className: getInputStyle("firstName", error),
    type: "text",
    id: "firstName",
    disabled,
    onFocus: () => setFocusedElement("firstName"),
    onBlur: () => onElementBlur("firstName", error),
    onChange: () => onElementChange("firstName", error),
    ref: formRefs.firstName,
  };

  const lnLabelProps = {
    className: getLabelStyle("lastName", focusedElement, error),
  };

  const lnProps = {
    className: getInputStyle("lastName", error),
    type: "text",
    id: "lastName",
    disabled,
    onFocus: () => setFocusedElement("lastName"),
    onBlur: () => onElementBlur("lastName", error),
    onChange: () => onElementChange("lastName", error),
    ref: formRefs.lastName,
  };

  const emailLabelProps = {
    className: getLabelStyle("email", focusedElement, error),
  };

  const emailProps = {
    className: getInputStyle("email", error),
    type: "text",
    id: "email",
    disabled,
    onFocus: () => setFocusedElement("email"),
    onBlur: () => onElementBlur("email", error),
    onChange: () => onElementChange("email", error),
    ref: formRefs.email,
  };

  const usrLabelProps = {
    className: getLabelStyle("username", focusedElement, error),
  };

  const usrProps = {
    className: getInputStyle("username", error),
    type: "text",
    id: "username",
    disabled,
    onFocus: () => setFocusedElement("username"),
    onBlur: () => onElementBlur("username", error),
    onChange: () => onElementChange("username", error),
    ref: formRefs.username,
  };

  const pwdLabelProps = {
    className: getLabelStyle("password", focusedElement, error),
  };

  const pwdProps = {
    className: getInputStyle("password", error),
    type: "password",
    id: "password",
    disabled,
    onFocus: () => setFocusedElement("password"),
    onBlur: () => onElementBlur("password", error),
    onChange: () => onElementChange("password", error),
    ref: formRefs.password,
  };

  const retypePwdLabelProps = {
    className: getLabelStyle("retypePassword", focusedElement, error),
  };

  const retypePwdProps = {
    className: getInputStyle("retypePassword", error),
    type: "password",
    id: "retypePassword",
    disabled,
    onFocus: () => setFocusedElement("retypePassword"),
    onBlur: () => onElementBlur("retypePassword", error),
    onChange: () => onElementChange("retypePassword", error),
    ref: formRefs.retypePassword,
  };

  const submitButtonProps = {
    className:
      "w-1/2 bg-[#29437a] rounded p-2 cursor-pointer hover:bg-[#6a7893] " +
      "disabled:bg-[#8aa6d4] disabled:cursor-wait disabled:text-[#23251e]",
    type: "submit" as const,
    disabled,
  };

  return (
    <div className="flex justify-center py-16">
      <form {...formProps}>
        <div className="flex justify-center mb-3">
          <p className="text-xl font-bold">To-Do App Signup Page</p>
        </div>
        <div className="mb-2">
          <p {...fnLabelProps}>Enter first name</p>
          <input {...fnProps}></input>
          <ErrMsg id="firstName" error={error}></ErrMsg>
        </div>
        <div className="mb-2">
          <p {...lnLabelProps}>Enter last name</p>
          <input {...lnProps}></input>
          <ErrMsg id="lastName" error={error}></ErrMsg>
        </div>
        <div className="mb-2">
          <p {...emailLabelProps}>Enter email</p>
          <input {...emailProps}></input>
          <ErrMsg id="email" error={error}></ErrMsg>
        </div>
        <div className="mb-2">
          <p {...usrLabelProps}>Enter username</p>
          <input {...usrProps}></input>
          <ErrMsg id="username" error={error}></ErrMsg>
        </div>
        <div className="mb-2">
          <p {...pwdLabelProps}>Enter password</p>
          <input {...pwdProps}></input>
          <ErrMsg id="password" error={error}></ErrMsg>
        </div>
        <div className="mb-8">
          <p {...retypePwdLabelProps}>Confirm password</p>
          <input {...retypePwdProps}></input>
          <ErrMsg id="retypePassword" error={error}></ErrMsg>
        </div>
        <div className="flex justify-center">
          <button {...submitButtonProps}>
            {disabled ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}
