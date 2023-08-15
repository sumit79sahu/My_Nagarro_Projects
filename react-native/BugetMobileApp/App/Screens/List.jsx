import {View, Text, Button, StyleSheet,ScrollView} from 'react-native';
import { useSelector } from 'react-redux';
const List = () => {
  const data=useSelector(state=>state.bugets)
  return (
    <View style={{paddingTop:30}}>
      <ScrollView>
      {data.map((buget,index)=>(
              <View style={Instyle1.container1} key={index}>
              <View style={Instyle1.heading}>
                <Text style={Instyle1.title1}>Item</Text>
                <Text style={Instyle1.title1}>Planned Amount</Text>
                <Text style={Instyle1.title1}>Actual Amount</Text>
              </View>
              <View>
                <Text style={Instyle1.item}>{buget.name}</Text>
                <Text style={Instyle1.item}>{buget.planned}</Text>
                <Text style={Instyle1.item}>{buget.actual}</Text>
              </View>
            </View>
      ))}
      </ScrollView>
    </View>
  );
};
const Instyle1 = StyleSheet.create({
  container1: {
    padding: 15,
    margin: 30,
    marginBottom:25,
    marginTop:0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#171717',
  },
  title1: {
    fontSize: 22,
    color:'black'
  },
  item: {
    fontSize: 22,
  },
});
export default List;
