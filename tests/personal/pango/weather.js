const global = require("../../../commands.conf");

describe('Weather', () => {

    it('Fetch data from the API', async () => {
        await global.saveWeatherDataAPI()
    })

    it('Fetch data from the APP', async () => {
        await global.saveWeatherDataAPP()
    });

    it('Fetch data from the WEB', async () => {
        await global.saveWeatherDataWEB()
    })

    it('Compare data API -> APP -> WEB', async () => {
        await global.compareWeatherData()
    })
});