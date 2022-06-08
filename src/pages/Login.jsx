import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "../api/axios";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/auth";

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";
    const initialValues = {
        user: "",
        pwd: "",
    };
    const validationSchema = Yup.object().shape({
        pwd: Yup.string().required("Pole wymagane"),
        user: Yup.string()
            .min(3, "Nazwa użytkownika powinna mieć conajmniej 3 znaki.")
            .max(30, "Nazwa użytkownika powinna mieć maksymalnie 30 znaków.")
            .required("Pole wymagane"),
    });
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(LOGIN_URL, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(response?.data);
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const id = response?.data?.id;
            setAuth({ user: data.user, roles, accessToken, id });

            navigate(from, { replace: true });
        } catch (err) {
            alert(err?.response?.data);
        }
    };

    const togglePersist = () => {
        setPersist((prev) => !prev);
    };
    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

    return (
        <div className="login-page">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="form-container">
                    <label>User:</label>
                    <ErrorMessage name="user" component="span" />
                    <Field name="user" placeholder="(ex. John...)" />
                    <label>Password:</label>
                    <ErrorMessage name="pwd" component="span" />
                    <Field
                        name="pwd"
                        type="password"
                        placeholder="your password"
                    />
                    <button type="submit">Login</button>
                    <div className="persist-check">
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={togglePersist}
                            checked={persist}
                        />
                        <label htmlFor="persist">Trust This Device</label>
                    </div>
                    <h5>
                        Don't have an account?{" "}
                        <Link to={"/register"}>Create one here.</Link>
                    </h5>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
