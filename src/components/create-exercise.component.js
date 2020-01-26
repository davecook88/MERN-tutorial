import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);
        this.state= {
            username:'',
            exercise:'',
            duration:0,
            date: new Date(),
            users:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then((res) => {
                if (res.data.length < 1) return;
                let users = res.data.map((u) => u.username);
                this.setState({
                    users: users,
                    username: users[0]
                })
            })
            .catch(err => console.log(err));        
    }

    onChangeUserName = (e) =>{
        this.setState({
            username:e.target.value
        });
    }

    onChangeDescription = (e) =>{
        this.setState({
            description:e.target.value
        });
    }

    onChangeDate = (date) =>{
        this.setState({
            date:date
        });
    }

    onChangeDuration = (e) =>{
        this.setState({
            duration:e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            date: this.state.date,
            duration: this.state.duration
        }

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(`Error: ${err}`));

        console.log(exercise);
        window.location = '/';
    }
    render() {
        return(
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <select ref="user-input"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}>
                                {
                                    this.state.users.map((user) => {
                                        return <option
                                            key={user}
                                            value={user}>{user}
                                            </option>
                                    })
                                }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input ref="user-input"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Duration</label>
                        <input ref="user-input"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <div>
                            <DatePicker 
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>                        
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit" 
                            value="Create Exercise Log" 
                            className="btn btn-primary">
                        </input>
                    </div>
                </form>
            </div>
        )
    }
}