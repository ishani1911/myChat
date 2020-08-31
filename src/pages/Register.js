import React,{Component} from 'react';
import Toast from 'react-native-simple-toast';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { userRegister,userAuth } from '../actions/userAction';
import { connect } from 'react-redux';

class Register extends Component{
	constructor(props){
		super(props);
		this.state={
			name : '',
            displayname: '',
			email: '',
			password: '',
			errors: {}
		};
		this.validateForm = this.validateForm.bind(this);
		
	}

	handleName = (text) => {
        this.setState({name: text})
    }
    handleDisplayName = (text) => {
        this.setState({displayname: text})
    }

	handleEmail = (text) =>{
	this.setState({email: text})
	}

	handlePassword = (text) =>{
	this.setState({password: text})
	}

	validateForm(){
	const { errors } = this.state;
	const name = this.state.name;
	const displayname = this.state.displayname;
	const emailaddr = this.state.email;
	const pass = this.state.password;
	const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
	if (name=== '') {
           errors.name = 'Name cannot be empty.';
    } 
    else {
        errors.name = '';
    }
    if (displayname=== '') {
        errors.displayname = 'Display name cannot be empty.';
    }
    else {
        errors.displayname = '';
    }
	if(emailaddr=== ''){
		errors.email = "Email address cannot be empty";
	}
	else if(emailaddr.length > 0 && !reg.test(emailaddr)){
		errors.email = "Please provide correct email address";
	}
	else{
		errors.email = '';
	}
	if(pass===''){
		errors.pass = "Password cannot be empty";
	}
	else if(pass && pass.length<5){
		errors.pass = "Password should be more than 5 characters";
	}
	else{
		errors.pass= '';
	}
	this.setState({ errors })
	if(errors.name==='' && errors.displayname==='' && errors.email==='' && errors.pass===''){
		const userinfo = {
		name: this.state.name,
		displayname: this.state.displayname,
		email: this.state.email,
		password: this.state.password
	}
	this.props.onRegister(userinfo)
}
}

componentDidUpdate(nextProps){
	if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userReducer.userAuth && this.props.userReducer.userAuthSuccess===true){
		this.props.navigation.navigate('HomePage');
	}
}

	render(){
		const { errors } = this.state;
		return(
			<LinearGradient style={styles.linearGradient}
			colors={['#4292B9', '#70C4BC', '#8FD79F', '#B2E782', '#FFF54E']}
          	start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
			
			<Text style ={styles.RegisterText}>Register</Text>

			<Image source = {require('./icon.png')} 
			 style = {{ width: 200, height: 170 ,marginTop:-10}}/>

			<TextInput style = {styles.input}
			underlineColorAndroid = "transparent"
			placeholder = "Name"
			placeholderTextColor = "#000"
			autoCapitalize = "none"
			onChangeText = {this.handleName}/>
			<Text style={styles.errorstyle}>{errors.name}</Text>

			<TextInput style = {styles.input}
			underlineColorAndroid = "transparent"
			placeholder = "Display Name"
			placeholderTextColor = "#000"
			autoCapitalize = "none"
			onChangeText = {this.handleDisplayName}/>
			<Text style={styles.errorstyle}>{errors.displayname}</Text>

			<TextInput style = {styles.input}
			underlineColorAndroid = "transparent"
			placeholder = "Email"
			placeholderTextColor = "#000"
			autoCapitalize = "none"
			onChangeText = {this.handleEmail}/>
			<Text style={styles.errorstyle}>{errors.email}</Text>

			<TextInput style = {styles.input}
			underlineColorAndroid = "transparent"
			placeholder = "Password"
			placeholderTextColor = "#000"
			autoCapitalize = "none"
			onChangeText = {this.handlePassword}/>
			<Text style={styles.errorstyle}>{errors.pass}</Text>

			<TouchableOpacity onPress={() => this.validateForm()}>
        	<LinearGradient
          	start={{ x: 0, y: 0 }}
          	end={{x: 1, y: 1 }}
          	colors={['black','grey']}
          	style={styles.submitButton}>          	
          	<Text style={styles.submitButtonText}>Register</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Text></Text>
      <TouchableOpacity 
				onPress = {
					() => this.props.navigation.navigate('Login')
				}>
				<Text style = {styles.SText}> Already have an account? Sign in </Text>
		</TouchableOpacity>
			
          	</LinearGradient>
		);
	}
}

function mapStateToProps(state) {
	return {
		userReducer: state.userReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onRegister: (userinfo) => dispatch(userRegister(userinfo))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);

const styles = StyleSheet.create({
	linearGradient: {
		alignItems: 'center',
		flex:1,
    	alignItems: 'center',
    	justifyContent: 'center',
    	borderRadius: 2,
    	height: 400,
    	width: '100%',
    },
	RegisterText: {
		fontSize:27,
		fontWeight:'bold',
	},
	input: {
		justifyContent: 'center',
		height: 40,
		borderColor: '#000',
		borderWidth: 1,
		width: '70%',
		padding: 10,
		fontSize: 16,
		lineHeight: 20,
		color: '#000',
		marginBottom: 3,
	},
	submitButton: {
		borderColor: 'black',
		padding: 10,
		alignItems: 'center',
		marginBottom: 15,
		height: 40,
		width: 255,
		marginTop:5,
	},
	submitButtonText: {
		color: 'white',
		fontSize: 18,
		margin: -5,
		fontWeight: 'bold',
	},
	SText: {
		color: 'black',
		fontSize: 18,
		margin: -5,
		fontWeight: 'bold',
		marginTop: 20,
	}
})
