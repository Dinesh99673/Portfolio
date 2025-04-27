import React from "react";
import GitHubCalendar from "react-github-calendar";
import "../../App.css"

function Github() {
  return (
    <div className="calendar-container w-[100%] px-[10%] overflow-auto text-white mb-12 flex flex-col justify-center items-center">
        <GitHubCalendar
        username="Dinesh99673"
        blockSize={15}
        blockMargin={5}
        fontSize={10}

        />
    </div>
  );
}

export default Github;
