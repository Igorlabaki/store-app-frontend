import React, { useState } from "react";
import { api } from "../../service/axios";
import { GrFormClose } from "react-icons/gr";
import useErrors from "../../hook/useErrors";
import { ErrorAuth } from "../../Interfaces";
import isEmailValid from "../utils/useValidateEmail";
import useAuthContext from "../../hook/useAuthContext";
import { ButtonComponent } from "../utils/button";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { SignInData } from "../../Context/repositories/IAuthContextRepository";

interface AuthFormModalProps {
  handleCloseAuthModal: () => void;
}

export function AuthFormComponent({
  handleCloseAuthModal,
}: AuthFormModalProps) {
  //// Sign in
  const { signIn, signUp } = useAuthContext();
  const { errors, removeError, setError } = useErrors();

  const [authLogin, setAuthLogin] = useState<SignInData>({
    email: "",
    password: "",
    username: "",
  });

  const [hiddenPassword, setHiddenPassword] = useState(true);
  ////

  // states
  const [formMode, setFormMode] = useState("signIn");
  const signInMode = formMode.includes("signIn");
  const signUpMode = formMode.includes("signUp");
  //

  function handleChange(event: any) {
    const field = event.target.name;
    const value = event.target.value;

    setAuthLogin({ ...authLogin, [field]: value });

    if (!value) {
      setError({ field: field, message: `${field} is required` });
    } else if (field === "email" && !isEmailValid(value)) {
      setError({ field: field, message: `This ${field} is invalid` });
    } else {
      removeError(field);
    }
  }

  return (
    <div className="shadow-lg bg-white py-8 px-6 rounded-md relative flex flex-col gap-y-2 min-w-[300px]">
      <GrFormClose
        onClick={handleCloseAuthModal}
        className={
          "absolute right-1 top-1  cursor-pointer rounded-lg hover:bg-gray-200"
        }
      />
      {errors.length > 0 && (
        <div
          className={`
              bg-red-200 flex w-auto justify-center items-start 
              rounded-lg text-[12px] italic font-semibold text-red-600 my-4 py-1 px-3
              animate-openMenu flex-col space-x-2
              `}
        >
          <p>Please correct the error(s) below:</p>
          {errors.map((error: ErrorAuth, index: number) => {
            return <p key={index}>- {error.message}</p>;
          })}
        </div>
      )}
      <div className="flex flex-col animate-openMenu">
        <p className={`text-sm text-gray-800 font`}>Email:</p>
        <input
          className={
            "bg-transparent outline-none bg-blue-50 rounded-md py-1 px-3 "
          }
          name={"email"}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {signUpMode && (
        <div className="flex flex-col animate-openMenu">
          <p className={`text-sm text-gray-800 font`}>Username:</p>
          <input
            className={
              "bg-transparent outline-none bg-blue-50 rounded-md py-1 px-3 "
            }
            name={"Username"}
            onChange={(e) => handleChange(e)}
          />
        </div>
      )}
      <div className="flex flex-col animate-openMenu">
        <p className={`text-sm text-gray-800 font`}>Password:</p>
        <div className="flex justify-between items-center bg-blue-50 rounded-md py-1 px-3">
          <input
            type={hiddenPassword ? "password" : "text"}
            className={"bg-blue-50 outline-none "}
            onChange={(e) => handleChange(e)}
            name={"password"}
          />
          {hiddenPassword ? (
            <AiOutlineEyeInvisible
              onClick={() => setHiddenPassword(false)}
              className={"cursor-pointer"}
            />
          ) : (
            <AiOutlineEye
              onClick={() => setHiddenPassword(true)}
              className={"cursor-pointer"}
            />
          )}
        </div>
      </div>

      <div className="mb-1">
        <div className="flex space-x-1 my-2 text-[11px] ">
          <p className=" font-semibold text-veryDarkGraishCyan pl-1">
            {signInMode
              ? "Are you new here?"
              : "Do you already have an account?"}
          </p>
          <ButtonComponent
            onClick={() => {
              if (signInMode) {
                setFormMode("signUp");
                // errors.splice(0, errors.length);
              } else {
                setFormMode("signIn");
                // errors.splice(0, errors.length);
              }
            }}
            type="button"
            title={signInMode ? "Sign up" : "Sign in"}
            className=" font-semibold text-desaturatedDarkCyan animate-pulse hover:font-bold"
          />
        </div>
        <button
          className="
          bg-black text-sm text-white font-semibold py-2 px-2
          rounded-md shadow-lg hover:shadow-none w-full
        "
          onClick={() => {
            if (signInMode) {
              signIn(authLogin);
            } else {
              signUp(authLogin);
            }
          }}
        />
      </div>
    </div>
  );
}
