import React from 'react';
import './Plane.css';
import { setAutoFreeze } from 'immer';
import superagent from 'superagent';

let url = 'https://mediator-git-blocker-awareness.snakes-on-a-plane.now.sh/api'

export default class Plane extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            grid: [],
            player_pos: { }
        }
    }

    async componentDidMount() {
        try {
            const gameData = await superagent.get(url)

            console.log(gameData.body);

            this.setState({grod: gameData.body.grid});

        } catch (e) {
            console.log(e);
        }
    }       
    
    getRows() {
        return this.state.grid.map((row, rowIndex) => {
            return row.map((info, colIndex) => {
            
            let className = 'cell'+ info;
            let label = info;
            
            if (rowIndex === this.state.player_pos.y && colIndex === this.state.player_pos.x) {
                className = 'cell player';
                label = 'player';
            }
            let seat = <div className={className}>{label}</div>;

                return seat;
            });
        })
    }

    move = async (direction) => {

        const full_url = `${url}?direction=${direction}&x=${this.state.player_pos.x}&y=${this.state.player_pos.y}`

        const gameData = await superagent.get(full_url);

        this.setState(gameData.body);

    }

    render() {
        return (
            <div>
                <div className='Plane'>
                    {this.getRows()}
                </div>
                <div>
                    <button onClick={()=> this.move('left')}>Move Left</button>
                    <button onClick={()=> this.move('right')}>Move Right</button>
                    <button onClick={()=> this.move('up')}>Move Up</button>
                    <button onClick={()=> this.move('down')}>Move Down</button>

                </div>
            </div>
        )    
    }
//             rows : [[
//                 {
//                     cell_type : 'entrance',
//                     x_pos: 0,
//                     y_pos: 0,
//                 },
//                 {
//                     cell_type : 'aisle',
//                     x_pos: 1,
//                     y_pos: 0,

//                 },
//                 {
//                     cell_type : 'aisle',
//                     x_pos: 2,
//                     y_pos: 0,

//                 },
//                 {
//                     cell_type : 'aisle',
//                     x_pos: 3,
//                     y_pos: 0,

//                 },
//                 {
//                     cell_type : 'aisle',
//                     x_pos: 4,
//                     y_pos: 0,

//                 },
//                 {
//                     cell_type : 'seat',
//                     x_pos: 5,
//                     y_pos: 0,

//                 },
//                 {
//                     cell_type : 'seat',
//                     x_pos: 6,
//                     y_pos: 0,

//                 },
//                 {
//                     cell_type : 'seat',
//                     x_pos: 7,
//                     y_pos: 0,

//                 },
//                 {
//                     cell_type : 'wall',
//                 },
//             ],[
//                 {
//                     cell_type : 'wall',
//                 },
//                 {
//                     cell_type : 'seat',

//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'aisle',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'wall',
//                 },
//             ],[
//                 {
//                     cell_type : 'wall',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'aisle',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'wall',
//                 },
//             ],[
//                 {
//                     cell_type : 'wall',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'aisle',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'seat',
//                 },
//                 {
//                     cell_type : 'wall',
//                 },
//             ],
//         ]
//         }
//     }

//     renderRows(){

//         const rowsToRender = []

//         for (let row of this.state.rows) {


//             let cellsToRender = row.map(cell => {

//                 let className = 'Cell ' + cell.cell_type

//                 if (cell.x_pos === this.state.player.x_pos &&
//                     cell.y_pos === this.state.player.y_pos) {

//                         className += ' player' 
//                     }

//                return<div className={className}>{cell.cell_type}</div>
//         })

//             rowsToRender.push(cellsToRender)

//         }
//         return rowsToRender
//     }

//     render(){

//         return <div className="Plane">
//             {this.renderRows()}
//         </div>

//     }
// }
}
