import { Handler, APIGatewayEvent } from 'aws-lambda'

const validRefreshToken = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.R6IwoX6iEUivngFrISCBdPrEb0UjwW6p1MUf3j5GJ7eCdbC1yGENI4NBj72blPgCZEgZQhelrr3sglszBQ8BW4oLRdtoESTqQyt2AFDG20wYZmlGaXgjcqwrC4Lq9VesolytOgAii4EsUgz7BMdul_jfq45NLzZ6HOW5m9KENW7LStqhszL702DFP6mhSatp3QSX7t14zIiI9fYXmHMr2LWPX_NdlY0cPzwdnBpAHCVcNdD4lYS4fRm35xKhQIZJkHsCcJwkBdJVmIBsHwEAxreaIiOCuCSCTqpvnHkAmePCHuy65ZIp3ZwIvQwN50cQ0kNX7uaHF3iA3mhnFHbNmg.CAHKDPLNGBVg0OL7.16BdrfuhA9MmgcZj7h10PeKtZYKZqx3u2fBo2JMft6emwpTJXDUv2051UC7eD3lzuwcAb0eQ4xi7zyxXIYRMxd6Sc7WdW8VpgLwzVpO0yZ7g7FmC3D4xUsaNBducpq8Ha_wsPP9NDmgc7siwWm3g8sNcddjdBL2k5OEkGWEEoXyHohPJRN6IWXILCqCEGAUTlxt1lYUgdkFHwVjLE2fii_w9SdOacWu9gY9SW802Mlej4mObBeeoqAarG8N-ksRQs2P5QAwY_pl_v7laXIwXBeN-PUEnWGihBv9Z7DCl2o7ybIrXeuTmGfpNWhzAoLF73ik9UurMXidAJnhe0WsKSo0BWuSUQrQp7WiXilzGrzSfSdv3RhmLE0uq9qNdQLGAbjS7-YgM1FHCj8uwp4CbdP-jOqUBHbcRkfzZsUl1UBoWQB_o1oYFAJWvpl5aRRXf24A-bQ2Fw3VSwpDOQZ-9bZHshMRZp14M3mptF4YSnnkLlnSsL-pC8ZsAkz9_uvUlw9gzE6i1pLNbGIZY4zgsME8oh0LCrBUK1GnIWI29xYtQ4tNKQcv_vWDAhFx02E-sNibPZdOJkc83EyQuxfSfkL_i9DwbihNSpxUAaSg2D0Uwe7qNQ4K1YRmAcigtinZFjC18UWylZKs_A27KH6lIyaf-QLIUU4gvwh6aLUdAKxBxFPM8tgGyB0XGCRlFKt2iqJlYujDXz0yx-OD2Rp2zUPixe3ij2qxzm0pl_VRo9cD1tQFQ5O-rafmEuvcLh0goJQdRgp63z-yWuFre6YU-lm1AorMZaq7L9OTD1O4WIEt_aSYBMTHHnzGieec2YmWtkjBE2npUf73491Cb3pJ1WxypNJg_D75Y0fddtHMLABVIJQvJsn2AGUb_IJLbMIvP3fZaP6tDySPSfpW_rQpJwWMj0rI1MlwtmTjNtjbQuty54WavWiR8RIsWbj_v4fRp18uJUPQRqLV4yCe8eBQ0tWSzcFCSKBf93EiVtMRVAO6Hw4nYJTMTofxsO6hrNGgwsphs5IjmibOljiEKzKE_LJ3qt5AGecxfVd-GipKBC4qKpK2oCNqyZ9hue03f9QNBWPP0TmnPpY5O0CqtNMPm8NbdhBwwqHju-yeJoC1Qzw88PFI4xRjxDirO7MALv0vxP7CRn4C0XOO34FwFuWr_94jXVBi9N1yLfTS_j_g5YQsJQNuQeeCSomCJusF8iwRZ-dzXLa37PQORVpMvQgBYoajS4xAozlfvHA1uBbkI87aD15snWpAArtutUkJUqipeA8pAbeE0LxkFt5aXa86wiUai34L8Vg.X96QTSws06F2YfKlP0O-Gw'
const validRefreshTokenMock = 'refresh'
const validAccessToken = 'eyJraWQiOiJJZmNDTGg0S0xyYW5QNnVaMTNXZHZnUEVBOVB0dFNGOTB1bGUzZVR6eEd3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MThmMjE2My0yMDNmLTQzNTYtYWFhYi1lMjk2NzA5NjI0NmIiLCJldmVudF9pZCI6ImYwMzMxNjBjLTAxZWMtMTFlOS05NjYxLTAxMTZlMzkwMzc0YSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NDUwNDUyNzYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX3dhUUtBYW9TQSIsImV4cCI6MTU0NTA0ODg3NiwiaWF0IjoxNTQ1MDQ1Mjc2LCJqdGkiOiI3ZTRmZjQ3NC1jZTY3LTQ1YjQtYTM5Ni05ZDQ5MTFjZDExN2IiLCJjbGllbnRfaWQiOiIyZzd1OWExbmg3bHZiMDBhcHRqaWxjdTI5NCIsInVzZXJuYW1lIjoiZ3J6ZWdvcnoud2FkYXMifQ.FygGVX24vaj4Cr3rE3QovBZCUCjY8quUOxEW7SfUXKxG3n5uovnX6uZKqzSjoge3r0gBPbK712TFYNt16frHrJDyBrhttJz2uHzSIcIQgVsUusiZI3BR8kimGRMe2lu47JmqsXnZlFJ5qCn1nU8iF0JAJQe9uM6vpzSE2uHLR2TosxI9lX5KocaI8XAgqs8l4cVBZ6M5U4lwRn-QDzXuig38pqiKBjlpG5q9I6P8UshD9nYx25xf-pOekft1lYzcp6kno7kF2tBOtev35dK3CH09NGcIIHnfANTG3TnSrX01WjDvSDMkY4TZKZH6_jWIOKWmaBsrCwSVr16-j7HH-Q'
const accessTokenMock = 'allow'
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store,no-cache'
}

export const handler: Handler = async (event: APIGatewayEvent) => {
    const { RefreshToken } = JSON.parse(event.body)

    if (RefreshToken === validRefreshToken) {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: 'OK',
                payload: { AccessToken: validAccessToken }
            })
        }
    }

    if (RefreshToken === validRefreshTokenMock) {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: 'OK',
                payload: { AccessToken: accessTokenMock }
            })
        }
    }

    return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
            message: 'Forbidden',
            payload: {}
        })
    }
}