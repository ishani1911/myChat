import React,{Component} from 'react';
import { Text, TouchableOpacity, StyleSheet, View,Image} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { userLogin,userAuth } from '../actions/userAction';
import { connect } from 'react-redux';

class Splash extends Component{
	constructor(props){
		super(props);
		this.state = {
        }
	}

	componentDidMount(){
		this.props.userAuth()
	}

	componentDidUpdate(nextProps){
	if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userReducer.userAuth && this.props.userReducer.userAuthSuccess===true){
            this.props.navigation.navigate('HomePage');
	}
	else{
            this.props.navigation.navigate('Login');
	}
}

	render(){
		return(
			<LinearGradient style={styles.linearGradient}
          	colors={['#4292B9', '#70C4BC', '#8FD79F', '#B2E782', '#FFF54E']}
          	start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
			
			<Text style = {styles.titleText}>
			 Welcome to MyChat!</Text>
			
			<Image source = {require('./icon.png')} 
			 style = {{ width: 200, height: 200 }}/>
			
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
)(Splash);

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
    titleText: {
		margin: 0,
		fontSize: 30,
		alignItems: 'center',
		fontWeight: 'bold',
	},
});
