import React from "react";
import GitHubCalendar from "react-github-calendar";

function Github() {
  return (
    <div className="text-white mb-7">
      <GitHubCalendar
        username="Dinesh99673"
        blockSize={15}
        blockMargin={5}
        color="#c08455"
        fontSize={16}
      />
    </div>
  );
}

export default Github;
