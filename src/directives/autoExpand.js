export default {
  bind (el) {
    el.__AutoResizer__ = () => {
      setTimeout(() => { // set timeout tells browser to finish rendering before executing functions below
        el.style.cssText = 'height: auto';
        const height = el.scrollHeight + 2;
        el.style.cssText = 'height:' + height + 'px';
      }, 0)
    };

    el.addEventListener('keydown', el.__AutoResizer__);
  },
  unbind (el) {
    el.removeEventListener('keydown', el.__AutoResizer__);
  }
}