import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { HeadersDefaults } from "axios";
import { useNavigate } from "react-router";
import axiosInstance from "../../../utils/axios/interceptor_jwt_version";
import { useDispatch } from "react-redux";
import { auth } from "../../../_constants";
import { getAuthDetail } from "../../../_common_tasks";

type UserSubmitForm = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
  "Content-Type": string;
  accept: string;
}

const Login: React.FC = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  let navigate = useNavigate();

  let dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: UserSubmitForm) => {
    axiosInstance
      .post(`token/`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setServerErrorMessage("");
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        // Set access token in reducer...
        const authObj = getAuthDetail(res.data.access);
        dispatch({ type: auth.SET_USER_ID, payload: authObj.user_id });
        dispatch({
          type: auth.SET_IS_AUTHENTICATED,
          payload: authObj.is_authenticated,
        });

        axiosInstance.defaults.headers = {
          Authorization: localStorage.getItem("access"),
        } as CommonHeaderProperties;
        navigate("/admin");
      })
      .catch(e => {
        // do nothing

        console.log(e)
      })
      // .catch(function (error) {
      //   console.log( error.status(500).json({ type: 'error', message: error.message }));
      //   setServerErrorMessage(error.response.data.detail);
      // });
  };

  return (
    <section className="form_wrapper">
      <div className="cstm_form">
        <h2 className="sec_title wow fadeInDown">login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>{serverErrorMessage}</div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="text"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="mb-3">
            <button type="submit" className="cstm_btn">
              Sign In
            </button>
            &nbsp; &nbsp;
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-warning float-right"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
