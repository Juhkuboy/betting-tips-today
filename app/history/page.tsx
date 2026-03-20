import { useState, useEffect } from 'react';
import axios from 'axios';

const TipsterSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tipsters, setTipsters] = useState([]);

  useEffect(() => {
    const fetchTipsters = async () => {
      try {
        const response = await axios.get('/api/nickname-tipsters');
        setTipsters(response.data);
      } catch (error) {
        console.error('Error fetching tipsters:', error);
      }
    };
    fetchTipsters();
  }, []);

  const filteredTipsters = tipsters.filter(tipster =>
    tipster.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for tipster nicknames..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h3>Tipster Verification Results:</h3>
      <ul>
        {filteredTipsters.map(tipster => (
          <li key={tipster.id}>
            {tipster.nickname} - ROI: {tipster.roi}%, Verified: {tipster.verified ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipsterSearch;
