"use client";

import {
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useRef,
} from "react";

type SignUpInputId =
  | "firstName"
  | "lastName"
  | "email"
  | "username"
  | "password"
  | "retypePassword";

export interface SignUpPageState {
  formDisabled: boolean;
  focusedInput: "" | SignUpInputId;
  inputError: {
    display: boolean;
    inputId: "" | SignUpInputId;
    errorMsg: string;
  };
}

const initSignUpPageState: SignUpPageState = {
  formDisabled: false,
  focusedInput: "",
  inputError: {
    display: false,
    inputId: "",
    errorMsg: "",
  },
};

export type SignUpPageAction =
  | { type: "disableForm" }
  | { type: "enableForm" }
  | { type: "setFocusedInput"; focusedInput: SignUpInputId }
  | { type: "clearFocusedInput" }
  | { type: "setInputError"; inputId: SignUpInputId; errorMsg: string }
  | { type: "clearInputError" }
  | {
      type: "setInputErrorAndEnableForm";
      inputId: SignUpInputId;
      errorMsg: string;
    }
  | { type: "clearInputErrorAndClearFocusedInput" };

export type SignUpPageDispatch = (a: SignUpPageAction) => void;

function signUpPageReducer(
  state: SignUpPageState,
  action: SignUpPageAction
): SignUpPageState {
  if (action.type === "disableForm") {
    return { ...state, formDisabled: true };
  } else if (action.type === "enableForm") {
    return { ...state, formDisabled: false };
  } else if (action.type === "setFocusedInput") {
    return { ...state, focusedInput: action.focusedInput };
  } else if (action.type === "clearFocusedInput") {
    return { ...state, focusedInput: "" };
  } else if (action.type === "setInputError") {
    return {
      ...state,
      inputError: {
        display: true,
        inputId: action.inputId,
        errorMsg: action.errorMsg,
      },
    };
  } else if (action.type === "clearInputError") {
    return {
      ...state,
      inputError: {
        display: false,
        inputId: "",
        errorMsg: "",
      },
    };
  } else if (action.type === "setInputErrorAndEnableForm") {
    return {
      ...state,
      inputError: {
        display: true,
        inputId: action.inputId,
        errorMsg: action.errorMsg,
      },
      formDisabled: false,
    };
  } else if (action.type === "clearInputErrorAndClearFocusedInput") {
    return {
      ...state,
      inputError: {
        display: false,
        inputId: "",
        errorMsg: "",
      },
      focusedInput: "",
    };
  } else {
    return { ...state };
  }
}

const SignUpPageStateContext = createContext<
  [SignUpPageState, SignUpPageDispatch]
>([initSignUpPageState, (a) => {}]);

export function useSignUpPageStateContext() {
  return useContext(SignUpPageStateContext);
}

export type SignUpPageRefs = {
  firstName?: MutableRefObject<any>;
  lastName?: MutableRefObject<any>;
  email?: MutableRefObject<any>;
  username?: MutableRefObject<any>;
  password?: MutableRefObject<any>;
  retypePassword?: MutableRefObject<any>;
};

const SignUpPageRefContext = createContext<SignUpPageRefs>({});

export function useSignUpPageRefContext() {
  return useContext(SignUpPageRefContext);
}

export function SignUpPageStoreProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(signUpPageReducer, initSignUpPageState);
  const signUpPageRefs: SignUpPageRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    username: useRef(null),
    password: useRef(null),
    retypePassword: useRef(null),
  };

  return (
    <SignUpPageStateContext.Provider value={[state, dispatch]}>
      <SignUpPageRefContext.Provider value={signUpPageRefs}>
        {props.children}
      </SignUpPageRefContext.Provider>
    </SignUpPageStateContext.Provider>
  );
}
