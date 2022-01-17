import { mapDomToReact } from './mapDomToReact'
import { parseStringToDom } from './parseStringToDom'

export const renderAsReactDom = /* (allowList: Allow[]) => */ (text: string) =>
	parseStringToDom(text).map(mapDomToReact)
