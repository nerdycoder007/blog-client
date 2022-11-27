import Link from "next/link";
import React, { useContext, useState } from "react";
import userLogin, { USER_LOGIN } from "../graphql/mutation/login";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
export default function LoginPage() {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const { setAuthData } = useContext(AuthContext);
  const [userLogin, { loading, error }] = useMutation(USER_LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors);
    },
  });
  console.log("EXtracted error", error);
  async function handleLogin(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userLoginInput = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const { email, password } = userLoginInput;
    if (!email && !password) {
      console.log("Both fields are required required");
    }
    try {
      const result = await userLogin({ variables: userLoginInput });
      if (result.errors) {
        setErrorMsg(result.errors.message);
        return;
      }
      const { accessToken, username, id } = result.data.userLogin;
      console.log(result.data.userLogin);
      dispatch(login({ accessToken, username, id }));
      push("/");
    } catch (error) {
      return;
    }
  }

  return (
    <section>
      <div className="container h-full p-12">
        <div className="flex h-full flex-wrap items-center justify-center text-gray-800">
          <div className="flex flex-col items-center bg-white p-4 shadow-md dark:bg-slate-800 ">
            <h1 className="pb-4  text-center  font-content text-3xl dark:text-slate-200">
              Login
            </h1>
            <p className="my-2 dark:text-slate-200">
              Login to already existing account
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none dark:border-gray-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-gray-300"
                  placeholder="Email address"
                />
              </div>

              <div>
                <input
                  required
                  type="password"
                  name="password"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none dark:border-gray-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-gray-300 "
                  placeholder="Password"
                />
              </div>
              <p className="my-3 text-sm text-red-600 dark:text-red-400">
                {errorMsg}
              </p>

              <div className="mb-6 flex items-center justify-between">
                <a
                  href="#!"
                  className="text-blue-600 transition duration-200 ease-in-out hover:text-blue-700 focus:text-blue-700 active:text-blue-800"
                >
                  Forgot password?
                </a>
                <Link href="/register">
                  <p className="cursor-pointer text-blue-600 transition duration-200 ease-in-out hover:text-blue-700 focus:text-blue-700 active:text-blue-800">
                    Register
                  </p>
                </Link>
              </div>

              <button
                onClick={() => console.log("Button clicked")}
                type="submit"
                className={`${
                  loading ? "loading" : ""
                } btn  w-full rounded bg-blue-600  py-3 font-heading text-sm font-semibold uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg`}
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                {loading ? "" : "LOGIN"}
              </button>
            </form>
            {/* <p className="font-xl my-2 text-center dark:text-gray-200">OR</p>
            <Button onClick={() => signInWithGoogle()}>
              <Image height="18px" width="18px" src={GoogleSVG} />
              login with google
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
