import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.scss'
import { AJAX } from '../../shared/utility'

class Auth extends Component {
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'User Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            },
        }
    }

    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );
    }

    submitHandler = async ( event ) => {
        event.preventDefault();
        try {
            const payload = {
                username: this.state.controls.username.value, 
                password: this.state.controls.password.value
            }
            const response = await AJAX('login', 'POST', false, payload)
            console.log(response)
            if (!response || !response.token) throw new Error ('Bad Login')

            localStorage.setItem('token', response.token)
            const expirationDate = new Date(new Date().getTime() + (response.expiration * 1000))
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('username', response.username)
            localStorage.setItem('userId', response.user_id)
            window.location.href = "/"
    
        } catch (error) {
            console.error(error)
        }
    }




    render() {
        const formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form= formElementsArray.map( formElement => (
            <Input
                key={formElement.id} 
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event,formElement.id)} />


        ))

        return (
            <>
            <h1 style={{textAlign: "center"}}>Engineering Project Manager</h1>
            <div className={classes.LoginContainer}>
                <div className={classes.LoginBox}>
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Success"> Login </Button>

                    </form>
                </div>
            </div>
            </>

        )
    }
}

export default Auth