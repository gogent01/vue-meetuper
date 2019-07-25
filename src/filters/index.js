import Vue from 'vue';
import moment from "moment";

const filters = () => {
  Vue.filter('capitalize', (value) => {
    if (value && typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      return ''
    }
  });

  Vue.filter('formatDate', (value, formatType = 'LL') => {
    if (!value) return '';

    return moment(value).format(formatType);
  });

  Vue.filter('fromNow', function(value) {
    if (!value) return '';

    return moment(value).fromNow();
  });
};

export default filters;