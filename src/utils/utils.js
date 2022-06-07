// export const scoringTablePrediction = (prediction, fighterA) => {
//     prediction = prediction.toLowerCase();
//     console.log('prediction: ',prediction);
//     const style = {};
//     if(prediction.includes('ko')){
//         ko = prediction.slice(prediction.indexOf('KO')+2); 
//         style.color = 'red';
//         style
//     }
//     // prediction.includes
// }
export const parseUrls = (userInput) => {
    var urlRegExp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g;
    let formattedMessage = userInput.replace(urlRegExp, (match) => {
        let formattedMatch = match;
        if (!match.startsWith("http")) {
            formattedMatch = `http://${match}`;
        }
        return `<a href=${formattedMatch} class="chat-line__link" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });
    return formattedMessage;
};
export const predictionIsLocked = stopEpoch => {
    return Date.now() > stopEpoch ? true : false;
}
export const parseEpoch = (epoch, form) => {
    // time needs to be set toLocale stuff...
    epoch = parseInt(epoch)
    const time = new Date(epoch);
    if(epoch){
        const hoursArr = [...Array(24).keys()];
        const hour = hoursArr[time.getHours()] % 12;
        const ampm = time.getHours() >= 12 ? 'pm' : 'am';
        const daysArr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const day = daysArr[time.getDay()];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const month = months[time.getMonth()];
        const year = time.getFullYear();
        const dayOfMonth = time.getDate();
        if(form){
            return `${month} ${dayOfMonth}, ${year}`;
        }
        return `${day} ${month} ${dayOfMonth} - ${hour}${ampm}`;
    }
};

export const capFirstLetters = word => {
    if(word == undefined || word.length === 0){
        return '';
    } else {
        return word.split(' ').map(el => el.charAt(0).toUpperCase() + el.slice(1)  + ' ');
    } 
};
export const roundLengthOptions = [3,4,6,8,10,12,15];
export const weightclasses = [
    {value:'Light flyweight,106', label:'Light flyweight (106 pounds)'},
    {value:'Flyweight,112', label:'Flyweight (112 pounds)'},
    {value:'Bantamweight,118', label:'Bantamweight (118 pounds)'},
    {value:'Featherweight,125', label:'Featherweight (125 pounds)'},
    {value:'Lightweight,135', label:'Lightweight (135 pounds)'},
    {value:'Junior Welterweight,140', label:'Junior welterweight (140 pounds)'},
    {value:'Welterweight,147', label:'Welterweight (147 pounds)'},
    {value:'Middleweight,160', label:'Middleweight (160 pounds)'},
    {value:'Light heavyweight,178', label:'Light heavyweight (178 pounds)'},
    {value:'Cruiserweight,201', label:'Cruiserweight (201 pounds)'},
    {value:'Heavyweight,201+', label:'Heavyweight (201+ pounds)'}
];