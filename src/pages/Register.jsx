import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "../api/axios";

const Register = () => {
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, "Nazwa użytkownika powinna mieć conajmniej 8 znaków.")
            .max(20, "Nazwa użytkownika powinna mieć maksymalnie 20 znaków.")
            .required("Pole wymagane"),
        username: Yup.string()
            .min(3, "Nazwa użytkownika powinna mieć conajmniej 3 znaki.")
            .max(30, "Nazwa użytkownika powinna mieć maksymalnie 30 znaków.")
            .required("Pole wymagane"),
    });
    const onSubmit = (data) => {
        axios.post("/register", data).then(() => {});
        navigate(from, { replace: true });
    };
    return (
        <div className="register-page">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="form-container">
                    <label>User:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field name="username" placeholder="(ex. John...)" />
                    <label>Password:</label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        name="password"
                        type="password"
                        placeholder="your password"
                    />
                    <button type="submit">Register</button>
                    <button onClick={() => navigate(from, { replace: true })}>
                        Cancel
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default Register;
