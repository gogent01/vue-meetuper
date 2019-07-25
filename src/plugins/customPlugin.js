const customPlugin = {
  install: function (Vue, options) {

    // Add global method or property
    Vue.myGlobalMethod = function () {
      alert('I am global method');
    };

    Vue.myCustomProperty = 'I am custom Property';

    // Add directives
    Vue.directive('blue-color', {
      bind (el, binding) {
        el.style.color = 'blue'
      }
    });

    // Add component options, mixins
    Vue.mixin({
      data () {
        return {
          custom_message: 'RAWR'
        }
      },
      created () {
        console.log('Custom mixin created')
      },
      methods: {
        scream () {
          alert(this.custom_message);
        }
      }
    });

    // Add in instance method/property
    Vue.prototype.$customMethod = function () {
      alert('I am custom instance method');
    }
  }
};

export default customPlugin;