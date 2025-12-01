import socket from '@/utils/socket';
import { Formik } from 'formik';
import React from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import RNPickerSelect from "react-native-picker-select";



// 

// const taksSchema = Yup.object().shape({
//   title:Yup.string().required("Title is required"),
//    description:Yup.string().required("Description is required")
// })
 

 const  options = [
     "Snow Removal -Residentail", "House Cleaning- Residential", 
    
  
     "In Home Salon - Men/Kids" , "In Home Salon  -Women",  "Driving instructor -6/6", 
    
   
     "Driving Instructors- Hourly", 
  
     "Academic Helpers - In person", 
    
   
     "Lawn Care", 
   ]

  


const Form = ({id}: {id: string}) => {
 
  const placeholder = {
  label: 'Select your Category...',
  value: null, // Use null as the value for the placeholder
};

  const handleSubmit = ({title,selectValue }: any) => {  
    // console.log( 'Inside the submit function', { title , description }) 
    if(title.length ===0 || selectValue == null){
      Alert.alert("Fields cannot be empty");
      return 
    }
     
      socket.emit("newTask", {id ,title , selectValue })
  }







  return (
     <Formik initialValues={{
      title:"",
      selectValue:""
     }}
      //  validationSchema={taksSchema}
     style={styles.main}
     onSubmit={(values)=>{
      handleSubmit(values) 
      console.log(values)

     }}
     >
      {({handleChange, handleSubmit,setFieldValue , values})=>(
        <View  
        style={styles.formStyle}
        >
        <TextInput
        style={styles.inputStyle}
          placeholder='Title'
          value={values.title}  
          onChangeText={handleChange('title')}
 
        />
           
  
         <RNPickerSelect 
          placeholder={placeholder}
         
           
          value={values.selectValue}
          onValueChange={(val)=>setFieldValue("selectValue" , val)}
          items={options.map((ele, idx)=>({
            label:`${ele}`,
            value:ele
          }))}
         />
        <Button title='Submit' onPress={()=> handleSubmit()}  />
        </View>
      )}
     </Formik>
  )
}

export default Form

const styles = StyleSheet.create({
  main:{
   width:'100%',
   display:'flex', 
   alignItems:'center',
   justifyContent:'center',
    marginTop:20
  },
  formStyle:{
    marginTop:20 ,
    minWidth:'75%',
    padding:10,
    boxShadow:'0 0 10px rgba(0,0,0,0.1)',
    borderRadius:5,
    backgroundColor:'#fff',
    gap:10
  },
      inputStyle:{
        borderWidth:1,
        borderColor:'#ccc',
        padding:10,
        borderRadius:5, 
      },
      inputAreaStyle:{
       borderWidth:1,
        borderColor:'#ccc',
        padding:10,
        borderRadius:5, 
        height:100,
        textAlignVertical:'top'
      }

})