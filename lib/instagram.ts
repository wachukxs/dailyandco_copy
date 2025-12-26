export function getInstagramMessage(product: {
  name: string
  price: number
  image?: string
  quantity?: number
}): string {
  const quantity = product.quantity || 1
  const totalPrice = product.price * quantity
  
  return `Hi! I'm interested in purchasing:\n\n` +
    `Product: ${product.name}\n` +
    `Unit Price: €${product.price.toFixed(2)}\n` +
    `Quantity: ${quantity}\n` +
    `Total: €${totalPrice.toFixed(2)}\n\n` +
    `Please let me know about availability and payment options. Thank you!`
}

export async function openInstagramDM(product: {
  name: string
  price: number
  image?: string
  quantity?: number
}): Promise<{ message: string; username: string }> {
  const message = getInstagramMessage(product)
  const instagramUsername = 'dailyandco._'
  
  // Return message and username for modal
  return { message, username: instagramUsername }
}

export function getInstagramCartMessage(items: Array<{ name: string; price: number; quantity: number }>, total: number): string {
  let message = `Hi! I'm interested in purchasing the following items:\n\n`
  
  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity
    message += `${index + 1}. ${item.name}\n   Unit Price: €${item.price.toFixed(2)} x ${item.quantity} = €${itemTotal.toFixed(2)}\n`
  })
  
  message += `\nTotal: €${total.toFixed(2)}\n\n` +
    `Please let me know about availability and payment options. Thank you!`
  
  return message
}

export async function openInstagramDMCart(items: Array<{ name: string; price: number; quantity: number }>, total: number): Promise<{ message: string; username: string }> {
  const message = getInstagramCartMessage(items, total)
  const instagramUsername = 'dailyandco._'
  
  // Return message and username for modal
  return { message, username: instagramUsername }
}

