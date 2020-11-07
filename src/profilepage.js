import React from "react";
import { UserContext } from "./providers/UserProvider";
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import UserDataService from './services/user.service'


class ProfilePage extends React.Component {
    static contextType = UserContext;

    constructor(props){
        super(props);
        this.state = {
            name: "",
            item: "",
            need: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        this.setState({
            user: this.context
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        let data ={
            [name]: value
        };
        UserDataService.update(this.state.user['uid'], data)
            .then(() => {

            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const user = this.state.user;
        if(user){
            return (

                <Container maxWidth="sm">
                    <Paper style={{height: '100vh',
                        paddingTop: '55%', backgroundColor:'rgb(180 212 236 / 66%)'}} elevation={3} >

                        <Typography variant="h3" gutterBottom>
                            Hi {user['name']},
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Do you need something?
                        </Typography>
                        <div className={"row"} style={{marginLeft: '46%',
                            marginTop: '8%'}}>
                        <FormGroup row>
                            <FormControlLabel
                                control={<Switch checked={this.state.need} onChange={this.handleInputChange} name="need" size={"large"}/>}
                                color="primary"

                            />
                        </FormGroup>
                        </div>
                        {this.state.need &&
                            <>
                        <Typography variant="h6" gutterBottom>
                            What do you want?
                        </Typography>
                        <div className={"a"}>
                            <TextField
                            id="standard-basic"
                            type="text"
                            label="Enter it here"
                            name="item"
                            value = {this.state.item}
                            onChange={this.handleInputChange}/>
                            </div>
                        </>
                        }

                    </Paper>
                </Container>
            )
        }else{
            return (
                <div>
                    shrug
                </div>
            )
        }

    };
}

export default ProfilePage;