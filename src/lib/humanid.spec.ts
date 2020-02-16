import test from 'ava';

import humanid from './humanid';

test('supports default options', t => {
  const [id, hash] = humanid();
  t.log(id)
  t.log(hash)
  t.true(id.length > 0);
  t.true(hash.length > 0);
});

test('returns non-null ids and hashes', t => {
  const [id, hash] = humanid({
    prefix: 'hashprefix',
    suffix: 'hashsuffix'
  });
  t.true(id.length > 0);
  t.true(hash.length > 0);
});

test('supports prefix and suffix options', t => {
  const [id] = humanid({
    prefix: 'hashprefix',
    suffix: 'hashsuffix'
  });

  const [prefix, , , , suffix] = id.split('-');

  t.true(prefix === 'hashprefix');
  t.true(suffix === 'hashsuffix');
});
