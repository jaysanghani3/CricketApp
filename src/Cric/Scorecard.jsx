import React from 'react'
import data from './Team.json'

const Scorecard = () => {
  return (
    <div>
      <div className="row bg-secondary p-2">
        <div className="col-6 fs-3 fw-semibold">{data[0].team_name}</div>
        <div className="col-4 fs-3 fw-bold text-end">{data[0].team_score}</div>
        <div className="col-2 fs-5 pt-2">
            ({Math.floor(data[1].team_balls/ 6)}.{data[1].team_balls % 6} Overs)
        </div>
      </div>

      <div className="row bg-light py-2">
        <div className="col-7">Batter</div>
        <div className="col-1">R</div>
        <div className="col-1">B</div>
        <div className="col-1">4s</div>
        <div className="col-1">6s</div>
        <div className="col-1">SR</div>
      </div>

      {
        data[0].players.map((batter, index) => (
            <div className="row bg-light fs-5" key={index}>
                <div className="col-7 text-primary my-1 ">{batter.name}</div>
                <div className="col-1">{batter.batting.runs}</div>
                <div className="col-1">{batter.batting.balls}</div>
                <div className="col-1">{batter.batting.fours}</div>
                <div className="col-1">{batter.batting.sixes}</div>
                <div className="col-1">{batter.batting.strikeRate}</div>
            </div>
        ))
      }
    </div>
  )
}

export default Scorecard
