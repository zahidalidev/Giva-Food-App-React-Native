
export const SentNotification = async (arr) => {

    fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        Authorization: `Bearer ${'vdh87X62QCNNqAddDdkT4CAD8slBu4_ewPS_M99e'}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arr)
    })
        .then((response) => response.json())
        .then((responseJson) => { console.log("responseJson new: ", responseJson) })
        .catch((error) => {
            console.log("notify error: ", error);
            alert(error)

        });


}