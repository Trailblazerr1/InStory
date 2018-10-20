const API_URL = 'http://192.168.31.130:8000'


export function fetchArticeData(url) {
    return fetch(`${API_URL}/fetch-media-source/article/?url=${url}`, {
        method: 'GET'
    }).then((res) => res.json()).then((data) => {
        return data
    })
    .catch(error => window.alert(error));
}

export function publishStory(blob) {
    return fetch(`${API_URL}/posts/story/`, {
        method: 'POST',
        body: blob,
        headers: {
            'Content-Type': 'application/octet-stream'
        }
    }).then((res) => res.json()).then((data) => {
        return data
    })
}

let data = {
    "title": "The Korean Leaders Have Met To Discuss Trump's Summit With Kim Jong Un",
    "colors": ['#1e5799', '#7db9e8'],
    "images": [
        {
            "url": "https://img.buzzfeed.com/buzzfeed-static/static/2018-05/26/10/asset/buzzfeed-prod-web-04/sub-buzz-18462-1527345297-9.jpg",
            "preview_url": "https://img.buzzfeed.com/buzzfeed-static/static/2018-05/26/10/asset/buzzfeed-prod-web-04/sub-buzz-18462-1527345297-9.jpg",
            "width": 1600,
            "top": 0,
            "left": 600,
            "height": 1036,
            "res": 1657600
        },
        {
            "url": "https://img.buzzfeed.com/buzzfeed-static/static/2018-05/26/7/asset/buzzfeed-prod-web-05/sub-buzz-32206-1527334356-1.png",
            "preview_url": "https://img.buzzfeed.com/buzzfeed-static/static/2018-05/26/10/asset/buzzfeed-prod-web-04/sub-buzz-18462-1527345297-9.jpg",
            "width": 1008,
            "height": 595,
            "top": 0,
            "left": 200,
            "res": 599760
        }
    ],
    "keywords": [
        "news",
        "politics",
        "surprisesummit",
        "leaders",
        "DonaldTrump",
        "SarahHuckabeeSanders",
        "US",
        "SouthKorean",
        "KimJongUn",
        "meeting",
        "leader",
        "relations",
        "hostility",
        "statements",
        "summit",
        "summit",
        "case",
        "pre-advanceteam",
        "NorthKorean",
        "Pyongyang",
        "Washington",
        "place",
        "order",
        "officials",
        "Singapore",
        "WhiteHouse"
    ]
}