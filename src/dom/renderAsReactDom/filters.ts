export const allowAny = () => true as true

export const oneOf =
	<T>(list: T[]) =>
	(v: T) =>
		list.includes(v)

export const exact =
	<T>(v1: T) =>
	(v2: T) =>
		v1 === v2

export const matches = (regex: RegExp) => (v: string) => regex.test(v)
