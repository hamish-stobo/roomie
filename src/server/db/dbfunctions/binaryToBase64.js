const convertToBase64 = async binary => {
    const buffer = await Buffer.from(binary)
    const base64 = await buffer.toString('base64')
    return `data:image/jpeg;base64,${base64}`
}

module.exports = convertToBase64