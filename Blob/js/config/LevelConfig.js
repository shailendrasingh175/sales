
/**
 * Created with JetBrains WebStorm.
 * User: supriya.g
 * Date: 7/5/13
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */

function Level() {
    this.Config = {

        setOfSlotObjects: {
            set1: {
                slotObjectsDetails: [
                    // 9 classic symbols [symbol-name, count=3 , count=4, count=5, points for each obj in mini-game]

                    { 'ObjName': ['Mint', [5, "Yummy"], [10, "Yummy"], [20, "CandyLightFull"], 100] },
                    { 'ObjName': ['CokeGum', [7, "Yummy"], [15, "Yummy"], [30, "CandyLightFull"], 150] },
                    { 'ObjName': ['ChocolateBunny', [10, "Yummy"], [20, "CandyLightFull"], [40, "Jellycious"], 200] },
                    { 'ObjName': ['GummyBear', [12, "Yummy"], [25, "CandyLightFull"], [50, "Jellycious"], 250] },
                    { 'ObjName': ['Jelly', [15, "Yummy"], [30, "CandyLightFull"], [60, "Chocolate"], 300] },
                    { 'ObjName': ['ToffeeApple', [17, "CandyLightFull"], [35, "Jellycious"], [70, "Chocolate"], 350] },
                    { 'ObjName': ['CandyFloss', [20, "CandyLightFull"], [40, "Jellycious"], [80, "Chocolate"], 400] },
                    { 'ObjName': ['GingerBreadMan', [22, "CandyLightFull"], [45, "Jellycious"], [90, "Chocolate"], 450] },
                    { 'ObjName': ['PartyCake', [25, "CandyLightFull"], [50, "Jellycious"], [100, "Chocolate"], 500] },

                    // 3 special symbols
                    { 'ObjName': ['Wild', null, null, null, 550] },
                    { 'ObjName': ['Scatter', [5, "scatter"], [5, "scatter"], [5, "scatter"], 600] }, // number of free spins
                    { 'ObjName': ['Bonus', [0, "bonus"], [2, "bonus"], [3, "bonus"], 650]  }  // number of extra balls in minigame
                ]

                //pointsChartImg: "scoreBoard"
            }
        },
        // level details
        levels: {
            level1: {
                //Level Name if any
                levelName: "Amateur",
                bettingAmount: [1, 2, 5, 10, 100],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 10 },
                target: { minXP: 0, maxXP: 75},
                rewardPoints: 0,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 3,
                minimumBet : 1
            },
            level2: {
                //Level Name if any
                levelName: "Amateur",
                bettingAmount: [1, 2, 5, 10, 100],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 10 },
                target: { minXP: 75, maxXP: 200},
                rewardPoints: 647,
                bonusPoints: 194,
                numberOfBallsForMiniGame: 3,
                minimumBet : 1
            },
            level3: {
                //Level Name if any
                levelName: "Amateur",
                bettingAmount: [1, 2, 5, 10, 100],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 10 },
                target: { minXP: 200, maxXP: 400},
                rewardPoints: 971,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 3,
                minimumBet : 1
            },
            level4: {
                //Level Name if any
                levelName: "Glutton",
                bettingAmount: [2, 5, 10, 100, 250],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 10 },
                target: { minXP: 400, maxXP: 800},
                rewardPoints: 1294,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 5,
                minimumBet : 2
            },
            level5: {
                //Level Name if any
                levelName: "Glutton",
                bettingAmount: [2, 5, 10, 100, 250],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 10 },
                target: { minXP: 800, maxXP: 1200},
                rewardPoints: 1618,
                bonusPoints: 388,
                numberOfBallsForMiniGame: 5,
                minimumBet : 2
            },
            level6: {
                //Level Name if any
                levelName: "Glutton",
                bettingAmount: [2, 5, 10, 100, 250],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 10 },
                target: { minXP: 1200, maxXP: 1600},
                rewardPoints: 1942,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 5,
                minimumBet : 2
            },
            level7: {
                //Level Name if any
                levelName: "Gourmet",
                bettingAmount: [5, 10, 100, 250, 500],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 12 },
                target: { minXP: 1600, maxXP: 2400},
                rewardPoints: 2265,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 7,
                minimumBet : 5
            },
            level8: {
                //Level Name if any
                levelName: "Gourmet",
                bettingAmount: [5, 10, 100, 250, 500],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 12 },
                target: { minXP: 2400, maxXP: 3200},
                rewardPoints: 2589,
                bonusPoints: 582,
                numberOfBallsForMiniGame: 7,
                minimumBet : 5
            },
            level9: {
                //Level Name if any
                levelName: "Gourmet",
                bettingAmount: [5, 10, 100, 250, 500],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 12 },
                target: { minXP: 3200, maxXP: 4000},
                rewardPoints: 2912,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 7,
                minimumBet : 5
            },
            level10: {
                //Level Name if any
                levelName: "Rookie",
                bettingAmount: [10, 100, 250, 500, 1000],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 15 },
                target: { minXP: 4000, maxXP: 5600},
                rewardPoints: 3236,
                bonusPoints: 712,
                numberOfBallsForMiniGame: 9,
                minimumBet : 10
            },
            level11: {
                //Level Name if any
                levelName: "Rookie",
                bettingAmount: [10, 100, 250, 500, 1000],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 15 },
                target: { minXP: 5600, maxXP: 7200},
                rewardPoints: 3560,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 9,
                minimumBet : 10
            },
            level12: {
                //Level Name if any
                levelName: "Rookie",
                bettingAmount: [10, 100, 250, 500, 1000],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 15 },
                target: { minXP: 7200, maxXP: 8800},
                rewardPoints: 3883,
                bonusPoints: 841,
                numberOfBallsForMiniGame: 9,
                minimumBet : 10
            },
            level13: {
                //Level Name if any
                levelName: "Apprentice Cook",
                bettingAmount: [100, 250, 500, 1000, 2500],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 20 },
                target: { minXP: 8800, maxXP: 15000},
                rewardPoints: 4207,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 11,
                minimumBet : 100
            },
            level14: {
                //Level Name if any
                levelName: "Apprentice Cook",
                bettingAmount: [100, 250, 500, 1000, 2500],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 20 },
                target: { minXP: 15000, maxXP: 21200},
                rewardPoints: 4530,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 11,
                minimumBet : 100
            },
            level15: {
                //Level Name if any
                levelName: "Rising Star",
                bettingAmount: [250, 500, 1000, 2500, 5000],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 20 },
                target: { minXP: 21200, maxXP: 33600},
                rewardPoints: 4854,
                bonusPoints: 1036,
                numberOfBallsForMiniGame: 12,
                minimumBet : 250
            },
            level16: {
                //Level Name if any
                levelName: "Rising Star",
                bettingAmount: [250, 500, 1000, 2500, 5000],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 20 },
                target: { minXP: 33600, maxXP: 45800},
                rewardPoints: 5178,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 12,
                minimumBet : 250
            },
            level17: {
                //Level Name if any
                levelName: "Gifted Cook",
                bettingAmount: [500, 1000, 2500, 5000, 7500],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 22 },
                target: { minXP: 45800, maxXP: 64400},
                rewardPoints: 5501,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 12,
                minimumBet : 500
            },
            level18: {
                //Level Name if any
                levelName: "Gifted Cook",
                bettingAmount: [500, 1000, 2500, 5000, 7500],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 22 },
                target: { minXP: 64400, maxXP: 83000},
                rewardPoints: 5825,
                bonusPoints: 1230,
                numberOfBallsForMiniGame: 15,
                minimumBet : 500
            },
            level19: {
                //Level Name if any
                levelName: "Gifted Cook",
                bettingAmount: [500, 1000, 2500, 5000, 7500],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 22 },
                target: { minXP: 83000, maxXP: 101600},
                rewardPoints: 6149,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 15,
                minimumBet : 500
            },
            level20: {
                //Level Name if any
                levelName: "Chef",
                bettingAmount: [1000, 2500, 5000, 7500, 10000],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 23 },
                target: { minXP: 101600, maxXP: 126400},
                rewardPoints: 6472,
                bonusPoints: 1359,
                numberOfBallsForMiniGame: 16,
                minimumBet : 1000
            },
            level21: {
                //Level Name if any
                levelName: "Chef",
                bettingAmount: [1000, 2500, 5000, 7500, 10000],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 23 },
                target: { minXP: 126400, maxXP: 151200},
                rewardPoints: 6796,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 16,
                minimumBet : 1000
            },
            level22: {
                //Level Name if any
                levelName: "Chef",
                bettingAmount: [1000, 2500, 5000, 7500, 10000],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 23 },
                target: { minXP: 151200, maxXP: 176000},
                rewardPoints: 7119,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 16,
                minimumBet : 1000
            },
            level23: {
                //Level Name if any
                levelName: "Chef",
                bettingAmount: [1000, 2500, 5000, 7500, 10000],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 23 },
                target: { minXP: 176000, maxXP: 200800},
                rewardPoints: 7443,
                bonusPoints: 1553,
                numberOfBallsForMiniGame: 18,
                minimumBet : 1000
            },
            level24: {
                //Level Name if any
                levelName: "Chef",
                bettingAmount: [1000, 2500, 5000, 7500, 10000],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 24 },
                target: { minXP: 200800, maxXP: 225600},
                rewardPoints: 7767,
                bonusPoints: 0,
                numberOfBallsForMiniGame: 18,
                minimumBet : 1000
            },
            level25: {
                //Level Name if any
                levelName: "Master Chef",
                bettingAmount: [1000, 3500, 7500, 10000, 15000],
                linesSelection: { minNoOfLines: 1, maxNoOfLines: 25 },
                target: { minXP: 225600, maxXP: 262800},
                rewardPoints: 8090,
                bonusPoints: 1683,
                numberOfBallsForMiniGame: 20,
                minimumBet : 1000
            }

        },

        // this array determines the positions of symbols which are placed according to the lines in ascending order (left to right )
        linesSelectionPattern: {
            line1: [ [1, 0], [1, 1], [1, 2], [1, 3], [1, 4] ],
            line2: [ [0, 0], [0, 1], [0, 2], [0, 3], [0, 4] ],
            line3: [ [2, 0], [2, 1], [2, 2], [2, 3], [2, 4] ],
            line4: [ [0, 0], [1, 1], [2, 2], [1, 3], [0, 4] ],
            line5: [ [2, 0], [1, 1], [0, 2], [1, 3], [2, 4] ],
            line6: [ [1, 0], [0, 1], [0, 2], [0, 3], [1, 4] ],
            line7: [ [1, 0], [2, 1], [2, 2], [2, 3], [1, 4] ],
            line8: [ [0, 0], [0, 1], [1, 2], [0, 3], [1, 4] ],
            line9: [ [2, 0], [2, 1], [1, 2], [2, 3], [1, 4] ],
            line10: [ [1, 0], [0, 1], [1, 2], [2, 3], [1, 4] ],
            line11: [ [1, 0], [2, 1], [1, 2], [0, 3], [1, 4] ],
            line12: [ [1, 0], [1, 1], [2, 2], [2, 3], [1, 4] ],
            line13: [ [1, 0], [1, 1], [0, 2], [0, 3], [1, 4] ],
            line14: [ [0, 0], [0, 1], [1, 2], [2, 3], [1, 4] ],
            line15: [ [2, 0], [2, 1], [1, 2], [0, 3], [1, 4] ],
            line16: [ [1, 0], [2, 1], [2, 2], [1, 3], [0, 4] ],
            line17: [ [1, 0], [0, 1], [0, 2], [1, 3], [2, 4] ],
            line18: [ [0, 0], [0, 1], [0, 2], [1, 3], [2, 4] ],
            line19: [ [2, 0], [2, 1], [2, 2], [1, 3], [0, 4] ],
            line20: [ [1, 0], [1, 1], [1, 2], [0, 3], [0, 4] ],
            line21: [ [1, 0], [1, 1], [1, 2], [2, 3], [2, 4] ],
            line22: [ [0, 0], [0, 1], [0, 2], [1, 3], [1, 4] ],
            line23: [ [2, 0], [2, 1], [2, 2], [1, 3], [1, 4] ],
            line24: [ [1, 0], [1, 1], [1, 2], [0, 3], [1, 4] ],
            line25: [ [1, 0], [1, 1], [1, 2], [2, 3], [1, 4] ]
        },

        // determines the positions (x,y) of line images
        linesCoordinates: {
            line1: {image: 'line_1', x: 320, y: 355},
            line2: {image: 'line_2', x: 320, y: 242},
            line3: {image: 'line_3', x: 320, y: 476},
            line4: {image: 'line_4', x: 320, y: 365},
            line5: {image: 'line_5', x: 320, y: 355},
            line6: {image: 'line_6', x: 320, y: 305},
            line7: {image: 'line_7', x: 320, y: 425},
            line8: {image: 'line_8', x: 320, y: 302},
            line9: {image: 'line_9', x: 320, y: 421},
            line10: {image: 'line_10', x: 320, y: 365},
            line11: {image: 'line_11', x: 320, y: 365},
            line12: {image: 'line_12', x: 320, y: 415},
            line13: {image: 'line_13', x: 320, y: 295},
            line14: {image: 'line_14', x: 320, y: 362},
            line15: {image: 'line_15', x: 320, y: 362},
            line16: {image: 'line_16', x: 320, y: 360},
            line17: {image: 'line_17', x: 320, y: 360},
            line18: {image: 'line_18', x: 320, y: 370},
            line19: {image: 'line_19', x: 320, y: 360},
            line20: {image: 'line_20', x: 320, y: 300},
            line21: {image: 'line_21', x: 320, y: 420},
            line22: {image: 'line_22', x: 320, y: 302},
            line23: {image: 'line_23', x: 320, y: 415},
            line24: {image: 'line_24', x: 320, y: 302},
            line25: {image: 'line_25', x: 320, y: 420}

        }
    }

}

