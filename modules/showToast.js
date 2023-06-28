export function showToast(toast, status, title, description) {
  toast({
    title,
    description,
    status,
    duration: 3000,
    position: 'bottom-right',
  })
}
