import { useState } from "react";

function Sidebar() {
  const [hovered, setHovered] = useState(null);

  const sidebarStyle = {
    width: "220px",
    height: "100vh",
    background: "linear-gradient(180deg, #1a1a2e, #16213e)",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    color: "#fff",
    boxShadow: "4px 0 10px rgba(0, 0, 0, 0.4)",
    fontFamily: "Arial, sans-serif"
  };

  const linkStyle = (index) => ({
    display: "block",
    margin: "15px 0",
    padding: "10px 15px",
    borderRadius: "8px",
    color: hovered === index ? "#00f7ff" : "#ccc",
    backgroundColor: hovered === index ? "rgba(0, 247, 255, 0.1)" : "transparent",
    textDecoration: "none",
    fontWeight: "600",
    letterSpacing: "1px",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer"
  });

  const navItems = [
    { label: "🏠 Home", href: "#" },
    { label: "➕ Add Recipe", href: "#" },
    { label: "📖 All Recipes", href: "#" },
    { label: "⚙️ Settings", href: "#" },
  ];

  return (
    <div style={sidebarStyle}>
      <h2 style={{ color: "#00f7ff", marginBottom: "30px", fontSize: "24px" }}>
        🍴 Recipe App
      </h2>

      {navItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          style={linkStyle(index)}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export default Sidebar;
