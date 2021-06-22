export const SentNotification = async (arr) => {

    // const arr = [{
    //     "to": "ExponentPushToken[-pIuasJ4dIFEaaA4Jn1xBV]",
    //     "sound": "default",
    //     "body": "Hello world!"
    // }, {
    //     "to": "ExponentPushToken[-pIuasJ4dIFEaaA4Jn1xBV]",
    //     "badge": 1,
    //     "body": "You've got mail"
    // }]

    fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arr)
    })
        .then((response) => response.json())
        .then((responseJson) => { console.log("responseJson new: ", responseJson) })
        .catch((error) => { console.log("notify error: ", error) });
}