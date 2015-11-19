import { Engine } from 'linked-html/linked-html';

export default class MyEngine extends Engine {
  sort() {
    const list = this.state.products;
    list.sort((a,b)=> a.price - b.price);
  }

  remove() {
    // Here we have to call "root" because method is
    // called in "nested" Engine with state that points to
    // product in the list.
    // "root" property always points to main Engine instance
    const list = this.root.state.products;

    // When we remove element from that list it will be
    // reflected in the view. Nested Engine for list has
    // additional special helper properties like index,
    // odd, even, number to help with task like this:
    list.splice(this.index, 1);
  }
}
