import Multiplayer from './Multiplayer.js'

class Chat{
    constructor(wordsToAdd){
        this.prohibitedWords = ['westview', 'pee', 'poo', 
        'multiplayer', 'multi', 'leaderboard', 'enemies', 
        'gamelevels', 'interactions', 'sass', 'sassy', 'sas', 
        '911', 'die', 'luigi', 'peach', 'bowser', 'mario', 
        'mr.mortensen', 'mr. mortensen', 'mortensen', 'lopez', 
        'mr.lopez', 'mr. lopez','mister mortensen', 'mister lopez', 
        'aws', 'amazonwebservices', 'amazon', 'amazonweb'];

        this.prohibitedWords.concat(wordsToAdd);
    }

    

    sendMessage(message){
        message = this.parseMessage(message);  
        Multiplayer.sendData("message",message);
    }

    parseMessage(message){
        this.prohibitedWords.forEach(word => {
            const regex = new RegExp('\\b' + word + '\\b', 'gi');
            message = message.replace(regex, 'I Love CSSE! '.repeat(word.length));
        });
        return message;
    }

    get chatBoxContainer(){
        const div = document.createElement("div");
        div.className = ""; //create a class for the chatBox
        div.id = "chatBoxContainer";

        const div2 = document.createElement("div");
        div2.id = "chatBox";

        const input = document.createElement("input");
        input.id = "chatInput";
        input.type = "text";
        input.placeholder = "Type your message...";

        const button = document.createElement("button");
        button.id = "chatButton";
        button.innerText = "Send";

        function addMessage(message,name){
            const div3 = document.createElement("div");
            const para = document.createElement("p");
            para.innerHTML = "<b>"+name+":</b>"+" "+message;
            para.style.color = "black";
            div3.append(para);
            div2.append(div3);
        }

        button.addEventListener("click",()=>{
            Multiplayer.removeListener("onMessage")
            Multiplayer.createListener("onMessage",(data)=>{
                var message = this.parseMessage(data.message);
                addMessage(message,data.name?data.name:data.id);
            })
            var message = input.value;
            message = this.parseMessage(message);
            addMessage(message,"you");
            this.sendMessage(message);
        });

        div.append(div2);
        div.append(input);
        div.append(button);
        return div;
    }
}
export default Chat;