import dynamic from "next/dynamic";
import { AuthFormComponent } from "./authForm";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiInfoCircle } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import React, { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { TfiDropbox } from "react-icons/tfi";
import { ModalComponent, PropsNewModal } from "../utils/modal";
import { ButtonComponent } from "../utils/button";
import useAuthContext from "../../hook/useAuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { MenuComponent } from "./menu";
import useErrors from "../../hook/useErrors";
import { ErrorAuth, SignInData } from "../../Interfaces";
import isEmailValid from "../utils/useValidateEmail";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { api } from "../../service/axios";
import { setCookie } from "nookies";
import jwt_decode from "jwt-decode";

export default function HeaderComponent() {
  //// Hamburguer Modal
  const [hamburguerModal, setHamburguerModal] = useState(false);

  const HamburguerModalComponent = dynamic<PropsNewModal>(() => {
    return import("../utils/modal").then((comp) => comp.ModalComponent);
  });

  function handleOpenHamburguerModal() {
    setHamburguerModal(true);
  }

  function handleCloseHamburguerModal() {
    setHamburguerModal(false);
  }
  ////

  //// Auth Modal
  const [authModal, setAuthModal] = useState(false);

  function handleOpenAuthModal() {
    return setAuthModal(true);
  }

  function handleCloseAuthModal() {
    setAuthModal(false);
  }
  ////

  //// Context
  const { authUser, signOut, setAuthUser } = useAuthContext();
  ////

  //// router
  const router = useRouter();
  ////

  const { errors, removeError, setError } = useErrors();

  const [authLogin, setAuthLogin] = useState<SignInData>({
    email: "",
    password: "",
    username: "",
  });

  const [hiddenPassword, setHiddenPassword] = useState(true);

  const [formMode, setFormMode] = useState("signIn");

  const signInMode = formMode.includes("signIn");
  const signUpMode = formMode.includes("signUp");

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

  async function signIn({ email, password }: SignInData) {
    if (!email || !password) {
      const errorBody = {
        field: "Fields required",
        message: "All fields required",
      };
      setError(errorBody);
      setTimeout(() => removeError("Fields required"), 2000);
      return;
    }

    const data = await api.post("/auth/login", {
      email,
      password,
    });

    const token = data.data.token;
    const error = data.data.message && data.data;

    if (token) {
      const decoded: any = jwt_decode(token);
      setAuthUser(decoded.user);
      setCookie(undefined, "auth.token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      window.location.reload();
    } else if (error) {
      const errorBody = {
        field: error.status,
        message: error.message,
      };
      setError(errorBody);
      setTimeout(() => removeError(error.status), 2000);
    }
  }

  async function signUp({ email, username, password }: SignInData) {
    if (!email || !password || !username) {
      console.log(email, username, password);
      const errorBody = {
        field: "Fields required",
        message: "All fields required",
      };
      setError(errorBody);
      setTimeout(() => removeError("Fields required"), 2000);
      return;
    }

    const data = await api.post("/auth/register", {
      email,
      username,
      password,
    });

    const token = data.data.token;
    const error = data.data.message && data.data;

    if (token) {
      const decoded: any = jwt_decode(token);
      setAuthUser(decoded.user);
      setCookie(undefined, "auth.token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      window.location.reload();
    } else if (error) {
      const errorBody = {
        field: error.status,
        message: error.message,
      };
      setError(errorBody);
      setTimeout(() => removeError(error.status), 2000);
    }
  }

  console.log(authUser);

  return (
    <header
      className="
        h-[54px] py-[40px] md:px-24 px-8
        bg-default
        flex justify-between items-center
        shadow-pattern
      "
    >
      <div className="w-[103px] h-[24px] relative ">
        <Image
          src={"/images/logoBlack.svg"}
          alt="cart icon"
          layout="fill"
          objectFit="contain"
          className="h-full w-full cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>
      <div className="relative">
        <GiHamburgerMenu
          className="text-primaryFont cursor-pointer  flex md:hidden "
          size={25}
          onClick={() => {
            handleOpenHamburguerModal();
          }}
        />
        <MenuComponent
          handleOpenAuthModal={handleOpenAuthModal}
          isAuthModalOpen={authModal}
          handleOpenHamburguerModal={handleOpenHamburguerModal}
        />
        {hamburguerModal && (
          <HamburguerModalComponent
            onClose={handleCloseHamburguerModal}
            styleExternal={"bg-transparent"}
            styleInternal={
              "bg-white  absolute top-16 md:top-[65px] right-10 md:right-[124px] w-[180px] rounded-b-md md:rounded-tl-md overflow-hidden shadow-pattern animate-openMenu"
            }
          >
            <div className=" ">
              {!authUser && (
                <ButtonComponent
                  title={"Sign in"}
                  className="px-2  text-[16px] hover:bg-blue-50 w-full flex justify-start items-center space-x-2 py-1"
                  icon={<AiOutlineLogin size={20} />}
                  onClick={() => {
                    handleCloseHamburguerModal();
                    handleOpenAuthModal();
                  }}
                />
              )}
              {/* <ButtonComponent
                title={"Products"}
                className="px-2 text-[16px] hover:bg-blue-50 w-full flex justify-start items-center space-x-2 py-1 text-black"
                icon={<TfiDropbox size={25} />}
                onClick={() => {
                  handleCloseHamburguerModal();
                  router.push(`/products`);
                }}
              />
              <ButtonComponent
                title={"About"}
                className="px-2 text-[16px] hover:bg-blue-50 w-full flex justify-start items-center space-x-2 py-1 text-black"
                icon={<BiInfoCircle size={27} />}
                onClick={() => {
                  handleCloseHamburguerModal();
                  router.push(`/about`);
                }}
              /> */}
              {authUser && (
                <ButtonComponent
                  title={"Sign out"}
                  className="px-2 text-[16px] hover:bg-blue-50 w-full flex justify-start items-center space-x-2 py-1"
                  icon={<AiOutlineLogin size={25} />}
                  onClick={() => {
                    signOut();
                  }}
                />
              )}
            </div>
          </HamburguerModalComponent>
        )}
      </div>
      {authModal && (
        <ModalComponent onClose={handleCloseAuthModal}>
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
                value={authLogin.email}
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
                  name={"username"}
                  value={authLogin.username}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            )}
            <div className="flex flex-col animate-openMenu">
              <p className={`text-sm text-gray-800 font`}>Password:</p>
              <div className="flex justify-between items-center bg-blue-50 rounded-md py-1 px-3">
                <input
                  type={hiddenPassword ? "password" : "text"}
                  className={"bg-transparent outline-none "}
                  onChange={(e) => handleChange(e)}
                  name={"password"}
                  value={authLogin.password}
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
              <ButtonComponent
                title="Sign in"
                className="
          bg-black text-sm text-white font-semibold py-2 px-2
          rounded-md shadow-lg hover:shadow-none w-full
        "
                onClick={(e) => {
                  e.preventDefault();
                  if (signInMode) {
                    signIn(authLogin);
                  } else {
                    signUp(authLogin);
                  }
                }}
              />
            </div>
          </div>
        </ModalComponent>
      )}
    </header>
  );
}
