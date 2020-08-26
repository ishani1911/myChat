import React,{Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { userLogin,userAuth } from '../actions/userAction';
import { connect } from 'react-redux';

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			email: '',
			password: '',
			errors: {}
		};
		this.validateForm = this.validateForm.bind(this);
	}

handleEmail = (text) =>{
	this.setState({
		email: text
	})
}

handlePassword = (text) =>{
	this.setState({
		password: text
	})
}

componentDidMount () {
	this.props.userAuth()
}

validateForm(){
	const { errors } = this.state;
	const emailaddr = this.state.email;
	const pass = this.state.password;
	const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
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
	this.setState({errors});
	if(errors.email==='' && errors.pass===''){
		const userinfo = {
			email: this.state.email,
			password: this.state.password
		}
		this.props.onLogin(userinfo)
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
			
			<Text style = {styles.titleText}>
			 Welcome to MyChat!</Text>
			
			<Image source = {require('./icon.png')} 
			 style = {{ width: 200, height: 200 }}/>
			
			<Text style ={styles.loginText}>Login</Text>
			<Text></Text>
			<TextInput style = {styles.input}
			underlineColorAndroid = "transparent"
			placeholder = "Email"
			placeholderTextColor = "#000"
			autoCapitalize = "none"
			onChangeText = {this.handleEmail}/>
			<Text style={[styles.errorstyle]}>{errors.email}</Text>

			<TextInput style = {styles.input}
			underlineColorAndroid = "transparent"
			placeholder = "Password"
			placeholderTextColor = "#000"
			autoCapitalize = "none"
			backgroundColor = "transparent"
			onChangeText = {this.handlePassword}/>
			<Text style={[styles.errorstyle]}>{errors.pass}</Text>

			<TouchableOpacity onPress={() => this.validateForm()}>
        	<LinearGradient
          	start={{ x: 0, y: 0 }}
          	end={{x: 1, y: 1 }}
          	colors={['black','grey']}
          	style={styles.submitButton}>          	
          	<Text style={styles.submitButtonText}>Submit</Text>
        </LinearGradient>
      </TouchableOpacity>
		<TouchableOpacity 
				style = {styles.SButton}>
				<Text style = {styles.SText}> Forgot Password </Text>
		</TouchableOpacity>
		
		<Text></Text>
		<Text></Text>
		<Text></Text>
		<Text></Text>
		<TouchableOpacity 
				onPress = {
					() => this.props.navigation.navigate('Register')
				}>
				<Text style = {styles.SText}> Dont have an account yet? Sign up </Text>
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
		onLogin: (userinfo) => dispatch(userLogin(userinfo)),
		userAuth: ()=> dispatch(userAuth())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
	
	titleText: {
		margin: 0,
		fontSize: 30,
		alignItems: 'center',
		fontWeight: 'bold',
	},
	loginText: {
		fontSize:27,
		fontWeight:'bold',
		margin: -5,
	},
	SButton: {
		margin:10,
	},
	linearGradient: {
		alignItems: 'center',
		flex:1,
    	alignItems: 'center',
    	justifyContent: 'center',
    	borderRadius: 2,
    	height: 400,
    	width: '100%',
    },
	input: {
		justifyContent: 'center',
		height: 45,
		borderColor: '#000',
		borderRadius: 0,
		borderWidth: 1,
		width: 277,
		padding: 10,
		fontSize: 16,
		lineHeight: 20,
		color: '#000',
	},
	submitButton: {
		borderRadius:0,
		borderColor: 'black',
		padding: 10,
		alignItems: 'center',
		margin: 0,
		height: 40,
		width: 277,
	},
	GButton:{
		width: '70%',
		alignItems: 'center',
		height: 40,
		padding: 10,
		margin: 15,
		backgroundColor: '#bd1717',
		borderRadius: 10,
	},
	FButton:{
		width: '70%',
		alignItems: 'center',
		height: 40,
		padding: 10,
		margin: 0,
		backgroundColor: '#3d8bd9',
		borderRadius: 10,
	},
	submitButtonText: {
		color: 'white',
		fontSize: 18,
		margin: -5,
		fontWeight: 'bold',
	},
	GText: {
		color: 'white',
		fontSize: 18,
		margin: -5,
		fontWeight: 'bold',
	},
	FText: {
		color: 'white',
		fontSize: 18,
		margin: -5,
		fontWeight: 'bold',
	},
	SText: {
		color: 'black',
		fontSize: 18,
		marginTop: 5,
		fontWeight: 'bold',

	}
})

