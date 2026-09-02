import React from "react";
import GitHubCalendar from "react-github-calendar";
import "../../App.css"

function Github() {
  return (
    <div className="calendar-container w-[100%] overflow-auto text-ash mb-12 flex flex-col justify-center items-center">
        <GitHubCalendar
        username="Dinesh99673"
        blockSize={15}
        blockMargin={5}
        fontSize={10}
        theme={{
          dark: ["#1c1c21", "#5a3d24", "#8a5a2f", "#c07f42", "#EDAD72"],
        }}
        colorScheme="dark"
        />
    </div>
  );
}

export default Github;
