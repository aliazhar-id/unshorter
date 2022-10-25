import * as http from "http"
import * as https from "https"

type Options = http.RequestOptions | https.RequestOptions
type Protocol = typeof http | typeof https

/**
 *
 * @param url Short URL
 * @param opt Request Options
 * @returns Long URL / Original URL
 */
export function unshorter(url: string, opt: Options = {}): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const tracer = (uri: string, ptc: Protocol = https) => {
                if (uri.startsWith('http:')) {
                    ptc = http
                }
                // @ts-ignore
                ptc.get(uri, opt, ({ statusCode, headers: { location }, socket: { _host: host } }) => {
                    if ([301, 302, 303, 307, 308].includes(statusCode as number)) {
                        if (location) {
                            if (location.startsWith('/')) {
                                location = `https://${host}${location}`
                            }
                            tracer(location)
                            return
                        }
                    }
                    resolve(uri)
                }).on('error', (err) => reject(err))
            }
            tracer(url)
        } catch (err) {
            reject(err)
        }
    })
}
