const {StartConfigurationSessionCommand, GetLatestConfigurationCommand, AppConfigDataClient} = require("@aws-sdk/client-appconfigdata");
const {fromIni} = require("@aws-sdk/credential-providers");

const AWS_REGION = 'us-west-2';
const APPLICATION = 'BW-Test';
const CONFIG_PROFILE = 'default-feature-profile';
const ENVIRONMENT = 'Dev';

let credentials = fromIni({ profile: "production" });
const client = new AppConfigDataClient({region: AWS_REGION, credentials: credentials})

let token;
let last_received;
let poll_interval_seconds;
let flags;

async function getToken() {
    if (!token) {
        const cmd = new StartConfigurationSessionCommand({
            ApplicationIdentifier: APPLICATION,
            ConfigurationProfileIdentifier: CONFIG_PROFILE,
            EnvironmentIdentifier: ENVIRONMENT
        })
        const sessionToken = await client.send(cmd);
        token = sessionToken.InitialConfigurationToken
    }

    return token;
}

function _toFlags(utf8Array) {
    const jsonString = Buffer.from(utf8Array).toString('utf8')
    return JSON.parse(jsonString);
}

async function _fetchFlags() {
    let t = await getToken();
    const cmd = new GetLatestConfigurationCommand({
        ConfigurationToken: t
    });
    const resp = await client.send(cmd);
    flags = _toFlags(resp.Configuration);
    poll_interval_seconds = resp.NextPollIntervalInSeconds;
    last_received = Date.now();
}

function _checkExpired() {
    if (!last_received || !poll_interval_seconds) {
        return true
    }

    return Math.abs(last_received - Date.now()) / 1000 > poll_interval_seconds;
}

async function checkFlag(flag) {
    return (await getFlags())[flag]?.enabled
}

async function getFlags() {
    if (!flags || _checkExpired()) {
        await _fetchFlags();
    }
    return flags
}

module.exports = {
    checkFlag,
    getFlags
}