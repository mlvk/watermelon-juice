import config from '../config/environment';

export function initialize() {
  LE.init({token:config.logEntriesKey, catchall: true});
}

export default {
  name: 'log-entries',
  initialize
};
