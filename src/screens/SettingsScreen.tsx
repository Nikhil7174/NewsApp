import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SettingsScreen = () => {
  return (
    <SafeAreaView className="p-4 bg-white flex-1 dark:bg-neutral-900">
        <View>
            <Text className='text-2xl font-bold'>Settings</Text>
            <Text className='text-base'>Update your preference here</Text>
        </View>
        <View>
            <Text className='p-4 text-base'>Preferences</Text>
            <View>
                <Text className='bg-slate-400 px-4 py-3 rounded-xl'>Country</Text>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default SettingsScreen