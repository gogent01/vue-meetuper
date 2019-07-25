import {helpers} from 'vuelidate/lib/validators';

export const supportedFileType = value => {
  if(!helpers.req(value)) return true;

  const allowedFormats = ['jpeg','png','jpg','gif'];
  const extension = value.split('.').pop();
  return allowedFormats.includes(extension);
};