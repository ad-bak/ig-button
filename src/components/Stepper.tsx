import React from "react";

interface Step {
	id: number;
	name: string;
	completed: boolean;
}

interface StepperProps {
	steps: Step[];
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
	return (
		<ol className="flex items-center w-full">
			{steps.map((step, index) => (
				<li
					key={step.id}
					className={`flex items-center ${
						index < steps.length - 1 ? "w-full" : ""
					}`}
				>
					<div
						className={`flex items-center justify-center w-10 h-10 rounded-full ${
							step.completed
								? "bg-blue-600 text-white"
								: "bg-gray-300 text-gray-500"
						}`}
					>
						{step.completed ? (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
						) : (
							step.id
						)}
					</div>
					<span
						className={`ml-2 text-sm font-medium ${
							step.completed ? "text-blue-600" : "text-gray-500"
						}`}
					>
						{step.name}
					</span>
					{index < steps.length - 1 && (
						<div
							className={`flex-1 h-0.5 mx-4 ${
								step.completed ? "bg-blue-600" : "bg-gray-300"
							}`}
						></div>
					)}
				</li>
			))}
		</ol>
	);
};

export default Stepper;
