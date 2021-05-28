function getConfig() {
	let xhr = new XMLHttpRequest();
    // While a synchronous XMLHttpRequest is not considered best practice, it was the simpliest solution without more 
    // changes to the existing code.  As the request is from the same host as this file, it is unlikely to have issues.
    xhr.open('GET', './config.json', false);

    xhr.send();
    console.log(xhr.response);
    try {
        return JSON.parse(xhr.response);
    } catch {
        return null;
    }
}
export const configData = getConfig();

export const API_URL: string = configData?.API_URL ?? process.env.API_URL ?? "https://lingo-server.health.test.act.gov.au/";
export const PAGE_SIZE: number = 100;