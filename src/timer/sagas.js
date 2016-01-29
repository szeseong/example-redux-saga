import { call, take, put, race } from 'redux-saga';
import actions from './actions';

const ONE_SECOND = 1000;

// wait :: Number -> Promise
const wait = ms => (
  new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
);

export function* startTicking(MILISECONDS) {
  while(true) {
    yield call(wait, MILISECONDS);
    yield put(actions.tick());
  }
}

function* runTimer(getState) {
  // Wake up when user starts timer.
  while(yield take('START')) {
    yield race([
      take('STOP'),
      call(startTicking,ONE_SECOND)
    ])
  }
}

export default [ runTimer ];
