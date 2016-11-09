export function initialize() {
  localforage.config({
    driver      : localforage.LOCALSTORAGE,
    name        : 'watermelon-juice',
    version     : 1.0,
    storeName   : 'remote_sync_store', // Should be alphanumeric, with underscores.
    description : 'Route visit queue'
});
}

export default {
  name: 'local-forage',
  initialize
};
