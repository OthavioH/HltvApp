import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Dimensions,StatusBar, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/global';

import api from '../services/api';


export default function MatchComponent(){
	const width = Dimensions.get('window').width;
	const [data,setData] = useState([]);

	useEffect(() => {
		(async function getAllData(){
			await api.get('/get_matches')
			.catch((error)=>{
				return console.log(error.response.data.error);
			})
			.then((response)=>{
				if(response.status === 200){
					setData(response.data.allData);
				}
			})
		})();
	}, [width])
	
	async function findMatchScore(matchID){
		await api.get(`/set_match/${matchID}`)
		.catch((error)=>{
			
			return console.log(error.response.data.error)
		})

		console.log(matchID);
	}

    return (
		<SafeAreaView style={globalStyles.container}>
				<FlatList style={{width:width, paddingTop:20,}} key={1}
					data={data}
					renderItem={({item,i}) => (
						<TouchableOpacity key={it=>it.index_id.toString()} style={styles.item} onPress={()=>{findMatchScore(item.id)}}>
							<View style={styles.teamItem}>
							<View style={styles.rowStyle}>
									<Text style={{fontSize:20}}>    </Text>
								</View>
								<View style={styles.rowStyle}>
									<Text style={{fontSize:20}}>{(item.team1) ?item.team1.name:'TBA'}</Text>
								</View>
								<View style={styles.rowStyle}>
									<Text style={{fontSize:20}}>vs</Text>
								</View>
								<View>
									<Text style={{fontSize:20}}>{(item.team2) ?item.team2.name:'TBA'}</Text>
								</View>
								<View>
									<Text style={{fontSize:11}}>{item.format.toUpperCase()}</Text>
								</View>
							</View>
							<View style={styles.scoreItem}>
								<Text style={{flex:1,fontSize:18}}>{item.live===false?'🌑':'🟢'}</Text>
							</View>
						</TouchableOpacity>
					)}
				/>
		<StatusBar backgroundColor="#308efc" barStyle="light-content" translucent={true} />
		</SafeAreaView>
        
    );
}

const winColor = '#2ee609';
const lostColor = '#e60909';

const styles = StyleSheet.create({
    container: {
		alignSelf:'center',
		flex:6,
		alignItems: 'center',
		marginTop: 50,
		marginBottom: 40,
    },
    item: {
    	flex:1,
		flexDirection:'row',
		backgroundColor:'#fff',
      	padding: 10,
      	fontSize: 18,
		borderBottomWidth:2,
		borderBottomColor:'#e6e6e6',
    },
	teamItem:{
		flex:8,
		borderRightWidth:1,
		borderRightColor:'#000',
		marginRight:10,
		flexDirection:'column',
	},
	scoreItem:{
		flex:1,
	},
	textStyle:{
		color:'#000',
	},
	mainContainer:{
		alignSelf:'center',
		flex:1,
		flexDirection:'column'
	  },
});