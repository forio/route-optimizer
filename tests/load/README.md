# Route Optimizer Load Tests

## Dependencies
- grinder 3.11 (install in `/usr/local/bin/`)
- node.js (recording only)

## Recording
1. Install project dependencies: `npm install`
2. Set your computer proxy to `localhost:3001`
3. run `./record_filtered`
4. Begin recording requests

## Playing
1. Configure settings in `grinder.properties`
2. run `./play`
3. Analyize the results

## Play environment variables

#### LOAD_SECURE

Type: `String`
Default: `"yes"`

Whether or not to use https.

#### LOAD_APP_HOST

Type: `String`
Default: `"forio.com"`

The hostname of the load test target.

#### LOAD_APP_PATH
Type: `String`
Default: `"showcase/route-optimizer"`

{{account}}/{{project}} segment of the application url.


#### LOAD_API_HOST
Type: `String`
Default: `"api.forio.com"`

The API hostname of the load test target.