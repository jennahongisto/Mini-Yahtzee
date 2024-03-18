import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import styles from '../style/Style'
import { 
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS,
  MAX_NBR_OF_SCOREBOARD_ROWS,
  SCOREBOARD_KEY
} from '../constants/Game'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Container, Row, Col } from 'react-native-flex-grid'
import Header from './Header'
import Footer from './Footer'
import { useSafeAreaFrame } from 'react-native-safe-area-context'


let board = []

export default function Gameboard(navigation, route) {

  const [playerName, setPlayerName] = useState('')
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState (NBR_OF_THROWS)
  const [status, setStatus] = useState('Throw dices')
  const [gameEndStatus, setGameEndStatus] = useState(false)

  // Are dices selected
  const [selectedDices, setSelectedDices] = useState (new Array(NBR_OF_DICES).fill(false))

  // Dice spots for each dice (1-6)
  const [diceSpots, setDiceSpots] = useState (new Array(NBR_OF_DICES).fill(0))

  // Dice points selected or not
  const [selectedDicePoints, setSelectedDicePoints] = useState (new Array(MAX_SPOT).fill(false))

  const [dicePointsTotal, setDicePointsTotal] = useState (new Array(MAX_SPOT).fill(0))

// One way to handle useeffects:

// This one id for passing the player name to the screen
  useEffect(() => {
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player)
    }
  }, [])

// This one is for reading scoreboard from the Asyncstorage
// when user is navigating back to screen (assignment instruction)
// Trigger here is the navigation for useeffect

// This one is for handling the gameflow so that the game does not 
// stop too early or does not continue after it should not
// Trigger here is nbrOfThrowsLeft. Another reason for putting it as a trigger is to avoid "one step behind" problem

  const dicesRow = []
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
      dicesRow.push(
        <Col key={'dice' + dice}>
          <Pressable 
            key={'dice' + dice} 
            onPress={() => selectedDices(dice)}>
            <MaterialCommunityIcons 
              name={board[dice]}
              key={'dice' + dice}
              size={50}
              color={getDiceColor(dice)}
            >
            </MaterialCommunityIcons>
          </Pressable>
        </Col>
    )}

    const pointsToSelectRow = []
      for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
          <Col key={'buttonsRow' + diceButton}>
            <Pressable 
              key={'buttonsRow' + diceButton}
              onPress={() => selectDicePoints(diceButton)}
            >
              <MaterialCommunityIcons
                name={'numeric-' + (diceButton + 1) + '-circle'}
                key={'buttonsRow' + diceButton}
                size={35}
                color={getDicePointsColor(diceButton)}
                >
              </MaterialCommunityIcons>
            </Pressable>
          </Col>
        )
      }
    

    // Call the function for calculating points inside the text 
    // replacing zero
    const pointsRow = []
    for (let spot = 0; spot < MAX_SPOT; spot++) {
      pointsRow.push(
        <Col key={'pointsRow' + spot}>
          <Text key={'pointsRow' + spot}>{getSpotTotal(spot)}</Text>
        </Col>
      )
    }
    
//???
    function getSpotTotal(i) {
      return setDicePointsTotal[i]
    }

    function getDiceColor(i) {
      return selectedDices[i] ? 'black' : 'steelblue'
    }

    function getDicePointsColor(i) {
      if (selectedDicePoints[i] && !gameEndStatus) {
        return 'black'
      }
      else {
        return 'steelblue'
      }
    }

    const selectDice = (i) => {
      if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
        let dices = [...selectedDices]
        dices[i] = selectedDices[i] ? false : true
        setSelectedDices(dices)
      }
      else {
        setStatus('You have to throw the dices first.')
      }
    }

    const throwdices = () => {
      if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
        setStatus('Select your points before next throw')
        return
      }
      else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
        setGameEndStatus(false)
        diceSpots.fill(0)
        dicePointsTotal(0)
      }

      let spots = [...diceSpots]
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1)
          board[i] = 'dice-' + randomNumber
          spots[i] = randomNumber
        }
      }
      setNbrOfThrowsLeft(nbrOfThrowsLeft-1)
      setDiceSpots(spots)
      setStatus('Select and throw dices again')
    } 
    

    // const throwDices = () => {
    //   for (let i = 0; i < NBR_OF_DICES; i++) {
    //     if (!selectedDices[i]) {
    //       let randomNumber = Math.floor(Math.random() * 6 + 1);
    //       board[i] = 'dice-' + randomNumber;
    //     }
    //   }
    //   setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    // }

  const selectDicePoints = (i) => {
    // First version
    let selected = [...selectedDices]
    let selectedPoints = [...selectDicePoints]
    let points = [...dicePointsTotal]
    selectDicePoints[i] = true
    let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0)
    points[i] = nbrOfDices * (i + 1)
    setDicePointsTotal(points)
    setSelectedDicePoints(selectedPoints)
    return points [i]
  }
  

  return (
    <>
    <Header/>
    <View >
      <Text>Gameboard</Text>
      <Container fluid>
        <Row>{dicesRow}</Row>
      </Container>
      <Container fluid>
        <Row>{pointsRow}</Row>
      </Container>
      <Container fluid>
        <Row>{pointsToSelectRow}</Row>
      </Container>
      <Pressable
        onPress={() => throwdices()}>
          <Text>Throw dices</Text>
      </Pressable>
      <Text>Player: {playerName}</Text>
    </View>
    <Footer />
    </>
  )
  }

