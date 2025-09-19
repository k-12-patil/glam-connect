import React from "react";
import { FaPiggyBank } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Import Link

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* ABOUT */}
        <div style={styles.column}>
          <h4 style={styles.heading}>About Glam Connect</h4>
          <ul style={styles.list}>
            <li>
              <Link to="/about" style={styles.link}>Our Story</Link> {/* ✅ Navigate to About page */}
            </li>
            <li>
              <Link to="/hfome" style={styles.link}>Back to Glam Connect</Link>
            </li>
          </ul>
        </div>

        {/* SHOPPING */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Shopping Online</h4>
          <ul style={styles.list}>
            <li>
              <Link to="/myaccount" style={styles.link}>My Account</Link>
            </li>
          </ul>
        </div>

        {/* HELP */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Need Help?</h4>
          <ul style={styles.list}>
            <li>
              <Link to="/about" style={styles.link}>Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div style={styles.bottom}>
        <p style={styles.copyText}>&copy; 2025 Glam Connect. All rights reserved.</p>
      </div>
    </footer>
  );
};

// ✅ Inline CSS
const styles = {
  footer: {
    backgroundColor: "#eb589aff",
    color: "#fff",
    padding: "40px 20px",
    marginTop: "50px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  column: {
    flex: "1",
    minWidth: "200px",
    margin: "10px",
  },
  heading: {
    fontSize: "18px",
    marginBottom: "15px",
    borderBottom: "2px solid #651427ff",
    display: "inline-block",
    paddingBottom: "5px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    color: "#762337ff",
  },
  
  link: {
    color: "#f5eaeaff",
    textDecoration: "none",
    display: "block",
    margin: "8px 0",
    transition: "color 0.3s",
  },
  bottom: {
    borderTop: "1px solid #333",
    marginTop: "30px",
    paddingTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  copyText: {
    fontSize: "14px",
    color: "#f7eaeaff",
  },
  social: {
    display: "flex",
    gap: "15px",
  },
  iconLink: {
    display: "inline-block",
  },
  icon: {
    width: "25px",
    height: "25px",
    filter: "brightness(0) invert(1)", // ✅ makes icons white
    transition: "transform 0.3s",
  },
};

// ✅ Hover effect for links (inline JS trick)
styles.link[":hover"] = { color: "#ff4081" };
styles.icon[":hover"] = { transform: "scale(1.2)" };

export default Footer;
