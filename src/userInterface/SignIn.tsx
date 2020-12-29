import React from 'react';
import {Button, TextInput, View, StyleSheet, Alert} from 'react-native';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {setIsLoggedInAC} from "../businessLogicLayer/appReducer";
import {Navbar} from "./Navbar";

export const SignIn = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email || !values.password) {
                errors.email = "Email and password fields are required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: (values) => {
            if (values.email === "test@test.org" && values.password === "password") {
                dispatch(setIsLoggedInAC(true))
            } else {
                Alert.alert("Password and login are incorrect")
                formik.resetForm()
            }
        }
    })

    const formikHandleSubmit = () => {
        if (formik.errors.email) {
            Alert.alert(formik.errors.email)
        }
        formik.handleSubmit()
    }

    return (
        <>
            <Navbar title={"Authorization"}/>
            <View style={styles.block}>
                <TextInput style={styles.input}
                           placeholder="Enter your email"
                           onChangeText={formik.handleChange('email')}
                           onBlur={formik.handleBlur('email')}
                           value={formik.values.email}
                />
                <TextInput style={styles.input}
                           placeholder="Enter your password"
                           onChangeText={formik.handleChange('password')}
                           onBlur={formik.handleBlur('password')}
                           value={formik.values.password}
                />
                <Button onPress={formikHandleSubmit} title="Sign in"/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"

    },
    input: {
        width: "80%",
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderBottomColor: "#3949ab",
        fontSize: 18,
        marginBottom: 10,
        padding: 10
    }
})

type FormikErrorType = {
    email?: string
}