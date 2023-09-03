# purpleAirHueIntegration

Integration between PurpleAir sensors and Philips Hue Lights.

## API Keys

This project requires API keys for both [PurpleAir](https://community.purpleair.com/t/creating-api-keys/3951) and [Philips Hue Developer](https://developers.meethue.com/). So you will need to get your own set of keys before running this project.

## Installation

1. Install the [Node version](https://nodejs.org/en) in the `.nvmrc`.

   - I have tested this project on both the Node v18 and v20 LTS.

1. Install [Yarn classic](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).

   - You could try Yarn v2+ but I haven't tested that out

1. Run `yarn` to install the required node_modules

1. Find a sensor ID on the [PurpleAir map](https://map.purpleair.com/) that you want to pull the data from

   - click on a sensor you want then in the url there will be a query param `select=...`. The value for `select` will be the sensor ID

1. Setup your Hue Lights with your Hue Bridge

1. Create a `.env` file to keep track of your API keys and home air quality sensor

   ```
   HUE_API_KEY="..."               // string
   PURPLE_AIR_READ_API_KEY="..."   // string
   PURPLE_AIR_WRITE_API_KEY="..."  // string
   HOME_AIR_SENSOR=...             // number
   DEFAULT_LIGHTS="light1,light2"  // string list
   ```

   Note: `DEFAULT_LIGHTS` is an optional way to supply a list of lights you want synced to the air quality. I didn't want all of my lights in my place to be synced.

1. Run `yarn start` to set your lights to match the air quality

## Limitations

Please review the [PurpleAir API Guidelines](https://community.purpleair.com/t/api-use-guidelines/1589) if you plan to run this in an automated fashion. I personally have this setup using a cronjob on a 15m interval to limit hammering the API.

It's also important to note that the sensors only update every 2m so I would recommend that as a minimum frequency, but honestly 15m should be fine for most usecases.

This project is setup to only use 1 sensor's data at a time, but I am open to pull requests to adjust that :)