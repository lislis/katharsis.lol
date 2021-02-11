import gdprCopy from './gdpr_en'

export default {
  index: {
    claim: "An online tool for working together<br> on the drama scripts of tomorrow",
    defaultText: "Be excellent to each other!",
    watch: "Watch",
    participate: "Participate"
  },
  intro: {
    enter: "Enter",
    yourNameIs: "You're participating as",
    toRoom: "Go on",
    noMore: "You no longer want to?",
    leave: "Leave",
    callMeByAnyName: "Please enter your user name here.<br>It will act as your character's name as well."
  },
  user: {
    notice: {
      enter: "has entered",
      leave: "has left"
    },
    notification: {
      onstage: "You're on stage!",
      offstage: "You're off stage!",
      isMod: "You're a moderator now!",
      isUser: "You're a participant now!",
      wasRemoved: "You have been asked to leave.",
      reallyLeave: "Do you really want to leave?<br>Without another ticket code you won't be able to join again.",
      reallyLeaveBtn: "Really leave",
      back: "Back"
    }
  },
  ui: {
    button: {
      close: "close",
      send: "Write",
      accept: "Okay!"
    },
    form: {
      chat: "Write something",
      placeholderSpeech: "What do you say?",
      placeholderInstruction: "What should happen?",
      thereIsTyping: "There is typing",
      directSpeech: "Direct speech",
      stageInstruction: "Stage instruction"
    },
    chat: {
      scrollDown: "New message, scroll down",
      peopleList: "Performers in the room",
      emojiPicker: "Select emoji"
    }
  },
  spec: {
    title: "Spectator room"
  },
  part: {
    title: "Participate",
    label: "Who do you want to be?",
    ticket: "Ticket code",
    invalidTicket: "No or invalid ticket code!",
    usedTicket: "Ticket code has been used!",
  },
  legal: {
    imprint: "Imprint",
    gdpr: "Data protection notice",
    gdprCopy,
    gdprFurther: "Further notes on data protection by the adminstrators",
    gpdrLink: "Further notes on data protection by the adminstrators.",
    gpdrNoLink: "No further notes on data protection by the adminstrators."
  }
}
