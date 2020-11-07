import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import UserDataService from './services/user.service'



export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.onDataChange = this.onDataChange.bind(this);


        this.state = {
            users: {},
        };

        this.unsubscribe = undefined;
    }

    componentDidMount = async () => {
        this.unsubscribe = UserDataService.getAll().onSnapshot(this.onDataChange);
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    onDataChange(items) {
        let users = [];

        items.forEach((item) => {
            users[item.id] = item.data();
            if(users[item.id]['need']){
                console.log("TRUE")
                //change col to green
            }
            else{
                console.log("FALSE")
                //change col to grey
            }


        });

        this.setState({
            users: users
        });
    }


    render(){
        const users = this.state.users;

        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={"dashboard"}

            >
                {
                    users &&
                        Object.keys(users).map((key,i) =>(

                            <div  className={"row b "+
                            (users[key]['need'] ? "active" : "")}>
                            <div className={"col-md-3 innerText "} >
                                {users[key]['name']}
                            </div>
                                <div className={
                                    "col-md-9 innerText "
                                }>
                                    {(users[key]['need']) ?
                                        users[key]['item']
                                        :
                                        ""
                                    }

                                </div>
                            </div>

                        ))
                }


            </Grid>
        );
    }

}