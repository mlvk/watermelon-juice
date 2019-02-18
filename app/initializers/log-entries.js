import config from 'watermelon-juice/config/environment';

export function initialize() {
  LE.init({token:config.logEntriesKey, catchall: true});
}

export default {
  name: 'log-entries',
  initialize
};
