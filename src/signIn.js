import React, {useState} from "react";
import { auth } from "./firebase";
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        },
    },
}));

const SignIn = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
        });
    };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper style={{height: '100vh',
                paddingTop: '55%', backgroundColor:'rgb(180 212 236 / 66%)'}} elevation={3} >
                <form className={classes.root} noValidate autoComplete="off">
                    {error !== null && <div className = "">{error}</div>}

                    <div className={"a"}>
                        <TextField
                        id="standard-basic"
                        type="email"
                        label="Email"
                        name="userEmail"
                        value = {email}
                        onChange = {(event) => onChangeHandler(event)}/>
                    </div>

                    <div className={"a"}>
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            name="userPassword"
                            value = {password}
                            onChange = {(event) => onChangeHandler(event)}
                        />
                    </div>

                    <Button variant="contained" style={{marginTop:'20%'}} onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};
export default SignIn;