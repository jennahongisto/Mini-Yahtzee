import React from 'react'
import { Text, View } from 'react-native'
import styles from '../style/Style'

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.author}>
        Author: Jenna Hongisto
      </Text>
    </View>
  )
}