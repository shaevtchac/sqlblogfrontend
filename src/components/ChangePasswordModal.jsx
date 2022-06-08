import { ErrorMessage, Field, Form, Formik } from "formik";
import EmptyModal from "./EmptyModal";
import * as Yup from "yup";

const ChangePasswordModal = ({ handleClose, handleSubmit }) => {
    const initialValues = {
        oldPwd: "",
        newPwd: "",
        repeatNewPwd: "",
    };
    const validationSchema = Yup.object().shape({
        oldPwd: Yup.string().required(),
        newPwd: Yup.string()
            .min(8)
            .max(20)
            .required()
            .oneOf([Yup.ref("repeatNewPwd"), null], "Passwords must match"),
        repeatNewPwd: Yup.string()
            .min(8)
            .max(20)
            .required()
            .oneOf([Yup.ref("newPwd"), null], "Passwords must match"),
    });

    return (
        <EmptyModal modalTitle="Change Password" handleClose={handleClose}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className="form-container">
                    <label>Old password:</label>
                    <ErrorMessage name="oldPwd" component="span" />
                    <Field
                        name="oldPwd"
                        type="password"
                        placeholder="your old password"
                    />
                    <label>New password:</label>
                    <ErrorMessage name="newPwd" component="span" />
                    <Field
                        name="newPwd"
                        type="password"
                        placeholder="your new password"
                    />
                    <label>Repeat new password:</label>
                    <ErrorMessage name="repeatNewPwd" component="span" />
                    <Field
                        name="repeatNewPwd"
                        type="password"
                        placeholder="repeat your new password"
                    />
                    <button type="submit">Change your password</button>
                </Form>
            </Formik>
        </EmptyModal>
    );
};

export default ChangePasswordModal;
