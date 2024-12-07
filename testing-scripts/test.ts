//script to populate the database with dummy data for testing purpose

const axios = require('axios');

const populateNotes = async () => {
  const API_URL = 'http://localhost:3000/api/notes';
  const testNotes = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Sample Note ${i + 1}`,
    content: `This is the content of sample note ${i + 1}`,
    tags: [`tag${(i % 5) + 1}`, `tag${(i % 3) + 1}`],
    category: `Category ${i % 4}`,
    createdBy: `user${i % 10}`,
    attachments: [`attachment${i + 1}.jpg`],
    version: i % 2,
  }));

  try {
    for (const note of testNotes) {
      const response = await axios.post(API_URL, note);
      console.log(`Note ${note.id} added:`, response.data);
    }
    console.log('All notes added successfully!');
  } catch (error) {
    console.error('Error adding notes:', error.message);
  }
};

populateNotes();