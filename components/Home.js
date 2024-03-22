import React from 'react'
import { useState } from 'react'
import { Keyboard, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Header from './Header'
import Footer from './Footer'
import style from '../style/Style'
import { 
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS
} from '../constants/Game'

export default function Home({navigation}) {

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true)
            Keyboard.dismiss()
        }
    }

  return (
    <>
      <Header />
      <ScrollView style={style.container}>
        <MaterialCommunityIcons
          name='information'
          size={90}
          color='#989f99' />
        {!hasPlayerName ?
        <>
          <Text style={style.gameinfo}>For scoreboard enter player name:</Text>
          <TextInput 
            onChangeText={setPlayerName} 
            autofocus={true}
            style={style.playerName} />
          <Pressable
            onPress={() => handlePlayerName(playerName)}
            style={style.button}>
              <Text style={style.buttonText}>OK</Text>
          </Pressable>
        </>
        :
        <>
          <Text style={style.titles}>Rules of the game</Text>
          <Text multiline='true' style={style.gameinfo}>
          THE GAME: Upper section of the classic Yahtzee
          dice game. You have {NBR_OF_DICES} dices and
          for the every dice you have {NBR_OF_THROWS}
          throws. After each throw you can keep dices in
          order to get same dice spot counts as many as
          possible. In the end of the turn you must select
          your points from {MIN_SPOT} to {MAX_SPOT}.
          Game ends when all points have been selected.
          The order for selecting those is free.
          </Text>
          <Text multiline='true' style={style.gameinfo}>POINTS: After each turn game calculates the sum
          for the dices you selected. Only the dices having
          the same spot count are calculated. Inside the
          game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again.</Text>
          <Text multiline='true' style={style.gameinfo}>GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points is the limit of
          getting bonus which gives you {BONUS_POINTS} points more.</Text>
          <Text style={style.titles}>Good luck, {playerName}!</Text>
          <Pressable
            onPress={() => navigation.navigate(
              'Gameboard', {player: playerName})}
            style={style.button}>
            <Text style={style.buttonText}>PLAY</Text>
          </Pressable>
        </>
        } 
      </ScrollView>
      <Footer />
    </>
  )
}