import { Button } from '@react-navigation/elements';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

 interface TaskProps {
  title: string;
  category: string;
  tid:string;
  btn1:string;
  btn2:string,
  key:number;
  handleAccept: (action: string, tid: string) => void;
}

const Task = ({title, category ,tid, handleAccept ,  btn1 , btn2}:TaskProps) => {
 
  return (
    <View style={styles.mainTask} >
      <Text style={{color:"white", fontWeight:"600" , fontSize:16}} >{title}</Text>
       <Text style={{color:"white", fontWeight:"600" }} >{category}</Text>
       <View style={styles.btns} >
        <Button  onPress= {()=> handleAccept("accept", tid)} color='white' >{btn1}</Button>
        <Button  onPress= {()=> handleAccept("reject", tid)} color='white' >{btn2}</Button>
       </View>
    </View>
  )
}

export default Task

const styles = StyleSheet.create({
  mainTask:{
    width:"80%",
    backgroundColor:"#6b7050",
    color:"white",
    justifyContent:"center",
    alignItems:"center",
    flex:1,
    borderRadius:16,
    minHeight:98,
    flexDirection:"column",
    padding:6,
    paddingLeft:6,
    marginTop:8
  },
btns:{
  justifyContent:"center",
  flex:1,
  flexDirection:"row",
  alignItems:"center",
  gap:24,
  
}
})


// elit. Natus facere doloribus ad cumque totam culpa voluptates minima velit ea, rerum accusamus deserunt nihil deleniti perspiciatis voluptatum! Minus delectus a totam