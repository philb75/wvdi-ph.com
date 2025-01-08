async function testConnection() {
  try {
    const response = await fetch('/api/test-openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Say this is a test'
      })
    });
    
    const data = await response.json();
    console.log('API connection successful:', data.message);
  } catch (error) {
    console.error('API connection failed:', error);
  }
}

testConnection();
