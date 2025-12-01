import socket from "@/utils/socket";
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";


  const  options = [{
    label:"Join as a User", 
    role:"user"
  },{
    label:"Join as a Service Provider", 
    role:"provider"
  }]

 

export default function Index() {

  const navigation = useNavigation<any>()
  const router = useRouter();
  const id = uuid.v4();
  // console.log(userId)
  const [role, setRole] = useState({
    role: "", 
  });
const placeholder = {
  label: 'Select your role...',
  value: null, // Use null as the value for the placeholder
};
 

  const handleSeriveRoute= (role: string)=>{
    console.log("Selected Role:", role);
     if(role==="user"){
      
      router.push("/(root)/userSection");

      socket.emit("register-role", {role:"User", id:id})
     }else if(role==="provider"){
      router.push("/(root)/Provider")
       socket.emit("register-role", {role:"Provider", id:id})
     }else{
      
   Alert.alert("Select a role to proceed" );
     }
  }

  useEffect(()=>{

    socket.connect()

const onConnect = ()=>{
  // console.log("User connect", socket.id)
}

const onDisconnect = ()=>{
  // console.log("A user disconnected...")
}

const onConnectError = (err: any)=>{
      // console.log("Socket connect_error:", err.message , err);


}
const onError = (err:any)=>{
 console.log("Error", err)
}


  socket.on("connect", onConnect)
  
    socket.on('disconnect', onDisconnect);
    
  socket.on("connect_error", onConnectError);
  socket.on("error", onError)
  },[])

  return (
 
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      
      <View style={styles.section}>
        <Text style={styles.maintext} >Welcome to Helping Hand</Text>
        <Text style={styles.sectionTitle}>Join Us</Text>

        <View style={styles.sectionBody}>
         
          <RNPickerSelect
          placeholder={placeholder}
          
            value={role.role || null}
            onValueChange={(role) => {
              // console.log(role)
              setRole({ role }); 
              
          }}
            items={options.map(({ label, role }) => ({
              label: `${label})`,
              value: role,
            }))}
          />
           <Button
          onPress={() => handleSeriveRoute(role.role)}
          title="Enter"
          color="#841584"  
        />
        </View>
      </View> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  maintext:{
  fontWeight: "800",  
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 48,
    paddingLeft: 12,
    fontSize: 26, 
    color: "#2C3E50",  
    textShadowColor: 'rgba(0, 0, 0, 0.4)',  
    textShadowOffset: { width: 2, height: 2 },  
    textShadowRadius: 3,  
  
  },
  container: {
        marginTop: 50,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#333',
    },
  section: {
    // marginBottom: 25,
    paddingHorizontal: 20,
    flex:1,
    justifyContent:"center", 
     position:"absolute",
      width:"100%",
      top:96, 
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    paddingLeft:8
  },
  sectionBody: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
})