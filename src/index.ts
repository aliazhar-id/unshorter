import * as http from 'http';
import * as https from 'https';

export async function unshort(url: string, options = {}): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        try {
            const tracer = (uri: string) => {
                function io(p: typeof http | typeof https) {
                    p.get(uri, options, function ({ headers, statusCode = 200 }) {
                        if ([301, 302, 303, 307, 308].includes(statusCode)) {
                            if (headers.location) {
                                tracer(headers.location);
                                return;
                            }
                        }
                        resolve(uri);
                    }).on('error', (e) => reject(e));
                }
                try {
                    io(http);
                } catch {
                    io(https);
                }
            }
            tracer(url);
        } catch (err) {
            reject(err);
        }
    });
}
