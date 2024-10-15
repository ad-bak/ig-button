import React, { useState, useRef, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import ReactConfetti from "react-confetti";
import StoryIcon from "../assets/trace";
import styles from "./InstagramButton.module.css";

const InstagramButton: React.FC = () => {
	const [showOptions, setShowOptions] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string>("none");
	const [isAnimating, setIsAnimating] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);

	const options = [
		{ id: "none", label: "None" },
		{ id: "story", label: "Story" },
		{ id: "publication", label: "Publication" },
		{ id: "both", label: "Both" },
	];

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setShowOptions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (selectedOption === "both") {
			setShowConfetti(true);
			const timer = setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
			return () => clearTimeout(timer);
		}
	}, [selectedOption]);

	const handleButtonClick = () => {
		setIsAnimating(true);
		const currentIndex = options.findIndex(
			(option) => option.id === selectedOption
		);
		const nextIndex = (currentIndex + 1) % options.length;
		setSelectedOption(options[nextIndex].id);
		setShowOptions(true);
		setTimeout(() => setIsAnimating(false), 300);
	};

	const getButtonStyle = () => {
		switch (selectedOption) {
			case "none":
				return styles.buttonNone;
			case "publication":
				return styles.buttonPublication;
			case "story":
				return styles.buttonStory;
			case "both":
				return styles.buttonBoth;
			default:
				return styles.buttonNone;
		}
	};

	const getIcon = (option: string) => {
		switch (option) {
			case "story":
				return <StoryIcon className={styles.icon} />;
			default:
				return <FaInstagram className={styles.icon} />;
		}
	};

	return (
		<div className="relative" ref={buttonRef}>
			<div className={styles.confettiWrapper}>
				{showConfetti && (
					<ReactConfetti
						width={window.innerWidth}
						height={window.innerHeight}
						recycle={false}
						numberOfPieces={100}
					/>
				)}
			</div>
			<button
				className={`
          border-1 
          w-20 h-20 border-2 border-gray-300 rounded-2xl 
          relative overflow-hidden
          hover:opacity-80 transition-all duration-200 
          ${getButtonStyle()}
          ${isAnimating ? styles.clickAnimation : ""}
        `}
				onClick={handleButtonClick}
				onMouseEnter={() => setShowOptions(true)}
			>
				<div className={styles.iconWrapper}>{getIcon(selectedOption)}</div>
				<div
					className={`${styles.backgroundTransition} ${
						selectedOption === "both" ? styles.backgroundBoth : ""
					}`}
				></div>
			</button>
			{showOptions && (
				<div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
					{options.map((option) => (
						<label key={option.id} className="flex items-center space-x-2 p-1">
							<input
								type="radio"
								name="instagramOption"
								value={option.id}
								checked={selectedOption === option.id}
								onChange={() => setSelectedOption(option.id)}
								className="form-radio"
							/>
							<span>{option.label}</span>
						</label>
					))}
				</div>
			)}
		</div>
	);
};

export default InstagramButton;
