import React from "react";
import Stepper from "./Stepper";
import InstagramButton from "./InstagramButton";

const steps = [
	{ id: 1, name: "Publication", completed: true },
	{ id: 2, name: "Story", completed: true },
	{ id: 3, name: "Email", completed: false },
];

const Page: React.FC = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<Stepper steps={steps} />
			</div>
			<div className="bg-white shadow-md rounded-lg p-6">
				<h1 className="text-2xl font-bold mb-4">Page Content</h1>
				<p className="mb-4">Your main page content goes here.</p>
				<InstagramButton />
			</div>
		</div>
	);
};

export default Page;
