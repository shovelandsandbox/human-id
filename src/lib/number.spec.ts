// tslint:disable:no-expression-statement
import test from 'ava';
import { double, power } from './number';

test.skip('double', t => {
  t.is(double(2), 4);
});

test.skip('power', t => {
  t.is(power(2, 4), 16);
});
