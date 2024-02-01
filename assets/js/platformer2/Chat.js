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

    get chatBox(){
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
            const para = document.createElement("a");
            para.innerText = name+": "+message;
            div2.append(para)
        }

        button.addEventListener("click",()=>{
            var message = input.value;
            message = this.parseMessage(message);
            addMessage(message,"you");
            this.sendMessage(message);
        });

        Multiplayer.createListener("onMessage",(data)=>{
            var message = this.parseMessage(data.message);
            addMessage(message,data.name?data.name:data.id);
        })

        div.append(div2);
        div.append(input);
        div.append(button);
        return div;
    }
}
export default Chat;