import { Paper } from "@mui/material";
import MuiVirtualizedTable from "mui-virtualized-table";
import React, { useEffect, useRef, useState } from "react";
import { AutoSizer } from "react-virtualized";

function Listagem(props) {
  if (props.loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    { name: "name", header: "Membro", width: "50%" },
    { name: "tickets", header: "Participação", width: "25" },
    {
      name: "admin",
      header: "Moderação",
      width: "25%",
      cell: (item) => (item.admin ? "Sim" : "Não"),
    },
  ];

  const Table = ({ width = 0 }) => {
    useEffect(() => {}, [width]);

    return (
      <AutoSizer>
        {({ height }) => (
          <MuiVirtualizedTable
            data={props.itens}
            columns={columns}
            includeHeaders={true}
            width={width}
            height={height}
            cellProps={{
              style: {
                borderBottom: "1px solid rgba(57, 181, 132, 1)",
                color: "#167d53",
              },
            }}
          />
        )}
      </AutoSizer>
    );
  };

  const Parent = () => {
    const divRef = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
      let observerRefValue = null;

      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentRect) {
            setWidth(entry.contentRect.width);
          }
        }
      });

      resizeObserver.observe(divRef.current);
      observerRefValue = divRef.current;

      return () => resizeObserver.unobserve(observerRefValue);
    }, []);

    return (
      <Paper
        ref={divRef}
        style={{ height: "100%", backgroundColor: "#87e0bb" }}
      >
        <Table width={width} />
      </Paper>
    );
  };

  return <Parent />;
}

export default Listagem;
