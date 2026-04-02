import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/destinations';

export default function DestinationDetails() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        // Find the place in the categories data
        let foundPlace = null;
        for (const category of categories) {
            foundPlace = category.data.find(p => p.name === decodeURIComponent(name));
            if (foundPlace) break;
        }

        if (foundPlace) {
            setPlace(foundPlace);
        }
    }, [name]);

    if (!place) {
        return (
            <div style={{ textAlign: "center", padding: "50px" }}>
                <h2>Destination Not Found</h2>
                <button
                    onClick={() => navigate('/home')}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        backgroundColor: "var(--primary-color, #007bff)",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Back to Home
                </button>
            </div>
        );
    }

    const styles = {
        container: {
            fontFamily: "'Poppins', sans-serif",
            color: "#333",
            lineHeight: "1.6",
        },
        hero: {
            height: "60vh",
            backgroundImage: `url(${place.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        heroOverlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
        },
        heroTitle: {
            position: "relative",
            color: "white",
            fontSize: "4rem",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
        },
        contentSection: {
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "40px 20px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "40px",
        },
        mainContent: {
            paddingRight: "20px",
        },
        sidebar: {
            backgroundColor: "#f9f9f9",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
            height: "fit-content",
        },
        sectionTitle: {
            fontSize: "2rem",
            marginBottom: "20px",
            color: "#2c3e50",
            borderBottom: "2px solid #eee",
            paddingBottom: "10px",
        },
        description: {
            fontSize: "1.1rem",
            color: "#555",
            marginBottom: "30px",
            whiteSpace: "pre-line",
        },
        detailItem: {
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
        },
        detailLabel: {
            fontWeight: "bold",
            color: "#2c3e50",
            minWidth: "80px",
        },
        detailValue: {
            color: "#555",
        },
        ctaButton: {
            display: "block",
            width: "100%",
            padding: "15px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            textAlign: "center",
            marginTop: "20px",
            transition: "background 0.3s ease",
        },
        mapButton: {
            display: "block",
            width: "100%",
            padding: "12px",
            backgroundColor: "white",
            color: "#e74c3c",
            border: "2px solid #e74c3c",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            textAlign: "center",
            marginTop: "10px",
            textDecoration: "none",
        }
    };

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <div style={styles.hero}>
                <div style={styles.heroOverlay}></div>
                <h1 style={styles.heroTitle}>{place.name}</h1>
            </div>

            {/* Content Section */}
            <div style={styles.contentSection}>
                {/* Main Description */}
                <div style={styles.mainContent}>
                    <h2 style={styles.sectionTitle}>Overview</h2>
                    <p style={styles.description}>
                        {place.readmore || place.description}
                    </p>

                    {/* Additional Map integration could go here */}
                </div>

                {/* Sidebar Details */}
                <div style={styles.sidebar}>
                    <h3 style={{ marginBottom: "20px", color: "#333" }}>Trip Details</h3>

                    <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>💰 Budget:</span>
                        <span style={styles.detailValue}>{place.budget || "Variable"}</span>
                    </div>

                    <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>🗺️ Area:</span>
                        <span style={styles.detailValue}>{place.area || "Various"}</span>
                    </div>

                    <button
                        style={styles.ctaButton}
                        onClick={() => navigate('/plan-your-trip', { state: { destination: place.name } })}
                    >
                        Plan Your Trip Here
                    </button>

                    {place.link && (
                        <a
                            href={place.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.mapButton}
                        >
                            📍 View on Google Maps
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
