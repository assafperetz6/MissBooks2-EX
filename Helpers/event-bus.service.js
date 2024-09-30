export const emitter = new EventTarget()
export const showSuccessMsg = window.showSuccessMsg = txt => emitter.dispatchEvent(new Event('show-user-msg', { txt, type: 'Success' }))
export const showErrorMsg = window.showErrorMsg = txt => emitter.dispatchEvent(new Event('show-user-msg', { txt, type: 'Error' }))