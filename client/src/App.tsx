import { useEffect } from "react";
import { useSimulatorStore } from "./stores/use-simulator";
import { Layout } from "./components/layout/layout";
import { Banner } from "./components/ui/banner/banner";
import { Button } from "./components/ui/button/button";
import { GameBoard } from "./components/game/gameboard";

import "./App.css";
import { toast } from "react-toastify";

function App() {
  const { initSession, setPosition, setHeading, position, heading, loading } =
    useSimulatorStore();

  // Set a unique session ID on app load
  useEffect(() => {
    initSession();
  }, [initSession]);

  return (
    <Layout>
      <Banner>
        Click to place the robot, use the buttons or arrows to move
      </Banner>
      <GameBoard />
      <div style={{ display: "flex", gap: "20px" }}>
        <Button onClick={() => setHeading("LEFT")}>Left</Button>
        <Button onClick={() => setPosition()} disabled={loading}>
          Move
        </Button>
        <Button onClick={() => setHeading("RIGHT")}>Right</Button>
      </div>
      <div>
        <Button
          variant="outlined"
          onClick={() =>
            toast.info(
              `REPORT: Position: (${position?.x}, ${position?.y}), Heading: ${heading}`
            )
          }
          style={{ width: "160px" }}
        >
          Report
        </Button>
      </div>
    </Layout>
  );
}

export default App;
