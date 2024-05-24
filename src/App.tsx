import { useState } from "react";

import { SchalkExample } from "./schalk-example";

function App() {
	const [colour, setColour] = useState("grey");
	return (
		<>
			<div
				style={{ backgroundColor: colour, width: "200px", height: "200px" }}
			/>
			<br />
			<button onClick={() => setColour("grey")}>Reset</button>
			<br />
			<SchalkExample
				colour={colour}
				onColourChange={(event) => {
					event.target;
					//    ^?
					event.currentTarget;
					//    ^?
					event.currentTarget.colour;
					//    						  ^?
					event.detail;
					//    ^?
					setColour(event.detail);
				}}
				onClick={(event) => {
					event.target;
					//    ^?
					event.currentTarget;
					//    ^?
					event.currentTarget.colour;
					//    						  ^?
				}}
			/>
		</>
	);
}

export default App;
