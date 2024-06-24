"use client";

import { useEffect, useRef, useState } from "react";

interface FormError {
  display: boolean;
  inputId: string;
  errorMessage: string;
}

export default function LoginPage() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [focus, setFocus] = useState<string>("");
  const [error, setError] = useState<FormError>({
    display: false,
    inputId: "",
    errorMessage: "",
  });
  const usrRef = useRef<any>(null);
  const pwdRef = useRef<any>(null);

  useEffect(() => {
    if (error.display && error.inputId === "username") {
      usrRef?.current?.focus();
    } else if (error.display && error.inputId === "password") {
      pwdRef?.current?.focus();
    }
  }, [error.display]);

  function onSubmit(e: any) {
    e.preventDefault();
    setDisabled(true);
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (username === "") {
      setTimeout(() => {
        setError({
          display: true,
          inputId: "username",
          errorMessage: "Please enter a username",
        });
        setDisabled(false);
      }, 1000);
    } else if (password === "") {
      setTimeout(() => {
        setError({
          display: true,
          inputId: "password",
          errorMessage: "Please enter a password",
        });
        setDisabled(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setDisabled(false);
      }, 1000);
    }
  }

  function onFocus(inputId: string, e: any) {
    setFocus(inputId);
  }

  function onBlur(e: any) {
    setFocus("");
    if (error.display) {
      setError({ ...error, display: false });
    }
  }

  function onChange(e: any) {
    if (error.display) {
      setError({ ...error, display: false });
    }
  }

  function getInputStyle(e: FormError): string {
    return (
      "mb-1 w-full p-2 rounded bg-[#0d1117] outline-2 " +
      "outline outline-blue-900 disabled:bg-[#24292f] " +
      (e.display ? "focus:outline-red-500" : "focus:outline-blue-400")
    );
  }

  function getInputLabelStyle(id: string, f: string, e: FormError): string {
    if (e.display && e.inputId === id) {
      return "mb-1 font-semibold text-red-500";
    } else if (f === id) {
      return "mb-1 font-semibold";
    } else {
      return "mb-1";
    }
  }

  const usrProps = {
    className: getInputStyle(error),
    disabled,
    type: "text",
    id: "username",
    onFocus: (e: any) => onFocus("username", e),
    onBlur,
    onChange,
    ref: usrRef,
  };

  const usrLabelProps = {
    className: getInputLabelStyle("username", focus, error),
  };

  const pwdProps = {
    className: getInputStyle(error),
    disabled,
    type: "password",
    id: "password",
    onFocus: (e: any) => onFocus("password", e),
    onBlur,
    onChange,
    ref: pwdRef,
  };

  const pwdLabelProps = {
    className: getInputLabelStyle("password", focus, error),
  };

  const btnProps = {
    className:
      "w-1/2 bg-blue-900 rounded p-2 cursor-pointer hover:bg-blue-700 " +
      "hover:font-semibold disabled:bg-[#8aa6d4] disabled:cursor-wait",
    disabled,
    type: "submit" as const,
  };

  const formProps = {
    className: "max-w-[26rem] w-3/4 p-4 rounded bg-[#0d1117]",
    onSubmit,
  };

  const usrError =
    error.display && error.inputId === "username" ? (
      <p className="text-sm text-red-500">{error.errorMessage}</p>
    ) : (
      <></>
    );

  const pwdError =
    error.display && error.inputId === "password" ? (
      <p className="text-sm text-red-500">{error.errorMessage}</p>
    ) : (
      <></>
    );

  return (
    <div className="py-16 flex justify-center">
      <form {...formProps}>
        <div className="flex justify-center mb-3">
          <p className="text-xl font-bold">To-Do App Login Page</p>
        </div>
        <div className="mb-2">
          <p {...usrLabelProps}>Username</p>
          <input {...usrProps}></input>
          {usrError}
        </div>
        <div className="mb-8">
          <p {...pwdLabelProps}>Password</p>
          <input {...pwdProps}></input>
          {pwdError}
        </div>
        <div className="flex justify-center">
          <button {...btnProps}>Login</button>
        </div>
      </form>
    </div>
  );
}
