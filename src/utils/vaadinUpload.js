/**
 * Uploads the file in vaadin-upload component.
 *
 * @param {Object} event
 * @param {String} authorizationHeader
 */
export const vaadinFileUpload = async (event, authorizationHeader) => {
  await event.detail.xhr.setRequestHeader('Authorization', authorizationHeader);

  const formData = new FormData();

  formData.append('file', event.detail.file);

  await event.detail.xhr.send(formData);
};

export default { vaadinFileUpload };
