import { useState } from "react";
import { Button, Typography } from "@mui/material";

function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Typography variant="h4">Hello world</Typography>

      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Count clicked {count} times
      </Button>
    </>
  );
}

export default Dashboard;
