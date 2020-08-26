import React,{Component} from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image,Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { userList } from '../actions/userAction';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class HomePage extends Component{
	constructor(props){
		super(props);
		this.state = {
			users: []
		};
	}

	static navigationOptions = ({navigation}) => {
		const { params = {} } = navigation.state;
		return {
			headerTitle: 'Chats',
			headerRight: ()=>(
      <TouchableOpacity 
				onPress = {
					() => params.lg()
				}>
				<Text style = {styles.SText}> Logout 
				 <Image source = {require('./logout.png')} 
			 style = {{ width: 30, height: 29, marginRight:10,marginLeft:10}}/></Text>
		</TouchableOpacity>
    ),
		};
	};

	componentDidMount(){
		this.props.onUserList();
		this.props.navigation.setParams({ lg: this.logout });
	}

	goChat = (userid, name) => {
		this.props.navigation.navigate('Chat', {userid: userid, name: name});
	}

	logout = () =>{
		AsyncStorage.removeItem('usercredentials');
		this.props.navigation.navigate('Login');
	}
	
	componentDidUpdate(nextProps){
	if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess===true){
		this.setState({users:this.props.userReducer.userList});
	}
}

	render() {
        const { users } = this.state;
       return (
      <View style={styles.container}>
      {users && users.length>0 ?
        <LinearGradient style={styles.linearGradient}
          	colors={['#4292B9', '#70C4BC', '#8FD79F', '#B2E782', '#FFF54E']}
          	start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
        {users.map((item, index) => {
        return (
        <TouchableOpacity onPress={()=>this.goChat(item._id, item.name)} key={index}>
          <Text style={styles.item}>
          <Text style={{color:'#fff',}}>h</Text>
            <Image source = {require('./user.png')} 
			 style = {{ width: 38, height: 37, marginRight:10}}/>
			 <Text style={{color:'#fff',}}>hi</Text>
			 {item.displayname}
          </Text>
        </TouchableOpacity>
      )})}
     </LinearGradient>:null}
      </View>
    )

    }
}

function mapStateToProps(state) {
	return {
		userReducer: state.userReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onUserList: () => dispatch(userList())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage);

const styles = StyleSheet.create({
	container: {
		flex: 1,  
		paddingTop: 1, 
		backgroundColor:'#DCDCDC',
	},
	item: {
        fontSize:20,
        height:60,
        padding:0,
        marginBottom:2,
        marginTop:2,
        backgroundColor: '#fff',
    },
    SText: {
		color: 'black',
		fontSize: 18,
		marginRight:10,
		marginBottom: 15,
		fontWeight: 'bold',
	},
	linearGradient: {
		flex:1,
    	borderRadius: 2,
    	height: 400,
    	width: '100%',
    },
});
