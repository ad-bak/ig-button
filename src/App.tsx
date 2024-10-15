import SideNav from "./components/SideNav";
import Page from "./components/Page";

function App() {
	return (
		<div className="flex">
			<SideNav />
			<main className="flex-1">
				<Page />
			</main>
		</div>
	);
}

export default App;
