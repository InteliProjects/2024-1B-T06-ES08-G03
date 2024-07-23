import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 500,
  duration: '1m',
};

export default function () {
  const res = http.get('http://localhost:3022');

  check(res, {
    'status_was_200': function (r) { return r.status === 200; },
    'transaction_less_or_3': function (r) { return r.timings.duration <= 3000; },
    'transaction_between_3_and_5': function (r) { return r.timings.duration > 3000 && r.timings.duration <= 5000; },
    'transaction_between_5_and_10': function (r) { return r.timings.duration > 5000 && r.timings.duration <= 10000; },
    'transaction_between_10_and_15': function (r) { return r.timings.duration > 10000 && r.timings.duration <= 15000; },
    'transaction_more_than_15': function (r) { return r.timings.duration > 15000; },
});

  sleep(1);
}
