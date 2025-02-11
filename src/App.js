import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Flex, Text, Button } from "@radix-ui/themes";
import { BaseButton } from '@radix-ui/themes/components/_internal/base-button';
import Header from './Components/header';
import FullSchedule from './Components/fullschedulepage';
import ScoreboardList from './Components/homeScoreboardList';



function App() {
	return (
		<BrowserRouter>

			<div>
				<Header />
				<Routes>

					<Route index element={<ScoreboardList />} />\
					<Route path="/fullschedule" element={<FullSchedule />} />
					{/* <Route path="/full%20schedule" element={<BasicDateCalendar />} /> */}
			


				</Routes >
			</div>
		</BrowserRouter>

	);
}

export default App;
