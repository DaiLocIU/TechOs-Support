
export const formatPhoneNumber = (input, country) => {
    if (!input) return ''

    // remove all non-digit characters
    let phoneNumber = input.replace(/[^\d]+/g, '');
    console.log('country.countryCode', country.countryCode)
    if (country.countryCode) {
        // Remove the country code prefix if provided
        phoneNumber = phoneNumber.substr(
            String(country.countryCode).length
        )
    } else if (input.startsWith('+')) {
        return input
    }
    const pattern = country.pattern

    if (!pattern) return phoneNumber

    const result = [] // result array of characters
    let j = 0 // pointer for the pattern

    for (let i = 0; i < phoneNumber.length; i++) {
        while (j < pattern.length && pattern[j] !== '#') {
            result.push(pattern[j])
            if (pattern[j] === phoneNumber[i]) {
                i++
                if (i === phoneNumber.length) {
                    break
                }
            }
            j++
        }
        result.push(phoneNumber[i])
        j++
    }
    return result.join('')
    
}

export const getLeftPattern = (pattern, phoneNumber) => {
    let leftPattern = pattern && pattern.length > phoneNumber.length 
    ? pattern.slice(phoneNumber.length)
    : ""
    if (leftPattern) {
        leftPattern = leftPattern.replace(/#/g, '—')
    }
    return leftPattern
}