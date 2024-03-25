import "./App.css";
import { Bar, Line, SparklinesBar, SparklinesComposed, SparklinesLine, Tooltip } from "../lib";

const demoData = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
const composedData = demoData.map((d, i) => ({
  name: "Label-" + i,
  a: d,
  b: demoData[demoData.length - 1 - i],
}));

function App() {
  /*  const [data, setData] = useState([...demoData])
  
    useEffect(() => {
      const interval = setInterval(() => {
        setData([...data, Math.floor(Math.random() * 10)])
      }, 100)
      return () => clearInterval(interval)
    }, [data])*/

  return (
    <div>
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex" }}>
          <SparklinesLine data={demoData} />
          <SparklinesLine
            name="MyData"
            stroke="#b91c1c"
            fill="#b91c1c"
            data={demoData}
            curved
            limit={demoData.length}
          >
            <Tooltip />
          </SparklinesLine>
          <SparklinesLine
            stroke="#047857"
            fill="#047857"
            data={demoData}
            strokeWidth={4}
            margin={4}
          />
          <SparklinesLine stroke="#1d4ed8" fill="transparent" data={demoData} curved={0.6} />
        </div>
        <div style={{ display: "flex" }}>
          <SparklinesLine data={demoData} fill={"url(#my-gradient-x)"}>
            <defs>
              <linearGradient id="my-gradient-x" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
          </SparklinesLine>
          <SparklinesBar data={demoData} />
          <SparklinesBar
            data={demoData}
            strokeWidth={2}
            stroke={"#db2777"}
            radius={5}
            barWidth={10}
            fill="#9d174d"
          />
          <SparklinesBar
            data={demoData}
            strokeWidth={2}
            stroke={"#059669"}
            fill={"#065f46"}
            radius={{ topLeft: 5, topRight: 5 }}
            maxBarWidth={20}
          />
        </div>
        <div style={{ display: "flex" }}>
          <SparklinesComposed data={demoData}>
            <Line />
            <Bar />
          </SparklinesComposed>
          <SparklinesComposed data={demoData}>
            <Bar fill={"orange"} />
            <Line stroke="red" fill="red" fillOpacity={".5"}/>
          </SparklinesComposed>
          <SparklinesComposed data={demoData}>
            <defs>
              <linearGradient id="my-gradient-2" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="red" />
                <stop offset="70%" stopColor="orange" />
                <stop offset="100%" stopColor="yellow" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="my-gradient-3" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="red" />
                <stop offset="70%" stopColor="orange" />
                <stop offset="100%" stopColor="yellow" />
              </linearGradient>
            </defs>
            <Bar fill={"url(#my-gradient)"} labelColor={"red"} />
            <Line dots={true} fill={"url(#my-gradient-3)"} fillOpacity={".5"} labelColor={"blue"} />
            <Tooltip/>
          </SparklinesComposed>
          <SparklinesBar
            data={demoData}
            radius={{ topLeft: 4, topRight: 4 }}
            fill={"url(#my-gradient-y)"}
          >
            <defs>
              <linearGradient id="my-gradient-y" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#ee9ca7" />
                <stop offset="100%" stopColor="#ffdde1" />
              </linearGradient>
            </defs>
          </SparklinesBar>
        </div>
      </div>

      <div className="demo-section">
        <h1>React Sparklines</h1>
        <div className="demo-section">
          <h2>SparklinesLine</h2>
          <h3>Simple</h3>
          <div className="demo-section">
            <SparklinesLine data={demoData} dots>
              <Tooltip />
            </SparklinesLine>
            <SparklinesLine
              name="MyData"
              stroke="#b91c1c"
              fill="#b91c1c"
               data={demoData}
              curved
              limit={demoData.length}
            >
              <Tooltip />
            </SparklinesLine>
            <SparklinesLine
              stroke="#047857"
              fill="#047857"
              data={demoData}
              style={{ strokeWidth: 4 }}
              margin={4}
            />
            <SparklinesLine
              stroke="#1d4ed8"
              data={demoData}
              curved={0.6}
              fill={"transparent"}
            />
          </div>
          <h3>Gradient</h3>
          <div className="demo-section">
            <SparklinesLine
               data={demoData}
              fill={"url(#my-gradient)"}
            >
              <defs>
                <linearGradient id="my-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="blue" />
                  <stop offset="100%" stopColor="green" />
                </linearGradient>
              </defs>
            </SparklinesLine>
          </div>
          <h3>Dots</h3>
          <div className="demo-section">
            <p>No dots.</p>
            <SparklinesLine data={demoData} />
            <p>With dots.</p>
            <div>
              <SparklinesLine dots data={demoData} />
            </div>
            <div>
              <SparklinesLine dots={true} data={demoData} />
            </div>
            <p>Customized dots.</p>
            <SparklinesLine
              dots={{ style: { fill: "blue" } }}
              data={demoData}
            />
            <p>Custom rendered Dots.</p>
            <SparklinesLine
              dots={(props) => <circle {...props} fill="green" r={1} />}
              data={demoData}
            />
            <p>Custom component dots.</p>
            <SparklinesLine
              dots={<circle fill="turquoise" />}
              data={demoData}
            />
            <p>Customized dots with custom rendering</p>
            <SparklinesLine
              margin={{ top: 10, bottom: 5, left: 10, right: 20 }}
              dots={{ fill: "yellow", dot: (props) => <circle {...props} r={2} /> }}
              data={demoData}
            />
            <p>Customized dots with custom component</p>
            <SparklinesLine
              dots={{ fill: "purple", dot: <circle r={5} /> }}
              data={demoData}
            />
            <p>Custom visibility</p>
            <SparklinesLine
              margin={10}
              dots={{ show: "START_END", dot: <circle r={5} fill={"red"} /> }}
              data={demoData}
            />
          </div>
        </div>
      </div>
      <div className="demo-section">
        <h2>SparklinesBar</h2>
        <h3>Simple</h3>
        <div className="demo-section">
          <div>
            <SparklinesBar height={60} width={300} data={demoData} />
          </div>
          <div>
            <SparklinesBar
              data={demoData}
              strokeWidth={2}
              stroke={"#db2777"}
              radius={5}
              barWidth={10}
              fill={"#9d174d"}
            />
          </div>
          <div>
            <SparklinesBar
              data={demoData}
              strokeWidth={2}
              stroke={"#059669"}
              fill={"#065f46"}
              radius={{ topLeft: 5, topRight: 5 }}
              maxBarWidth={20}
            />
          </div>
        </div>
        <h3>Gradient</h3>
        <div className="demo-section">
          <div>
            <SparklinesBar
              data={demoData}
              radius={{ topLeft: 4, topRight: 4 }}
              fill={"url(#my-gradient-1)"}
            >
              <defs>
                <linearGradient id="my-gradient-1" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#ee9ca7" />
                  <stop offset="100%" stopColor="#ffdde1" />
                </linearGradient>
              </defs>
            </SparklinesBar>
          </div>
          <div>
            <SparklinesBar
              data={demoData}
              radius={{ topLeft: 4, topRight: 4 }}
              fill={"url(#my-gradient-1)"}
              strokeWidth={4}
              stroke={"transparent"}
            >
              <defs>
                <linearGradient id="my-gradient-1" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#ee9ca7" />
                  <stop offset="100%" stopColor="#ffdde1" />
                </linearGradient>
              </defs>
              <Tooltip />
            </SparklinesBar>
          </div>
        </div>
      </div>
      <div className="demo-section">
        <h2>SparklinesComposed</h2>
        <h3>Simple</h3>
        <div className="demo-section">
          <div>
            <SparklinesComposed data={demoData}>
              <Line />
              <Bar />
            </SparklinesComposed>
          </div>
          <div>
            <SparklinesComposed data={demoData}>
              <Bar color={"orange"} />
              <Line color="red" fillOpacity={".5"} />
            </SparklinesComposed>
          </div>
          <div>
            <SparklinesComposed data={demoData}>
              <Line />
              <Bar maxBarWidth={10} radius={5} />
            </SparklinesComposed>
          </div>
        </div>
        <h3>Gradient</h3>
        <div className="demo-section">
          <SparklinesComposed data={demoData}>
            <defs>
              <linearGradient id="my-gradient-2" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="red" />
                <stop offset="70%" stopColor="orange" />
                <stop offset="100%" stopColor="yellow" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="my-gradient-3" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="red" />
                <stop offset="70%" stopColor="orange" />
                <stop offset="100%" stopColor="yellow" />
              </linearGradient>
            </defs>
            <Bar fill={"url(#my-gradient)"} />
            <Line dots={true} fill={"url(#my-gradient-3)"} fillOpacity={".5"} />
          </SparklinesComposed>
        </div>
        <h3>Complex</h3>
        <div className="demo-section">
          <div>
            <SparklinesComposed
              height={500}
              width={900}
              data={composedData}
              margin={{ top: 30, bottom: 60, left: 20, right: 40 }}
            >
              <Line dataKey="a" stroke={"green"} fill={"green"} dots={{ style: { fill: "green" } }} />
              <Line
                dataKey="b"
                stroke={"blue"}
                fill={"transparent"}
                dots={{ style: { fill: "blue" } }}
              />
              <Tooltip />
            </SparklinesComposed>
          </div>
        </div>
        <h3>Tooltip</h3>
        <div className="demo-section">
          <div>
            <SparklinesComposed
              height={500}
              width={900}
              data={composedData}
              margin={{ top: 130, bottom: 60, left: 90, right: 40 }}
              label="MyLabel"
              disableBarAdjustment
              max={7}
            >
              <Line dataKey="a" stroke={"green"} fill={"green"} dots name="MyData" />
              <Line dataKey="b" stroke={"blue"} fill={"blue"} dots />
              <Tooltip />
            </SparklinesComposed>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
