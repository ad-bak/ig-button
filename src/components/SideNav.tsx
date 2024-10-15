import { useState } from "react";

interface MenuItem {
	id: string;
	label: string;
	href: string;
}

interface Section {
	id: string;
	label: string;
	items: MenuItem[];
}

const sections: Section[] = [
	{
		id: "dashboard",
		label: "Dashboard",
		items: [
			{ id: "overview", label: "Overview", href: "/dashboard/overview" },
			{ id: "analytics", label: "Analytics", href: "/dashboard/analytics" },
			{ id: "reports", label: "Reports", href: "/dashboard/reports" },
		],
	},
	{
		id: "projects",
		label: "Projects",
		items: [
			{ id: "active", label: "Active Projects", href: "/projects/active" },
			{
				id: "archived",
				label: "Archived Projects",
				href: "/projects/archived",
			},
			{ id: "create", label: "Create New Project", href: "/projects/create" },
		],
	},
	{
		id: "settings",
		label: "Settings",
		items: [
			{ id: "profile", label: "Profile Settings", href: "/settings/profile" },
			{ id: "security", label: "Security", href: "/settings/security" },
			{
				id: "notifications",
				label: "Notifications",
				href: "/settings/notifications",
			},
		],
	},
];

const SideNav: React.FC = () => {
	const [expandedSections, setExpandedSections] = useState<string[]>([]);

	const toggleSection = (sectionId: string) => {
		setExpandedSections((prev) =>
			prev.includes(sectionId)
				? prev.filter((id) => id !== sectionId)
				: [...prev, sectionId]
		);
	};

	return (
		<nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
			<h1 className="text-2xl font-bold mb-6">My App</h1>
			{sections.map((section) => (
				<div key={section.id} className="mb-4">
					<button
						className="flex items-center justify-between w-full text-left font-semibold py-2 px-4 rounded hover:bg-gray-700"
						onClick={() => toggleSection(section.id)}
					>
						{section.label}
						<span className="transform transition-transform duration-200">
							{expandedSections.includes(section.id) ? "▼" : "▶"}
						</span>
					</button>
					{expandedSections.includes(section.id) && (
						<ul className="ml-4 mt-2 space-y-2">
							{section.items.map((item) => (
								<li key={item.id}>
									<a
										href={item.href}
										className="block py-1 px-4 rounded hover:bg-gray-700"
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					)}
				</div>
			))}
		</nav>
	);
};

export default SideNav;
