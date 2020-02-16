# HumanID

Memorable and reasonably collision-resistant identifiers with corresponding hashes; built using Node v12.13.0 and Typescript.

## Installation

`npm i --save humanid` or `yarn add humanid`

## Usage

```js
import humanid from 'humanid'

const [id, hash] = humanid()

console.log(id) // magenta-jealous-deer-b17de
console.log(hash) // befb40615238054022dd92934aa65cc14ead1c0812e6c05830aef6aa1b4bfeba
```

## Identifier Anatomy
`(prefix)-(color attribute)-[color]-[adjective]-[animal]-(suffix)`

## Options
| option | type | default |
|---|---|---|
| prefix | `string | (...args: any) => string` | null |
| suffix | `string | (...args: any) => string` | `randomHexSeed()` |
| includeColorAttribute | `boolean` | `false` |
| separator | `string` | `-` |

## Dictionaries
[animals](./dictionaries/animals.json)

[adjectives](./dictionaries/adjectives.json)

[color-attributes](./dictionaries/color-attributes.json)

[colors](./dictionaries/colors.json)

## Other Exports/Utilities
#### Types

```ts
// string generator function
export type SegmentGenerator = (...args: any) => string;

// type guard
export const isSegmentGenerator = (v: any): v is SegmentGenerator =>
  v !== null && (v as SegmentGenerator).call !== undefined;

export type Configuration = {
  prefix?: string | SegmentGenerator;
  suffix?: string | SegmentGenerator;
  separator?: string;
  includeColorAttribute?: boolean;
};
```

#### Functions
`randomHexSeed`

## Roadmap
- [ ] Allow dictionary overrides
- [ ] Expand `randomHexSeed` to allow overriding the generated buffer, format, and length

## Credits & Thanks
[bitjson/typescript-starter](https://github.com/bitjson/typescript-starter)—for providing such a painless tsc library starter kit and hashing
