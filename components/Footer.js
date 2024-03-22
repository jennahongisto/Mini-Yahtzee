import React from 'react'
import { Text, View } from 'react-native'
import style from '../style/Style'

export default function Footer() {
  return (
    <View style={style.footer}>
      <Text style={style.author}>
        Author: Jenna Hongisto
      </Text>
    </View>
  )
}