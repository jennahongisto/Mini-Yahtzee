import React, { useEffect, useState } from "react";
import { Text, View, Pressable } from "react-native";
import style from "../style/Style";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS,
  MAX_NBR_OF_SCOREBOARD_ROWS,
  SCOREBOARD_KEY,
} from "../constants/Game";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Container, Row, Col } from "react-native-flex-grid";
import Header from "./Header";
import Footer from "./Footer";

let board = []

export default function Gameboard({navigation, route}) {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState (NBR_OF_THROWS)
    const [status, setStatus] = useState('Throw dices')
    const [gameEndStatus, setGameEndStatus] = useState(false)
    const [totalPoints, setTotalPoints] = useState(0)

    const [selectedDices, setSelectedDices] = useState (new Array(NBR_OF_DICES).fill(false))
    const [diceSpots, setDiceSpots] = useState (new Array(NBR_OF_DICES).fill(0))
    const [selectedDicePoints, setSelectedDicePoints] = useState (new Array(MAX_SPOT).fill(false))
    const [dicePointsTotal, setDicePointsTotal] = useState (new Array(MAX_SPOT).fill(0))

    const [playerName, setPlayerName] = useState('')

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player)
          }
    }, [])

    useEffect(() => {
      const allPointsSelected = dicePointsTotal.every((points) => points > 0);
      if (allPointsSelected) {
        setGameEndStatus(true);
      }
    }, [dicePointsTotal]);

    const row = [];
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        row.push(
        <Col key={"row" + dice}>
            <Pressable
            key={"row" + dice}
            onPress={() => selectDice(dice)}
            >
            <MaterialCommunityIcons
                name={board[dice]}
                key={"row" + dice}
                size={50}
                color={getDiceColor(dice)}
            ></MaterialCommunityIcons>
            </Pressable>
        </Col>
        );
    }

    const pointsRow = []
    for (let spot = 0; spot < MAX_SPOT; spot++) {
      pointsRow.push(
        <Col key={'pointsRow' + spot}>
          <Text key={'pointsRow' + spot}>{getSpotTotal(spot)}</Text>
        </Col>
      )
    }

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

    function getDiceColor(i) {
        return selectedDices[i] ? 'black' : '#989f99'
    }

    function getDicePointsColor(i) {
        return (selectedDicePoints[i]) ? 'black' : '#989f99'
    }

    function calculateTotalPoints() {
        let totalPoints = 0;
        dicePointsTotal.forEach((points) => {
          totalPoints += points;
        });
        return totalPoints;
      }

    const selectDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0) {
        let selected = [...selectedDices]
        let selectedPoints = [...selectedDicePoints]
        let points = [...dicePointsTotal]
        if (!selectedPoints[i]) {
        selectedPoints[i] = true
        let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0)
        points[i] = nbrOfDices * (i + 1)
        setDicePointsTotal(points)
        setSelectedDicePoints(selectedPoints)
        setNbrOfThrowsLeft(NBR_OF_THROWS)
        setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        return points[i]
        }
        else {
          setStatus('You already selected points for ' + (i + 1))
        }
      } 
      else {
        setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points')
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

    const throwDices = () => {
      if (nbrOfThrowsLeft > 0) {
        let spots = [...diceSpots]
        for (let i = 0; i < NBR_OF_DICES; i++) {
          if (!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            spots[i] = randomNumber
            board[i] = 'dice-' + randomNumber;
          }
        }
        setDiceSpots(spots)
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
      } else {
        setStatus("Select points")
      }
    }

      function getSpotTotal(i) {
        return dicePointsTotal[i]
      }

      const startNewGame = () => {
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setStatus("Throw dices");
        setGameEndStatus(false);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setDiceSpots(new Array(NBR_OF_DICES).fill(0));
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        setTotalPoints(0);
      }

    return (
        <>
        <Header />
        <View style={style.gameboard}>
            <Container>
                <Row>{row}</Row>
            </Container>
            <Text style={style.label}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={[style.label, {fontWeight: '500'}]}>{status}</Text>
            <Pressable
                onPress={() => throwDices()} style={style.button}>
                <Text style={style.buttonText}>Throw dices</Text>
            </Pressable>
            <Text style={style.titles}>Total Points: {calculateTotalPoints()} {calculateTotalPoints() > 63 ? "(+ 50 Bonus Points)" : ""}</Text>
            <Text style={style.label}>Points to bonus: {Math.max(63 - calculateTotalPoints(), 0)}</Text>
            <Container style={style.row}>
                <Row>{pointsRow}</Row>
            </Container>
            <Container>
                <Row>{pointsToSelectRow}</Row>
            </Container>
            <Text style={style.label}>Player: {playerName}</Text>
            {gameEndStatus && (
            <Pressable onPress={() => startNewGame()} style={style.button}>
              <Text style={style.buttonText}>Start New Game</Text>
            </Pressable>
        )}
        </View>
        <Footer />
        </>
    );
    }
