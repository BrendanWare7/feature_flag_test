# Feature Flag Test
Testing AppConfig for suitability as a feature flag framework

## To Run

The whole test is docker-ized. Running `docker compose up` from the main directory should start the following services:

1) Frontend - localhost:3010
2) Backend - localhost:3011
3) Redis - localhost:6379

## Flag(s) Used
### Note: flags are case-sensitive
* test_FF
  * generic FF, used to check enable/disable

## How To
Start all services, verify the following (assumes FF is disabled):
* Front-end red message is not visible
* Front-end blue message is visible
* Backend ping fails (status 401)
* Backend pong succeeds

After flipping feature flags, deploy using the Immediate scheme, and wait 1 minute.

UI changes should be in place after a refresh, backend features enabled in ~1 minute.

## Sources, links, docs, misc.
* https://aws.amazon.com/blogs/mt/using-aws-appconfig-feature-flags/
* https://dev.to/aws-builders/exploring-feature-flag-use-aws-appconfig-9f9
* https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-appconfigdata/index.html