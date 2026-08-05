export default {
  async paths() {
    return [
      { params: { cat: 'news', slug: 'hello' } },
      { params: { cat: 'news', slug: 'world' } },
      { params: { cat: 'blog', slug: 'first' } }
    ];
  }
};
