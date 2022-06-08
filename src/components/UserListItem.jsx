import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const UserListItem = ({ user, handleDelete, handleEditSubmit }) => {
    const [editModeActive, setEditModeActive] = useState(false);
    const initialValues = {
        username: user.username,
        password: "",
        roles: [...user.Roles.map((role) => role.value.toString())],
    };
    const validationSchema = Yup.object().shape({
        password: Yup.string().min(8).max(20),
        username: Yup.string().min(3).max(30),
    });

    return (
        <div className="user-list-item">
            <Formik
                initialValues={initialValues}
                onSubmit={(data) => handleEditSubmit({ id: user.id, ...data })}
                validationSchema={validationSchema}
            >
                <Form className="user-list-form">
                    <div>
                        <label>User:</label>
                        <div className="user-list-form__field-wrapper">
                            <Field
                                disabled={!editModeActive}
                                name="username"
                                placeholder="(ex. John...)"
                            />
                            <ErrorMessage name="username" component="span" />
                        </div>
                    </div>
                    <div>
                        <label>Password:</label>
                        <div className="user-list-form__field-wrapper">
                            <Field
                                disabled={!editModeActive}
                                name="password"
                                type="password"
                                autocomplete="off"
                            />
                            <ErrorMessage name="password" component="span" />
                        </div>
                    </div>
                    <div>
                        <h6>Roles</h6>
                        <div role="group" className="role-checkboxes">
                            <label>
                                <Field
                                    disabled={!editModeActive}
                                    type="checkbox"
                                    name="roles"
                                    value="2001"
                                />
                                User
                            </label>
                            <label>
                                <Field
                                    disabled={!editModeActive}
                                    type="checkbox"
                                    name="roles"
                                    value="1984"
                                />
                                Editor
                            </label>
                            <label>
                                <Field
                                    disabled={!editModeActive}
                                    type="checkbox"
                                    name="roles"
                                    value="5150"
                                />
                                Admin
                            </label>
                        </div>
                    </div>
                    <div className="flex-center-gap">
                        {user.id !== 3 && !editModeActive && (
                            <button onClick={() => setEditModeActive(true)}>
                                Edit
                            </button>
                        )}
                        {editModeActive && (
                            <button onClick={() => setEditModeActive(false)}>
                                Cancel
                            </button>
                        )}
                        {editModeActive && (
                            <button disabled={!editModeActive} type="submit">
                                Submit
                            </button>
                        )}
                        {editModeActive && (
                            <button
                                disabled={!editModeActive}
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default UserListItem;
