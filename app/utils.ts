export const capitalize = (w: string) => `${w[0].toUpperCase()}${w.slice(1)}`

export const formatTime = (t: string) => {
  // time string like "17:30" returns "5:30 pm"
  const [hours, minutes] = t.split(':').map(Number);
  if (hours > 12) {
    return `${hours % 12}:${minutes} pm`
  }
  return `${hours}:${minutes} am`
}

export const addTime = (t: string, amount: number) => {
  const [hours, minutes] = t.split(':').map(Number);

  const totalMinutes = hours * 60 + minutes + amount;
  const normalizedMinutes = totalMinutes % 1440; // Wrap around 24 hours

  const newHours = Math.floor(normalizedMinutes / 60);
  const newMinutes = normalizedMinutes % 60;

  const formattedHours = String(newHours).padStart(2, '0');
  const formattedMinutes = String(newMinutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}
