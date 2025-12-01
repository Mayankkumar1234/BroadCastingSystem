import Task from '@/components/Task';
import socket from '@/utils/socket';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

 

const Home = () => {

  const [hover , setHover] = useState("inbox"); 

  const [incomingTask , setIncomingTask] = useState<any[]>([]);
 const [providerId , setProviderId] = useState<any>("");
  const [status , setStatus] = useState("pending")
 

  const handleAccept = (action:string , tid :string)=>{
    if(action === "reject"){
     let allPendingTask = incomingTask.filter((ele)=> ele.tid !== tid);
    //  console.log(action , tid)
      setIncomingTask(allPendingTask)
    }else if(action ==="accept"){
     socket.emit("acceptTask",  {tid , providerId})

    }
  }

  useEffect(()=>{
 const handleInfo = (data: any)=>{
      const {role , id:id} = data;
      if(role === "Provider")
    setProviderId(id)
  // console.log(data.id)
    }
   

    const handleTaskStatus = (data : any)=>{
      // console.log("This is provider section:  ",data)
      setIncomingTask((prev)=>[...prev, data])
    }
    
    const handleUpdatedTasks = (data:any)=>{
      setIncomingTask(data)
    }
    socket.on("role-registration-success", handleInfo)
   socket.on("new-task", handleTaskStatus);
   socket.on("pending-tasks",handleUpdatedTasks )
  },[])
  

  return (
    <View style={ styles.container} >
     <ScrollView>
       <Text style = {styles.welcomeTxt} >Service Provider Page</Text>
          <View style={{
            flex:1,
            justifyContent:"space-around",
            alignContent:"center",
            flexDirection:"row",
            
          }} >
            <Text onPress={()=> setHover("inbox")} style={   styles.section1} >Inbox</Text>
            
            
           
          </View>
          <View style={styles.taskList} >
            {/* {
              pendingTask && pendingTask?.map((ele, idx)=>(
                 <Task data = {ele} />
              ))
            } */}
            {
          incomingTask?.map((ele , idx)=>(
             <Task  title = {ele.title} category={ele.category} tid = {ele.tid} handleAccept = {handleAccept}  key = {idx}  btn1= {  status === "pending" ?"Accept" : "Complete"} btn2= {status === "pending"  ? "Reject":""}  />  
          
          ))
            }
          </View>
     </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    width:"100%"
  },
  welcomeTxt :{
    fontFamily:"arial",
    margin:20,
    fontSize:18,
    paddingBottom:2


  },
  section1:{width:"33%" , borderColor:"black" ,justifyContent:"center" , textAlign:"center" ,borderBottomWidth:2},
  section2:{
    width:"35%"  ,
    justifyContent:"center" , textAlign:"center"
  },
  taskList:{
    justifyContent:"center",
    alignItems:"center",
    width:"100%"
  }
})
export default Home