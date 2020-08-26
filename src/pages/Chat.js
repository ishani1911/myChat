import React,{Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,Button} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { chatInsert, chatList } from '../actions/chatAction';
import SocketIOClient from 'socket.io-client';
import { SERVERURL } from '../../config';

type Props = {
	name?: string,
};

class Chat extends React.Component<Props>{

	static navigationOptions = ({ navigation }) => ({
		title: (navigation.state.params || {}).name || 'Chat!',
	});

	state = {
		userid: this.props.navigation.state.params.userid,
		messages: [],
	};

	componentDidMount(){
		this.socket = SocketIOClient('http://192.168.1.5:8082/');
		const data = {
			receiver_id: this.props.navigation.state.params.userid,
			sender_id: this.props.userReducer.userAuth._id
		};
		this.socket.emit('getMessage', data);
		this.socket.on('receiveMessage', (chatlist) => {
			if(chatlist){
				this.setState({messages: chatlist});
			}
		});
	}

	componentDidUpdate(nextProps){
		if(this.props.chatReducer && this.props.chatReducer.chatList && this.props.chatReducer.chatList!==nextProps.chatReducer.chatList && this.props.chatReducer.chatListSuccess===true){
			this.setState({
				messages: this.props.chatReducer.chatList
			})
		}
	}

	onSend(messages = []){
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}))
	}

	submitChatMessage(messages = []) {
		const date = new Date();
		this.onSend(messages)
		let details = {
			user:{
				_id: this.props.userReducer.userAuth._id
			},
			receiver_id: this.state.userid,
			sender_id: this.props.userReducer.userAuth._id,
			chatdate: date,
			text: messages && messages[0] && messages[0].text
		}
		this.socket.emit('chatMessage',details);
	}

	renderBubble = (props) => {
		return (<Bubble {...props}
			textStyle = {{
				right: {
					color: '#000000',
					fontWeight: 'bold'
				},
				left: {
					color: '#000000',
					fontWeight: 'bold',
				},
			}}
			timeTextStyle = {{
				right: {
					color: '#000000',
					fontWeight: 'bold'
				},
				left: {
					color: '#000000',
					fontWeight: 'bold'
				},
			}}
			wrapperStyle = {{
				left: {
					backgroundColor: '#FFFF99',
				},
				right: {
					backgroundColor: '#ADD8E6',
				},
			}} />
		);
	}

	render(){
		return(
			<View style = {{ flex:1, marginTop: 0, backgroundColor: '#fff' }}>
			<GiftedChat
				messages = {this.state.messages}
				onSend = {messages => this.submitChatMessage(messages)}
				renderBubble = {this.renderBubble}
				user = {{
					_id: this.props.userReducer.userAuth._id,
				}}
			/>
		</View>
		)
	}
}

function mapStateToProps(state) {
	return{
		chatReducer: state.chatReducer,
		userReducer: state.userReducer
	};
}

function mapDispatchToProps(dispatch){
	return {
		onChatMessage: (chatMessage) => dispatch(chatInsert(chatMessage)),
		onGetMessage: (data) => dispatch(chatList(data))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Chat);

const styles = StyleSheet.create({
	})

