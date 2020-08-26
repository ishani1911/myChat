import React,{Component} from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { userList } from '../actions/userAction';
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
		return {
			headerTitle: 'Chats',
			headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Logout"
        color="black"
      />
    ),
		};
	};

	componentDidMount(){
		this.props.onUserList();
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
        <View>
        {users.map((item, index) => {
        return (
        <TouchableOpacity onPress={()=>this.goChat(item._id, item.name)} key={index}>
          <Text style={styles.item}>
          <Text style={{color:'#fff',}}>h</Text>
            <Image source = {require('./user.png')} 
			 style = {{ width: 38, height: 37, marginRight:10}}/>
			 <Text style={{color:'#fff',}}>hi</Text>
			 {item.name}
          </Text>
        </TouchableOpacity>
      )})}
    </View>:null}
    <TouchableOpacity 
				onPress = {
					() => this.logout()
				}>
				<Text style = {styles.SText}> Logout </Text>
		</TouchableOpacity>
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
		backgroundColor:'#000',
	},
	item: {
        fontSize:20,
        height:60,
        padding:0,
        margin:1,
        backgroundColor: '#fff',
    },
    SText: {
		color: 'white',
		fontSize: 18,
		marginTop: 5,
		fontWeight: 'bold',

	}
});
