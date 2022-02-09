import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";

function Sorteio(props) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  if (props.loading) {
    return <div>Loading...</div>;
  }

  const wheelData = [];
  const prizeData = [];

  props.itens.forEach((item, index) => {
    if (item.name.length >= 12) {
      wheelData.push({ option: item.name.slice(0, 11) + "..." });
    } else {
      wheelData.push({ option: item.name });
    }

    if (!item.admin) {
      prizeData.push.apply(prizeData, Array(item.tickets).fill(index));
    }
  });

  prizeData.sort(() => Math.random() - 0.5);

  const handleSpinClick = () => {
    const newPrizeNumber =
      prizeData[Math.floor(Math.random() * prizeData.length)];
    console.log(wheelData[newPrizeNumber]);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={4}
      style={{ width: "100%", height: "100%" }}
    >
      <Grid item>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
          data={wheelData}
          backgroundColors={["#39B584", "#167d53"]}
          textColors={["#ffffff"]}
          outerBorderWidth={3}
          outerBorderColor={"#167d53"}
          radiusLineWidth={1}
          radiusLineColor={"#167d53"}
        />
      </Grid>
      <Grid item>
        <Button
          className="colored"
          variant="outlined"
          onClick={handleSpinClick}
        >
          Sortear
        </Button>
      </Grid>
    </Grid>
  );
}

export default Sorteio;
