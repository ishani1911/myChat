import React from 'react';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './pages/Login';
import {Button} from 'react-native';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Splash from './pages/Splash';

const AuthStackNavigator = createStackNavigator({
	Splash:{
		screen:Splash,
	},
	Login:{
		screen:Login,
	},
	Register:{
		screen:Register,
	},
},{headerMode: 'none'});

 
const AppStackNavigator = createStackNavigator({
	HomePage: {
		screen: HomePage,
	},
	Chat: {
		screen: Chat,
	},
});

const SwitchNavigator = createSwitchNavigator(
	{
		AuthLoading: AuthStackNavigator,
		App: AppStackNavigator
	},{
		initialRouteName: 'AuthLoading',
	},
);

const Navigation = createAppContainer(SwitchNavigator);

export default Navigation;
