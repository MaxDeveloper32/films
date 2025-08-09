const formatMovieDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if(hours === 0){
    return `${mins}M`;
  }

  return `${hours}H ${mins}M`;
};


export { formatMovieDuration };
