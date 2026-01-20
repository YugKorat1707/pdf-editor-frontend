export const addToHistory = (toolName, fileName) => {
  const history = JSON.parse(localStorage.getItem('pdf_history') || '[]');
  const newEntry = {
    id: Date.now(),
    tool: toolName,
    file: fileName,
    date: new Date().toLocaleTimeString(),
  };
  // Keep only the last 5 entries
  const updatedHistory = [newEntry, ...history].slice(0, 5);
  localStorage.setItem('pdf_history', JSON.stringify(updatedHistory));
};