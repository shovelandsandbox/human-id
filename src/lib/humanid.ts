import { pseudoRandomBytes } from 'crypto';

import adjectives from '../dictionaries/adjectives.json';
import animals from '../dictionaries/animals.json';
import colors from '../dictionaries/colors.json';

import * as hash from './hash';

type SegmentGenerator = (...args: any) => string;
type GenerateOptions = {
  prefix?: string | SegmentGenerator;
  suffix?: string | SegmentGenerator;
  separator?: string;
  includeColorAttribute?: boolean;
};

//
//  type guards
//
const isSegmentGenerator = (v: any): v is SegmentGenerator =>
  v !== null && (v as SegmentGenerator).call !== undefined;

//
//  utilities for getting random data
//
function randomIndexFor(arr: any[]) {
  try {
    return arr[Math.floor(Math.random() * arr.length)];
  } catch (error) {
    console.error('[fn randomIndex] encountered an error: \n', error);
    return error;
  }
}

function getRandomIdSegments(): string[] {
  return [
    randomIndexFor(colors),
    randomIndexFor(adjectives),
    randomIndexFor(animals)
  ];
}

export function randomHexSeed(): string {
  const randomBuffer: Buffer = pseudoRandomBytes(Math.ceil(5 / 2));

  return randomBuffer.toString('hex').slice(0, 5);
}

export default function humanid(options?: GenerateOptions) {
  const opts = Object.assign(
    {},
    {
      prefix: null,
      suffix: randomHexSeed,
      separator: '-'
    },
    options
  );
  const joined = []
    .concat(
      [isSegmentGenerator(opts.prefix) ? opts.prefix() : opts.prefix],
      getRandomIdSegments(),
      [isSegmentGenerator(opts.suffix) ? opts.suffix() : opts.suffix]
    )
    .filter(Boolean)
    .join(opts.separator);

  return [joined, hash.sha256Native(joined)];
}
