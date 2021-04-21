import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MatchComponent from './src/pages/matchComponent';

const Stack = createStackNavigator();

export default function App() {

	return (

		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Matches"
					component={MatchComponent}
					options={
						{
							headerStyle: styles.matchesStyle,
							headerTitleAlign:'center',
							headerTitleStyle:styles.titleStyle
						}
					}
				/>
			</Stack.Navigator>
		</NavigationContainer>
		
	);
}

const styles = StyleSheet.create({
	matchesStyle:{
		backgroundColor:'#308efc',
	},
	titleStyle:{
		color:'#fff'
	}
})