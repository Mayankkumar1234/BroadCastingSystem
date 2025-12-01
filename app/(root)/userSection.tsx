import Form from '@/components/Form';
import socket from '@/utils/socket';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

 


const UserSection = () => {

   const router = useRoute()
   let [userId, setUserId] = useState("")
   let [tasks , setTasks] = useState<any[]>([])
 

  useEffect(()=>{

    // const 
    const handleInfo = (data: any)=>{
      const {role , id:id} = data;
      if(role === "User")
    setUserId(id)
    }

    const handleDisplayTask = (data:any)=>{
      // console.log("Let's see",data)
      setTasks((prev)=>[...prev, data])
    }

    const acceptTaskHander = (data:any)=>{
      // console.log("Inside Accept Task handler", data); 
     
      setTasks(data)
    }
  
    socket.on("role-registration-success", handleInfo)
    socket.on("user-task-updated", handleDisplayTask);
    socket.on("acceptedTaskL", acceptTaskHander)
  },[])
  
  return (
    <View style={styles.container} >
      <ScrollView 
       contentContainerStyle={{
        alignItems:'center', 
        paddingVertical:20,  
        // minHeight:"100%"
       }}
       showsHorizontalScrollIndicator={false}
       showsVerticalScrollIndicator={false}
       style={styles.scrollViewStyle}
      ><Text style={{

        fontSize: 20,
    fontWeight: '700', 
    color: '#34495E', 
    paddingVertical: 8,  
    marginTop: 8,
    marginBottom: 8,
    borderBottomWidth: 1,  
    borderBottomColor: '#ECF0F1',  
    letterSpacing: 0.5
      }} >UserSection</Text>
      <Form  id = {userId} />
      <Text style={styles.text} >Task Details</Text>
       {
         tasks.length>0 ?   tasks?.map((ele, idx)=>(
           <View style={styles.listStyle} 
            key={idx}
        >
          <Text  style={{color:"white", fontWeight:"600"}}  >Title : {ele.title}</Text>
         <View  style={styles.contentStyle} > 
          <Text style={{color:"white", fontWeight:"600"}} >Status: {ele.status}</Text>
          <Text style={{color:"white", fontWeight:"600"}} >Accepted By: {ele.acceptedBy== null? "none": ele.acceptedBy.length>12 ? ele.acceptedBy.split("-")[0] : ele.acceptedBy}</Text>
          </View>

      </View>
        )): <Text 
          style={{
            color:"gray",
          margin:80
          }}
        >
          No Task to Show
        </Text>
       }
      </ScrollView>

    </View>
  )
}

export default UserSection

const styles = StyleSheet.create({
  container:{
    
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    minHeight:'100%',
    flex:1

  },
  text: {
    fontSize:20,
    fontWeight:'bold',
    marginVertical:10,
    marginTop:40,
  
  },
  listStyle:{
        minWidth:'60%',   
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#4a91a1',
        padding:20,
        
        borderRadius:10,
        marginBottom:20 , 
      },
      contentStyle:{ 
        width:"100%",
        alignItems:'center',
        justifyContent:'center',
        gap:10
      },
      scrollViewStyle:{
        width:"100%",
        flex:1
      }

})