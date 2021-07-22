import './App.css';
import { useState } from 'react';
import Signup from './pages/Signup';

const themePaths = ["colorPalettes/darkTheme.css", "colorPalettes/lightTheme.css"];

function App()
{
	const [colorPalette, setColorPalette] = useState(0);

	function changeColorPalette()
	{
		setColorPalette((colorPalette + 1) % themePaths.length);
	}

	return (
		<div>
			<style>
				{/* import font Doppio One */}
				@import url('https://fonts.googleapis.com/css2?family=Doppio+One&display=swap');
			</style>
			<link href={themePaths[colorPalette]} rel="stylesheet" />
			<Signup></Signup>
		</div>
		
	);
}

export default App;