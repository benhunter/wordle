import { DateTime } from 'luxon';

function getSolutionWord(): string {
  const now = DateTime.now();

  console.log(now);

  return 'ALERT';
}

export default getSolutionWord;
