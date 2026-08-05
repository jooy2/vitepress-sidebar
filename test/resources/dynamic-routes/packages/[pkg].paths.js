export default {
  paths() {
    return [
      { params: { pkg: 'alpha', order: 3, label: 'Alpha Label' } },
      { params: { pkg: 'beta', order: 2 } },
      { params: { pkg: 'gamma', title: 'Gamma Package', order: 1 } }
    ];
  }
};
