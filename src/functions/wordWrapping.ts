export const wordWrapping = (
	text: string,
	maxWordLength: number = 35
): string => {
	return text
		.split(' ')
		.map(word => {
			if (word.length > maxWordLength) {
				let result = ''

				for (let i = 0; i < word.length; i += maxWordLength) {
					result += word.slice(i, i + maxWordLength) + ' '
				}

				return result.trim()
			}

			return word
		})
		.join(' ')
}
