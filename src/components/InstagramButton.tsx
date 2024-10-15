import React, { useState, useRef, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import StoryIcon from "../assets/trace";
import styles from "./InstagramButton.module.css";

const InstagramButton: React.FC = () => {
	const [showOptions, setShowOptions] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string>("none");
	const [_p, setPreviousOption] = useState<string>("none");
	const [isAnimating, setIsAnimating] = useState(false);
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

	const handleButtonClick = () => {
		setIsAnimating(true);
		const currentIndex = options.findIndex(
			(option) => option.id === selectedOption
		);
		const nextIndex = (currentIndex + 1) % options.length;
		setPreviousOption(selectedOption);
		setSelectedOption(options[nextIndex].id);
		setShowOptions(true);
		setTimeout(() => setIsAnimating(false), 300);
	};

	const getButtonStyle = () => {
		switch (selectedOption) {
			case "none":
				return "bg-transparent text-gray-700";
			case "publication":
				return "bg-transparent text-[#E1306C]";
			case "story":
				return "bg-gray-100 text-[#E1306C]";
			case "both":
				return "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white";
			default:
				return "bg-transparent text-gray-700";
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
			<button
				className={`
					w-20 h-20 border-2 border-gray-300 rounded-lg 
					relative overflow-hidden
					hover:opacity-80 transition-all duration-200 
					${getButtonStyle()}
					${isAnimating ? styles.clickAnimation : ""}
				`}
				onClick={handleButtonClick}
				onMouseEnter={() => setShowOptions(true)}
			>
				<AnimatePresence initial={false}>
					<motion.div
						key={selectedOption}
						initial={{ x: 100, rotate: selectedOption === "story" ? 90 : 0 }}
						animate={{ x: 0, rotate: 0 }}
						exit={{ x: -100, rotate: selectedOption === "story" ? -90 : 0 }}
						transition={{ duration: 0.3 }}
						className={styles.iconWrapper}
					>
						{getIcon(selectedOption)}
					</motion.div>
				</AnimatePresence>
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
