import { FiEdit3, FiPlus } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import "./Cric.css";
import teamdata from "./Team.json";

const Cric = () => {
  const totalOver = 20;
  const Extras = [{ name: "WD", run: 1 },{ name: "NB", run: 1 },{ name: "Bye", run: 0 },{ name: "LB", run: 0 },{ name: "OUT", run: 0 }];
  const [extra, setExtra] = useState({ name: "", run: 0 });
  const [data, setData] = useState(teamdata);
  const [strike, setStrike] = useState({
    onStrike: teamdata[0].players[0],
    offStrike: teamdata[0].players[1],
  });
  const [bowler, setBowler] = useState(teamdata[1].players[6]);
  const [value, setValue] = useState(false);
  const [oveer, setOveer] = useState(0.0);
  const [curRun, setCurRun] = useState([[]]);
  // const [curData,setCurData] = useState([{run:"",bowlerName:"",batsmanName:"",}])

  useEffect(() => {
    let overs = Math.floor(data[1].team_balls / 6);
    let remainballs = ((data[1].team_balls % 6) ) / 10;
    setOveer(overs + remainballs);
  }, [data]);
  const handleRunClick = (e) => {
    // const newData = [[{"over":oveer,"run":e,...curRun}]];
    // setCurRun(newData);
    // console.log(curRun)
    const newData = [...curRun];
    let curOver = newData[0];
    const curData = { over: oveer, run: e, bowlerName: bowler.name, batsmanName: strike.onStrike.name };
    curOver = [curData, ...curOver];
    newData[0] = curOver;
    setCurRun(newData);

    let tempData = { ...data };
    // if (bowler.bowling.balls % 6 === 0 && bowler.bowling.balls !== 0 && strike.onStrike.batting.runs === 0) 
        // bowler.bowling.maiden_over += 1;

    if (bowler.bowling.balls % 5 === 0 && bowler.bowling.balls !== 0) {
      let bowlerIndex = parseInt(prompt("Please Bowler Index"));
      while (bowler === tempData[1].players[bowlerIndex]) {
        alert("Please, Change the Bowler Same Bowler can't bowling in twice in a line.");
        bowlerIndex = parseInt(prompt("Please Bowler Index"));
      }
      setBowler(tempData[1].players[bowlerIndex]);
    }
    if (e % 2 === 0) {
      if (e === 4) strike.onStrike.batting.fours += 1;
      if (e === 6) strike.onStrike.batting.sixes += 1;
    } else {
      setStrike((x) => ({ onStrike: x.offStrike, offStrike: x.onStrike }));
    }

    bowler.bowling.runs += e;
    bowler.bowling.balls += 1;
    tempData[1].team_balls += 1;
    console.log(tempData[1].team_balls);
    if (extra.name === "Bye" || extra.name === "LB") {
      strike.onStrike.batting.runs -= e;
      console.log("object");
    }
    strike.onStrike.batting.runs += e;
    strike.onStrike.batting.balls += 1;
    tempData[0].team_score += e;
    setData(tempData);
    setValue(!value);
    // console.log(tempData)
  };

  const handleExtraClick = (extra) => {
    bowler.bowling.runs += extra.run;
    data[0].team_score += extra.run;
    // console.log(extra.run)
    if (extra.name === "OUT") {
      data[0].team_wickets += 1;
      console.log("w");
    }
    console.log(extra);
    setExtra({ ...extra, name: value });
    // console.log(extra)
    setData(data);
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-12 text-center p-2 teamNames">
          <span className="fw-bold fs-4">
            {teamdata[0].team_name} v {teamdata[1].team_name}
          </span>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-7 col-sm-12 col-xl-8 mainLeftArea">
          <div className="mainScoreAreaIMG">
            <div className="mainScoreArea p-4">
              <div className="teamScore d-flex ">
                <div className="fs-4 fw-semibold me-3 p-2 pt-3">{teamdata[0].team_name}</div>
                <div className="scoreArea p-1">
                  <span className="score fs-1 fw-bold">
                    {data[0].team_score}/{data[0].team_wickets}{" "}
                  </span>
                  <span className="overs fs-5 fw-semibold ms-2">
                    ({oveer}/{totalOver})
                  </span>
                </div>
              </div>

              <div className="row d-flex my-4 ">
                <div className="col batsmanArea border-end">
                  <div className="batsmanName">{strike.onStrike.name}</div>
                  <div className="batsmanScore">
                    {strike.onStrike.batting.runs} ({strike.onStrike.batting.balls})
                  </div>
                </div>
                <div className="col">
                  <div className="batsmanName">{strike.offStrike.name}</div>
                  <div className="batsmanScore">
                    {strike.offStrike.batting.runs} ({strike.offStrike.batting.balls})
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col d-flex flex-wrap justify-content-between p-2 ">
                  <div>
                    <span>CRR</span> <b className="fs-5 ms-1">0.0</b>
                  </div>
                  <div>
                    <span>REQ</span> <b className="fs-5 ms-1">0.0</b>
                  </div>
                  <div>
                    <span>P'SHIP</span> <b className="fs-5 ms-1">0(0)</b>
                  </div>
                </div>
              </div>

              <div className="row d-flex mt-3 border-top pt-3">
                <div className="col bowlerName">{bowler.name}</div>
                <div className="col bowlerScore text-end mx-3">
                  {Math.floor(bowler.bowling.balls / 6)}.{bowler.bowling.balls % 6} - {bowler.bowling.maiden_over} - {bowler.bowling.runs} - {bowler.bowling.wickets}
                </div>
              </div>
            </div>
          </div>

            <div className=" runPerBall mx-auto d-flex flex-wrap my-4">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((run, index) => {
                return (
                        <button onClick={() => handleRunClick(run)} className='runBtn' key={index}>{run}</button>
                );
              })} 
            </div>

          <div className="extra d-flex flex-wrap justify-content-between mb-3">
         
            {Extras.map((extra, index) => {
              return (
                <div className="my-1" key={index}>
                  <input type="checkbox" onChange={() => handleExtraClick(extra)} className="btn-check" id={`${extra.name}`} />
                  <label className={"btn " + (`${extra.name}` === "OUT" ? "btn-danger extraBtn" : "btn-success extraBtn")} htmlFor={`${extra.name}`}>
                    {extra.name}
                  </label>
                </div>
              );
            })}
                <button className="btn btn-warning text-white  extraBtn">Undo</button>
          </div>
        </div>

        <div className="col-auto col-lg-5 col-sm-auto col-xl-4 text-center rightCol">
          <div className="row rowBG">
            <div className="col">Ball by Ball</div>
          </div>

          <div className="row rowBG">
            <div className="col-8"></div>
            <div className="col-2">Insert</div>
            <div className="col-2">Edit</div>
          </div>

          <div className="row rowBG">
            <div className="col-8 overNo text-start fs-5">Over {oveer}</div>
            <div className="col-2 fs-5 ps-3"><FiPlus /></div>
            <div className="col-2 ps-3 fs-5"><FiEdit3 /></div>
          </div>
            {curRun.map((over, index) => {
              return over.map((r, index) => {
                return (
                  <div className="row fs-5 p-2 text-start" key={index}>
                    <div className="col-2">{(r.over + 0.1).toFixed(1)}</div>
                    <div className="col-2 runPerBall ">{r.run}</div>
                    <div className="col-7" style={{fontSize:'13px'}}>{r.bowlerName}</div>
                    <div className="col-1 text-end"><FiEdit3 /></div>
                  </div>
                );
              });
            })}
          {/* {
                curRun.map((r,index) => {
                    return (
                    <div className="row fs-5 p-2 text-start" key={index}>
                        <div className="col-2">{oveer}</div>
                        <div className="col-2"><div className="runPerBall">{r}</div></div>
                        <div className="col-6 fs-6">{bowler.name}</div>
                        <div className="col-2 text-end pe-4"><FiEdit3/></div>
                    </div>
                    )
                })
                
            } */}
        </div>
      </div>
    </div>
  );
};

export default Cric;
