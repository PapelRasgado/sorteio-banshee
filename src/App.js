import React from "react";
import useGoogleSheets from "use-google-sheets";
import { Grid, Paper } from "@mui/material";
import Listagem from "./components/Listagem";
import Sorteio from "./components/Sorteio";
import "./App.css";

function App() {
  const { data, loading } = useGoogleSheets({
    apiKey: "AIzaSyCdOcv2zgAnN9D-s-hS33WJw9drrmo3qQc",
    sheetId: "1feYTKrvdT-PmbkdF-Asj8Cutq8DD4oxxexrRR7IHfP0",
  });

  const rows = [];

  if (data && !loading) {
    data[0].data.forEach((item) => {
      Object.keys(item).forEach((user) => {
        if (user !== "Links" && item[user] === "1") {
          const index = rows.findIndex((row) => {
            return row.name === user;
          });

          if (index !== -1) {
            rows[index].tickets = rows[index].tickets + 1;
          } else {
            rows.push({ id: user, name: user, tickets: 1, admin: false });
          }
        }
      });
    });

    data[1].data.forEach((item) => {
      Object.keys(item).forEach((user) => {
        if (user !== "Links" && item[user] === "Sim") {
          const index = rows.findIndex((row) => {
            return row.name === user;
          });

          if (index !== -1) {
            rows[index].admin = true;
          } else {
            rows.push({ id: user, name: user, tickets: 0, admin: true });
          }
        }
      });
    });
  }

  return (
    <Grid className="grid-background">
      <Paper style={{ height: "100%" }}>
        <Grid container spacing={2} style={{ height: "100%" }}>
          <Grid item xs={12} style={{ height: "10%" }}>
            <h1 style={{ textAlign: "center", color: "#39B584" }}>
              Sorteiozada
            </h1>
          </Grid>
          <Grid className="grid-list" item xs={12} md={4}>
            <Listagem itens={rows} loading={loading} />
          </Grid>
          <Grid item xs={12} md={8} style={{ height: "90%" }}>
            <Sorteio itens={rows} loading={loading} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default App;
