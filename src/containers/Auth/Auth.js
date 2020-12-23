import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.scss'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import { checkValidity } from '../../shared/utility'

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

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
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
            this.props.onSubmitLogin(payload)
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

const mapDispatchToProps = dispatch => {
    return {
        onSubmitLogin: (payload) => dispatch(actions.loginStart(payload))
    }
}

export default connect(null, mapDispatchToProps)(Auth)