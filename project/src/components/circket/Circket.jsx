import React, { useState, useEffect } from 'react';

const Circket = () => {
    const [liveScores, setLiveScores] = useState([]);

    useEffect(() => {
        fetch('/api/live-scores')
            .then(response => response.json())
            .then(data => setLiveScores(data.matches))
            .catch(error => console.error('Error fetching live scores:', error));
    }, []);

    return (
        <div>
            <h1>Live Football Match Scores</h1>
            <ul>
                {liveScores.map(match => (
                    <li key={match.id}>
                        {match.homeTeam.name} {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam} {match.awayTeam.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Circket;