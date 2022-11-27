import Link from "next/link";
import React, { useState } from "react";
import Input from "../components/utils/Input";
import { REGISTER_USER } from "../graphql/mutation/registerMutation";
import { useRouter } from "next/router";
import supabase from "../supabase/client";
import { useMutation } from "@apollo/client";
function register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [userRegister, { loading }] = useMutation(REGISTER_USER);
  const { push } = useRouter();
  async function handleLogin(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userRegisterInput = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };
    const { username, email, password, confirmPassword } = userRegisterInput;
    if (
      username &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      try {
        const result = await userRegister({ variables: userRegisterInput });
        push("/welcome");
      } catch (error) {
        const serverError = error?.response?.errors[0]?.message;
        console.log(serverError);
        if (serverError) {
          setErrorMsg(serverError);
        }
      }
    } else {
      console.log("Missing value or password doesn't match");
    }
  }
  return (
    <section>
      <div className="container h-full  p-8 pb-0">
        <div className="flex h-full flex-wrap items-center justify-center text-gray-800">
          <div className="bg-white p-4 shadow-md dark:bg-slate-800">
            <h1 className="  pb-4  text-center text-3xl dark:text-slate-200">
              Register
            </h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-2">
              <div className="">
                <Input
                  required
                  type="text"
                  name="username"
                  className={"text-md"}
                  placeholder="Username"
                />
              </div>

              <div>
                <Input required type="email" name="email" placeholder="Email" />
              </div>
              <div>
                <Input
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div>
                <Input
                  required
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
              <p className=" text-sm text-red-600">{errorMsg}</p>
              <div className="mb-6 flex items-center justify-between">
                <Link href="/login">
                  <p className="cursor-pointer text-blue-600 transition duration-200 ease-in-out hover:text-blue-700 focus:text-blue-700 active:text-blue-800">
                    Already have an account? Login
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
                {loading ? "" : "REGISTER"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default register;
