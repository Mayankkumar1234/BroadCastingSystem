import { Stack } from 'expo-router'
import React from 'react'



const StackLayout = () => {
  return <Stack >
    <Stack.Screen
        name="index"
        options={{
          title: "index",
          headerShown: false,
         
        }}
      />
  </Stack>
}

export default StackLayout
