import logo from './logo.svg';
import './App.css';
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Flex, Text, Button } from "@radix-ui/themes";
import { BaseButton } from '@radix-ui/themes/components/_internal/base-button';
import Header from './header';
import ScoreboardList from './homeScoreboardList';



function App() {
	return (
		<div>
		<Header />
		<ScoreboardList />
		</div>
	);
}

export default App;
