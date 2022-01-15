type Key<T> = string & keyof T

const initQps = <T extends Record<string, string>>(init?: T) => {
	const deleteProperty = (cache: Partial<T>, key: Key<T>) => {
		const url = new URL(window.location.href)

		url.searchParams.delete(key)
		delete cache[key]

		window.history.replaceState({}, document.title, url.href)

		return true
	}

	const get = (cache: Partial<T>, key: Key<T>) => {
		if (key in cache) {
			return cache[key]
		}

		const url = new URL(window.location.href)

		return url.searchParams.get(key)
	}

	const set = (cache: Partial<T>, key: Key<T>, val: T[typeof key]) => {
		const url = new URL(window.location.href)

		if (typeof val === 'undefined') {
			return deleteProperty(cache, key)
		}

		url.searchParams.set(key, val)
		cache[key] = val

		window.history.replaceState({}, document.title, url.href)

		return true
	}

	const qpsProxy = new Proxy(
		Object.setPrototypeOf({ ...init }, null) as Partial<T>,
		{
			get,
			set,
			deleteProperty,
		},
	)

	for (const [key, val] of Object.entries(init ?? {})) {
		qpsProxy[key as Key<T>] = val as T[typeof key]
	}

	return qpsProxy
}

export const qps = initQps<{
	list: string
}>()
