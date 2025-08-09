const RATING_THRESHOLDS = [
  {min: 1, max: 4, classNames: 'red'},
  {min: 5, max: 7, classNames: 'gray'},
  {min: 8, max: 10, classNames: 'green'},
];

const determinesColorRating = (rating: number) => {
  const foundRating = RATING_THRESHOLDS.find(({min, max}) => rating >= min && rating <= max);
  return foundRating?.classNames;
};

export { determinesColorRating };
